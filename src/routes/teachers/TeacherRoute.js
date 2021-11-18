const {
	TeacherCreatePostController,
	TeacherUpdatePutController,
	TeacherGetController,
} = require("../../controllers/TeacherController");
const authMiddleware = require("../../middlewares/authMiddleware");
const permissionMiddleware = require("../../middlewares/permissionMiddleware");

const TeacherRoute = require("express").Router();

TeacherRoute.use([authMiddleware, permissionMiddleware]);

