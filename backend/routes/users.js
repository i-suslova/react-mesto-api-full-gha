const router = require('express').Router();

const { authUser } = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');
const {
  updateUserValidator,
  avatarValidator,
  userByIdValidator,
} = require('../validators/userValidator');

// роут для получения всех пользователей
router.get('/', authUser, getUsers);

// роут для получения информации о текущем пользователе
router.get('/me', authUser, getUserInfo);

// роут для получения пользователя по _id
router.get('/:userId', authUser, userByIdValidator, getUserById);

// роут для обновления профиля
router.patch('/me', authUser, updateUserValidator, updateUser);

// роут для обновления аватара
router.patch('/me/avatar', authUser, avatarValidator, updateAvatar);

module.exports = router;
