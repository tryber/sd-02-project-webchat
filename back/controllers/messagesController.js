const express = require('express');
const messagesModel = require('../models/messagesModel');

const router = express.Router();

router
  .get('/', async (_req, res) => {
    const messages = await messagesModel.getAllMessages();
    return res
      .status(200)
      .json({ messages });
  });

module.exports = { router };
