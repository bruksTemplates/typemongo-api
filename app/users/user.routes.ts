import express from 'express';
import userController from "./user.controller";

import UserMongoRepository from "./user.service";
import SessionService from "./session.service";

const userRoutes = () => {
	const _userMongoRepo = new UserMongoRepository();
	const _sessionService = new SessionService()
	const controller = new userController(_userMongoRepo, _sessionService);
	const router = express.Router();
	router
		.route("/")
		.post(controller.createUser)
		.get(controller.getUsers)
	router
		.route("/:id")
		.get(controller.getUserById)
		.delete(controller.deleteUser)
		.patch(controller.editUser)

	router.route('/session/:id')
		.post(controller.addSession)
		.patch(controller.updateSession)
		.delete(controller.deleteSession)
	return router
}
export default userRoutes;
