const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const connect = require('./db/connection');

// Models (for seeding)
const Admin = require('./api/models/admin.model');
const CarouselSlide = require('./api/models/carousel.model');
const Message = require('./api/models/message.model');

// Routes
const adminRoutes = require('./api/routes/admin.routes');
const carouselRoutes = require('./api/routes/carousel.routes');
const messageRoutes = require('./api/routes/message.routes');
const teamRoutes = require('./api/routes/team.routes');
const memberRoutes = require('./api/routes/member.routes');
const departmentRoutes = require('./api/routes/department.routes');
const interestGroupRoutes = require('./api/routes/interestGroup.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Registration
app.use('/api/admin', adminRoutes);
app.use(carouselRoutes);
app.use(messageRoutes);
app.use(teamRoutes);
app.use(memberRoutes);
app.use(departmentRoutes);
app.use(interestGroupRoutes);

// Connect to Database and Seed Defaults
connect()
  .then(async () => {
    await seedDefaultAdmin();
    await seedDefaultMessages();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Seed default admin if none exists
async function seedDefaultAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('Default admin seeded (admin/admin123)');
    }
  } catch (err) {
    console.error('Error seeding default admin:', err);
  }
}

// Seed default messages & carousel if empty
async function seedDefaultMessages() {
  try {
    const sponsorMsg = await Message.findOne({ role: 'sponsor' });
    if (!sponsorMsg) {
      await Message.create({
        role: 'sponsor',
        name: 'Dr. Faculty Sponsor',
        content: 'Welcome to the ACM Student Chapter. We aim to foster research and innovation in computing.',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      });
    }

    const chairmanMsg = await Message.findOne({ role: 'chairman' });
    if (!chairmanMsg) {
      await Message.create({
        role: 'chairman',
        name: 'Student Chairman',
        content: 'As the chairman, I welcome you all to participate in our events, workshops, and hackathons.',
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
      });
    }

    const slideCount = await CarouselSlide.countDocuments();
    if (slideCount === 0) {
      await CarouselSlide.create([
        {
          imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
          title: 'Welcome to IIIT Una ACM Student Chapter',
          description: 'Fostering computing community and technological growth.',
          order: 1
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
          title: 'Code, Innovate, Collaborate',
          description: 'Join us for exciting hackathons, coding contests, and tech talks.',
          order: 2
        }
      ]);
      console.log('Default carousel slides seeded');
    }
  } catch (err) {
    console.error('Error seeding default messages/carousel:', err);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
