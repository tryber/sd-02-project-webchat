const express = require('express');

const rescue = require('express-rescue');

const messageController = require('./messageController');

const {
  joiSchemas: {
    messageSchema: { createSchema, updateSchema },
  },
} = require('../../utils');

const router = express.Router();

function messageRouter({ middlewares, ...dependencies }) {
  router
    .route('/')
    .get(middlewares.auth, rescue(messageController.listBy(dependencies)))
    .post(middlewares.validate(createSchema), rescue(messageController.create(dependencies)));

  router
    .route('/:id')
    .patch(
      middlewares.auth,
      middlewares.validate(updateSchema),
      rescue(messageController.update(dependencies)),
    )
    .delete(middlewares.auth, rescue(messageController.remove(dependencies)));

  return router;
}

module.exports = messageRouter;
