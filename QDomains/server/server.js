require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    // Auto-seed demo users if none exist
    try {
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');
      const count = await User.countDocuments();
      if (count === 0) {
        console.log('No users found. Seeding initial admin and demo accounts...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('demo1234', salt);

        const usersToCreate = [
          { email: 'admin@qdomains.lk', role: 'admin', accountType: 'admin', name: 'Administrator' },
          { email: 'service@qdomains.lk', role: 'service', accountType: 'service', name: 'Support Agent' },
          { email: 'user@qdomains.lk', role: 'user', accountType: 'individual', name: 'Demo User' }
        ];

        for (let u of usersToCreate) {
          const newUser = new User({ ...u, password: hashedPassword });
          await newUser.save();
        }
        console.log('Seed complete.');
      }
    } catch (seedErr) {
      console.error('Failed to seed users', seedErr);
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
