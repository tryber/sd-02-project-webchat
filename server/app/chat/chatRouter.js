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
    .post(middlewares.validate(createSchema), rescue(chatController.create(dependencies)));

  router
    .route('/:id')
    .patch(
      middlewares.auth,
      middlewares.validate(updateSchema),
      rescue(chatController.update(dependencies)),
    )
    .delete(middlewares.auth, rescue(chatController.remove(dependencies)));

  return router;
}

module.exports = chatRouter;
