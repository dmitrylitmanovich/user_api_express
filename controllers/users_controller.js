const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const create = asyncHandler(async (req, res, _next) => {
  const user = new User(req.body);
  
  try {
    const newUser = await user.save();
    
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const index = asyncHandler(async (req, res, _next) => {
  try {
    let query = User.find();

    if (req.query.sort) {
      const sortField = req.query.sort;
      query = query.sort(sortField);
    }

    if (req.query.filter) {
      const filterField = req.query.filter;
      query = query.where(filterField);
    }

    const users = await query.exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
});

const show = asyncHandler(async (req, res, _next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  };
});

const update = asyncHandler(async (req, res, _next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const destroy = asyncHandler(async (req, res, _next) => {
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

module.exports = { 
  create,
  index,
  show,
  update,
  destroy,
};
