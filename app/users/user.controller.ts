import { NextFunction, Request, Response } from "express";
import FactoryController from "../../common/factory.controller";
import { UserRepository } from "./user.service";
import SessionService from "./session.service";

export default class UserController {
	userService: UserRepository;
	factoryController: FactoryController;
	sessionService: SessionService

	constructor(userRepo: UserRepository, sessionServ: SessionService) {
		this.userService = userRepo;
		this.factoryController = new FactoryController(userRepo)
		this.sessionService = sessionServ
	}

	// addSession = async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const {id} = req.params;
	// 		logTrace("sesServ=", this.sessionService, LogColors.FgGreen)
	// 		const session = await this.sessionService.addSession(id, req.body)
	// 		res.json(session);
	// 	} catch (e: any) {
	// 		res.status(500).json({
	// 			message: e.message,
	// 		});
	// 	}
	// }
	// updateSession = async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const {id} = req.params;
	// 		const session = await this.sessionService.updateSession(id, req.body)
	// 		res.json(session);
	// 	} catch (e: any) {
	// 		res.status(500).json({
	// 			message: e.message,
	// 		});
	// 	}
	// }
	// deleteSession = async (req: Request, res: Response, next: NextFunction) => {
	// 	try {
	// 		const {id} = req.params;
	//
	// 		const session = await this.sessionService.deleteSession(id, req.body)
	// 		res.json(session);
	// 	} catch (e: any) {
	// 		res.status(500).json({
	// 			message: e.message,
	// 		});
	// 	}
	// }

	addSession = async (req: Request, res: Response, next: NextFunction) => Controller(req, res, this.sessionService.addSession)
	updateSession = async (req: Request, res: Response, next: NextFunction) => Controller(req, res, this.sessionService.updateSession)
	deleteSession = async (req: Request, res: Response, next: NextFunction) => Controller(req, res, this.sessionService.deleteSession)
	deleteExpiredSession = async (req: Request, res: Response, next: NextFunction) => Controller(req, res, this.sessionService.deleteExpiredSessions)

	getUsers = async (req: Request, res: Response, next: NextFunction) => this.factoryController.getAll(req, res, next)
	getUserById = async (req: Request, res: Response, next: NextFunction) => this.factoryController.getOneById(req, res, next)
	deleteUser = async (req: Request, res: Response, next: NextFunction) => this.factoryController.deleteOneById(req, res, next)
	createUser = async (req: Request, res: Response, next: NextFunction) => this.factoryController.createOne(req, res, next)
	editUser = async (req: Request, res: Response, next: NextFunction) => this.factoryController.updateOne(req, res, next)

}


const Controller = async (req: Request, res: Response, func: (id: string, body: any) => Promise<any>) => {
	try {
		const {id} = req.params;
		// logTrace("sesServ=", this.sessionService, LogColors.FgGreen)
		const session = await func(id, req.body)
		res.json(session);
	} catch (e: any) {
		res.status(500).json({
			message: e.message,
		});
	}
}
