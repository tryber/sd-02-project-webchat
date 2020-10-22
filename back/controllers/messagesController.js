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

router.get('/private/:value', async (req, res) => {
  const [sendUser, receiveUser] = req.params.value.split(';');
  const history = await messagesModel.findPrivateChat(sendUser, receiveUser);
});

module.exports = { router };
