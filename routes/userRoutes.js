const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

// GET all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET a single user but its _id
router.get('users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT to update a user by its _id
router.put('users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate
    }
});