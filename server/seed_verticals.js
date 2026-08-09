const mongoose = require('mongoose');
require('dotenv').config();

const Department = require('./api/models/department.model');
const InterestGroup = require('./api/models/interestGroup.model');
const InterestGroupMembership = require('./api/models/interestGroupMembership.model');
const TeamMember = require('./api/models/team.model');
const Member = require('./api/models/member.model');

const mongoUri = process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB.');

  // --- Seed Departments ---
  const engineeringDept = await Department.findOneAndUpdate(
    { slug: 'engineering' },
    {
      slug: 'engineering',
      name: 'Engineering Department',
      description: 'Focused on building software products, systems engineering, and applied computing. Members collaborate on full-stack projects, developer tooling, and competitive programming.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      mission: 'To cultivate engineering excellence through hands-on projects, open-source collaboration, and real-world system design challenges.',
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Engineering Department:', engineeringDept._id);

  const researchDept = await Department.findOneAndUpdate(
    { slug: 'research' },
    {
      slug: 'research',
      name: 'Research Department',
      description: 'Dedicated to advancing scientific computing through AI research, cybersecurity investigation, and foundational computer science exploration. Members engage in paper reading, implementations, and publications.',
      bannerImageUrl: 'https://images.unsplash.com/photo-1532094349884-543559c60b2a?auto=format&fit=crop&w=1200&q=80',
      mission: 'To nurture a research-first culture where students explore cutting-edge literature, run experiments, and contribute original findings to the computing community.',
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Research Department:', researchDept._id);

  // --- Resolve IGLs from TeamMember collection ---
  const deepShekhar = await TeamMember.findOne({ name: 'Deep Shekhar Singh' });
  const aryanRaj = await TeamMember.findOne({ name: 'Aryan Raj' });
  const ashmeet = await TeamMember.findOne({ name: 'Ashmeet Singh Sandhu' });
  const vishalYadav = await TeamMember.findOne({ name: 'Vishal Yadav' });
  const gauravUpreti = await TeamMember.findOne({ name: 'Gaurav Upreti' });

  // --- Seed Interest Groups ---
  const se = await InterestGroup.findOneAndUpdate(
    { name: 'Software Engineering', department: engineeringDept._id },
    {
      department: engineeringDept._id,
      igl: deepShekhar?._id || null,
      name: 'Software Engineering',
      description: 'Full-stack application development, systems engineering, DevOps practices, and shipping production-ready products through iterative build cycles.',
      areaOfInterest: 'Web, Systems & Product Engineering',
      order: 1,
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Software Engineering IG:', se._id);

  const alps = await InterestGroup.findOneAndUpdate(
    { name: 'Algorithms, Logic & Problem Solving', department: engineeringDept._id },
    {
      department: engineeringDept._id,
      igl: aryanRaj?._id || null,
      name: 'Algorithms, Logic & Problem Solving',
      description: 'Competitive programming, advanced data structures, algorithm design, and mathematical foundations for efficient problem solving.',
      areaOfInterest: 'Competitive Programming & Algorithmic Thinking',
      order: 2,
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Algorithms IG:', alps._id);

  const ai = await InterestGroup.findOneAndUpdate(
    { name: 'Artificial Intelligence', department: researchDept._id },
    {
      department: researchDept._id,
      igl: ashmeet?._id || null,
      name: 'Artificial Intelligence',
      description: 'Machine learning, deep neural networks, computer vision, NLP, and generative AI. Members review latest research papers and implement experimental prototypes.',
      areaOfInterest: 'ML, Deep Learning & Generative AI',
      order: 1,
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Artificial Intelligence IG:', ai._id);

  const cyber = await InterestGroup.findOneAndUpdate(
    { name: 'Cyber Security', department: researchDept._id },
    {
      department: researchDept._id,
      igl: vishalYadav?._id || null,
      name: 'Cyber Security',
      description: 'Offensive and defensive security practices — penetration testing, malware analysis, cryptography, reverse engineering, and CTF competitions.',
      areaOfInterest: 'Offensive & Defensive Security',
      order: 2,
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Cyber Security IG:', cyber._id);

  const ccs = await InterestGroup.findOneAndUpdate(
    { name: 'Core Computer Science', department: researchDept._id },
    {
      department: researchDept._id,
      igl: gauravUpreti?._id || null,
      name: 'Core Computer Science',
      description: 'Database systems, compiler theory, operating systems, distributed computing, and foundational CS topics bridging theory and practice.',
      areaOfInterest: 'Systems, Databases & Theory',
      order: 3,
    },
    { upsert: true, returnDocument: 'after' }
  );
  console.log('Seeded Core CS IG:', ccs._id);

  // --- Membership assignments from the chapter member listing ---
  // Engineering - Software Engineering
  const seMembers = ['Deep Shekhar Singh', 'Parth Sharma', 'Ayush Rawat', 'Aryan Sheoran', 'Keshav Sethi'];
  // Engineering - Algorithms
  const alpsMembers = ['Aryan Raj', 'Saksham Sangwan', 'Keshav Sethi', 'Bhavdeep Singh', 'Ayush Rawat', 'Yuvika Garg', 'Deep Shekhar Singh'];
  // Research - AI
  const aiMembers = ['Ashmeet Singh Sandhu', 'Gaurav Upreti', 'Vishal Singh', 'Shagun Gupta', 'Bhavdeep Singh'];
  // Research - Cyber Security
  const cyberMembers = ['Vishal Yadav'];
  // Research - Core CS
  const ccsMembers = ['Gaurav Upreti', 'Yuvraj Singh Chauhan', 'Saksham Sangwan'];

  async function assignMembers(igDoc, memberNames) {
    let assigned = 0;
    for (const name of memberNames) {
      const member = await Member.findOne({ name });
      if (!member) {
        console.log(`  Member not found in roster: ${name}`);
        continue;
      }
      try {
        await InterestGroupMembership.findOneAndUpdate(
          { interestGroup: igDoc._id, member: member._id },
          { interestGroup: igDoc._id, member: member._id },
          { upsert: true }
        );
        assigned++;
      } catch (e) {
        console.log(`  Skipping duplicate: ${name} in ${igDoc.name}`);
      }
    }
    console.log(`  Assigned ${assigned}/${memberNames.length} members to ${igDoc.name}`);
  }

  console.log('\nAssigning memberships...');
  await assignMembers(se, seMembers);
  await assignMembers(alps, alpsMembers);
  await assignMembers(ai, aiMembers);
  await assignMembers(cyber, cyberMembers);
  await assignMembers(ccs, ccsMembers);

  mongoose.connection.close();
  console.log('\nVerticals seeding complete.');
}

run().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
