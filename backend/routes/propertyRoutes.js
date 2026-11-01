const express = require('express');
const Property = require('../models/Property');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('listerId', 'name avatarUrl');
    // For mocked ids compatibility with frontend initially, set id to _id
    const mapped = properties.map(p => ({...p._doc, id: p._id.toString()}));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('listerId', 'name avatarUrl email phone');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({...property._doc, id: property._id.toString()});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create property
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newProperty = new Property({
      ...req.body,
      listerId: req.user.id
    });
    await newProperty.save();
    res.status(201).json({...newProperty._doc, id: newProperty._id.toString()});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

