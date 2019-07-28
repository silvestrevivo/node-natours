const express = require('express');
const userController = require('../controllers/userController');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = userController;
const userRouter = express.Router();

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
