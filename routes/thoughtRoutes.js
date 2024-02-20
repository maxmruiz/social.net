// Initiate dependencies
const express = require('express');
const { Thought } = require('../models/Thought');
const { User } = require('../models/User');
const router = express.Router();

// GET all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single thought by its _id
router.get('/thoughts/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST a new thought
router.post('/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.json(newThought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT to update a thought by its _id
router.put('/thoughts/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(updatedThought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE a thought by its _id
router.delete('/thoughts/:id', async (req, res) => {
    try {
        const thoughtToDelete = await Thought.findByIdAndDelete(req.params.id);
        if (!thoughtToDelete) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        await User.findByIdAndUpdate(thoughtToDelete.userId, { $pull: { thoughts: req.params.id } }, { new: true });
        res.json({ message: 'Thought successfully deleted.' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST to add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with this id to add a reaction!' });
        }
        res.json(updatedThought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE to remove a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with this id to remove a reaction!' });
        }
        res.json(updatedThought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;