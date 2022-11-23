import { FilterQuery, UpdateQuery } from "mongoose";


import { FactoryMongo } from "../../common/factory.mongo";
import { User, UserModel } from "./user.model";
import Repository from "../../common/interface";

export interface UserRepository extends Repository<User> {
}

export default class MongoUserRepo implements UserRepository {
	userFactory: FactoryMongo<any>;

	constructor() {
		this.userFactory = new FactoryMongo(UserModel);
	}

	// createOne = async (user: Object): Promise<User | null> => {
	// 	return this.userFactory.CreateOne(user)
	// }
	createOne = async (input: User): Promise<User | null> => this.userFactory.CreateOne(input);
	getAll = async () => this.userFactory.findMany()
	getOneById = async (id: string) => this.userFactory.findOneById(id)
	deleteOneById = async (id: string) => this.userFactory.deleteOneById(id)
	updateOneById = async (id: string, query: Object) => this.userFactory.updateOneById(id, query)
	findOneByQuery = async (query: Object) => this.userFactory.findOneByQuery(query, {lean: false})
	updateOneByQuery = async (filter: Object, query: UpdateQuery<any>) => this.userFactory.updateOneByQuery(filter, query)
	findManyByQuery = async (query: FilterQuery<any>) => this.userFactory.findManyByQuery(query, "", "")
	deleteAll = async () => this.userFactory.deleteAll()

}


