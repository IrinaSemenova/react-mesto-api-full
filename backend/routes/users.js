const router = require('express').Router();
const { userIdValidate, updateUserValidate, updateAvatarValidate } = require('../middlewares/validator');

const {
  getUsers,
  getUserInfo,
  getUserId,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', userIdValidate, getUserId);
router.patch('/users/me', updateUserValidate, updateUser);
router.patch('/users/me/avatar', updateAvatarValidate, updateAvatar);

module.exports = router;
