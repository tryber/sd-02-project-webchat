const express = require('express');

const rescue = require('express-rescue');

const chatController = require('./chatController');

const {
  joiSchemas: {
    chatSchema: { createSchema, updateSchema },
  },
} = require('../../utils');

const router = express.Router();

function chatRouter({ middlewares, ...dependencies }) {
  router
    .route('/')
    .get(middlewares.auth, rescue(chatController.listBy(dependencies)))
    .post(
      middlewares.auth,
      middlewares.validate(createSchema),
      rescue(chatController.create(dependencies)),
    );

  router
    .route('/:id')
    .get(middlewares.auth, rescue(chatController.find(dependencies)))
    .patch(
      middlewares.auth,
      middlewares.validate(updateSchema),
      rescue(chatController.update(dependencies)),
    )
    .delete(middlewares.auth, rescue(chatController.remove(dependencies)));

  return router;
}

module.exports = chatRouter;
