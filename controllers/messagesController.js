const express = require('express');
const rescue = require('express-rescue');

const messagesService = require('../services/messagesService');

const sendName = rescue(async (req, _res) => {
  const { userName } = req.body;
  messagesService.createUser({ userName });
});

module.exports = {
  sendName,
};
