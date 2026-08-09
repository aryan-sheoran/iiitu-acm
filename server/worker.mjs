import { Readable, Writable } from 'node:stream';

let appInstance;

export default {
  async fetch(request, env, ctx) {
    if (env) {
      Object.assign(process.env, env);
    }

    if (!appInstance) {
      const serverModule = await import('./server.js');
      appInstance = serverModule.default || serverModule;
    }

    return new Promise(async (resolve, reject) => {
      try {
        const url = new URL(request.url);

        let bodyBuffer = null;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          const arrayBuffer = await request.arrayBuffer();
          bodyBuffer = Buffer.from(arrayBuffer);
        }

        const req = new Readable({
          read() {
            if (bodyBuffer) {
              this.push(bodyBuffer);
              bodyBuffer = null;
            } else {
              this.push(null);
            }
          }
        });

        req.method = request.method;
        req.url = url.pathname + url.search;
        req.headers = Object.fromEntries(request.headers.entries());
        req.connection = { remoteAddress: request.headers.get('cf-connecting-ip') || '127.0.0.1' };

        const resHeaders = new Headers();
        const responseChunks = [];

        const res = new Writable({
          write(chunk, encoding, callback) {
            responseChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            callback();
          }
        });

        res.statusCode = 200;
        res.headersSent = false;
        res.setHeader = (name, value) => {
          resHeaders.set(name, value);
        };
        res.getHeader = (name) => resHeaders.get(name);
        res.removeHeader = (name) => resHeaders.delete(name);
        res.writeHead = (code, headers) => {
          res.statusCode = code;
          if (headers) {
            for (const [k, v] of Object.entries(headers)) {
              resHeaders.set(k, v);
            }
          }
        };

        res.on('finish', () => {
          const fullBody = Buffer.concat(responseChunks);
          resolve(new Response(fullBody, {
            status: res.statusCode,
            headers: resHeaders
          }));
        });

        res.on('error', (err) => reject(err));

        appInstance(req, res);
      } catch (err) {
        resolve(new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'content-type': 'application/json' }
        }));
      }
    });
  }
};
