const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve an user by Id.
 *     description: Retrieve an user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
*/
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create an user.
 *     description: Create an user.
*/
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update an user by Id.
 *     description: Update an user  by Id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update.
 *         schema:
 *           type: integer
*/
router.put('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    })
    ;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Remove an user.
 *     description: Remove an user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to remove.
 *         schema:
 *           type: integer
*/
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
