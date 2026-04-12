const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'buyer'
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    
    // Do not return password hash
    const userToReturn = { ...newUser._doc };
    delete userToReturn.password;

    res.status(201).json({ token, user: userToReturn });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    
    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    res.json({ token, user: userToReturn });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Authentication middleware wrapper
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Route to get current user data (including saved properties)
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Save or unsave property
router.post('/save-property/:propertyId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { propertyId } = req.params;
        
        if (!user.savedPropertyIds) user.savedPropertyIds = [];
        
        const hasSaved = user.savedPropertyIds.includes(propertyId);
        if (hasSaved) {
            user.savedPropertyIds = user.savedPropertyIds.filter(id => id.toString() !== propertyId);
        } else {
            user.savedPropertyIds.push(propertyId);
        }
        await user.save();
        res.json({ savedPropertyIds: user.savedPropertyIds });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

module.exports = router;
