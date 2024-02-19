const express = require('express');
const router = express.Router();
const { Thought } = require('../models/Thought');
const { User } = require('../models/User');

// GET all thoughts
router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET a single thought by its _id
router.get('thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new thought and link with user
router.post('/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const user = await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT to update a thought by its _id
router.put('thoughts/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to add a reaction to a thought
router.post('thoughts/:id/reactions', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!updatedThought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE to remove a reaction from a thought
router.delete('thoughts/:id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.id,
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;