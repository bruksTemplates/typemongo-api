import * as Mongoose from "mongoose";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
// import APIFeatures from "./apiFeatures";
import { LogColors, logTrace } from "./logger"
import APIFeatures from "./apiFeatures";

export class FactoryMongo<Type> {
	model: Mongoose.Model<Type>;

	constructor(model: Mongoose.Model<Type>) {
		this.model = model;
	}

	async findManyByQuery<Type>(queryFilter: Object = {}, prefix: string, value: string) {
		// let options: QueryOptions = { lean: false }
		let filter = {};

		logTrace("query==", queryFilter, LogColors.BgCyan)

		// @ts-ignore
		const features = new APIFeatures(this.model.find(filter), queryFilter)
			.filter()
			.sort()
			.limitFields()
			.paginate();
		//
		return await features.query;

		// return Model.find(query)
	}

	async findMany() {
		return this.model.find({})
	}

	async findOneByQuery<Type>(query: FilterQuery<Type>, options: QueryOptions = {lean: false}) {
		return this.model.findOne(query, null, options);
	}

	async findOneById<Type>(id: string) {
		return this.model.findById({_id: id}).select("-__v")
	}


	async CreateOne<Type>(input: Object) {
		logTrace('creating-->', input)
		try {

			const usr = await this.model.create(input)
			usr.id = usr._id
			logTrace("se", usr)
			return usr
		} catch (e: any) {
			logTrace("MongoCreationError", e.message, LogColors.BgRed)
			return Promise.reject(e)
		}


	}

	async CreateMany<Type>(items: Array<Mongoose.Model<Type>>) {
		return this.model.insertMany(items)
	}


	async updateOneById<Type>(id: string, query: UpdateQuery<Type>) {
		logTrace(`updatingONeById--${id}`, query, LogColors.FgYellow)
		try {
			const user = await this.model.findByIdAndUpdate(id, query, {
				new: true,
				runValidators: true,
			})
			logTrace("updatedUser==", user, LogColors.BgGreen)
			return user
		} catch (e: any) {
			logTrace("update one error==", e.message, LogColors.BgRed)
			throw new Error(e.message)
		}


	}

	async updateOneByQuery<Type>(filter: FilterQuery<Type>, query: UpdateQuery<Type>) {
		return this.model.findOneAndUpdate(filter, query)
	}

	async upsertOneByQuery<Type>(filter: FilterQuery<Type>, query: UpdateQuery<Type>) {
		return this.model.findOneAndUpdate(filter, query, {
			upsert: true,
			runValidators: true,
		})
	}

	async deleteOneById<Type>(id: string) {

		logTrace("deleting ", id)
		const res = await this.model.findByIdAndDelete(id)
		if (res) {

			return 1
		}
		return 0
	}

	async deleteAll() {
		let res = await this.model.deleteMany({});
		return res.deletedCount ? res.deletedCount : 0

	}


}
