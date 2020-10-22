const express = require('express');
const usersModel = require('../models/usersModel');

const router = express.Router();

router
  .get('/', async (_req, res) => {
    const onlineUsers = await usersModel.findOnlineUsers();
    return res
      .status(200)
      .json({ onlineUsers });
  });

module.exports = { router };
