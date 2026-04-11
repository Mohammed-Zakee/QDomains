const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, accountType, businessName, phone, country } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Determine initial role (for demo purposes)
    let role = 'user';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('service') || email.includes('support')) role = 'service';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      accountType,
      businessName,
      phone,
      country,
      role
    });

    await user.save();

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, type: accountType, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, type: user.accountType, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Generate Seed Admins
router.post('/seed', async (req, res) => {
  try {
    const adminEmail = 'admin@qdomains.lk';
    const serviceEmail = 'service@qdomains.lk';
    const userEmail = 'user@qdomains.lk';

    const usersToCreate = [
      { email: adminEmail, role: 'admin', accountType: 'admin' },
      { email: serviceEmail, role: 'service', accountType: 'service' },
      { email: userEmail, role: 'user', accountType: 'individual' }
    ];

    let created = 0;

    for (let u of usersToCreate) {
      const existing = await User.findOne({ email: u.email });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('demo1234', salt);
        const newUser = new User({
          name: u.role === 'admin' ? 'Administrator' : u.role === 'service' ? 'Support Agent' : 'Demo User',
          email: u.email,
          password: hashedPassword,
          role: u.role,
          accountType: u.accountType
        });
        await newUser.save();
        created++;
      }
    }

    res.json({ message: `${created} seed users created.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during seeding' });
  }
});

module.exports = router;
