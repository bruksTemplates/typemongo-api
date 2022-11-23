import express, { Application } from 'express';
import UserRoute from "./app/users/user.routes"
import cors from 'cors'
import mongoose from "mongoose";
import { LogColors, logTrace } from "./common/logger";
import { getMongoUri } from "./config/constants";
// import validateAddress from "./middleware/address-validation";
// require('dotenv').config({path: __dirname + '/.env'});
import * as dotenv from "dotenv";

dotenv.config({path: __dirname + '/.env'});
// const {    GraphQLUpload,    graphqlUploadExpress, /* A Koa implementation is also exported.*/} = require('graphql-upload');

export const app: Application = express();

app.use(express.json());
app.use(cors({
	origin: '*',
	credentials: true
}))
// app.use(validateAddress)
app.get("/", function (req, res) {
	res.status(201).json("hi");
});

app.use("/api/v1/users", UserRoute())

const start = async (): Promise<void> => {
	try {
		const uri = getMongoUri()


		await mongoose.connect(
			uri
		).then(() => {
			logTrace("mongoose connected successfully", uri, LogColors.FgGreen)
		});

		app.listen(9200, () => {
			console.log("Server started on port http://localhost:9200/");
		});
	} catch (error: any) {
		logTrace("Start Error", error.message, LogColors.BgRed)
		console.error(error);
		process.exit(1);
	}
};

void start();
// const httpServer = http.createServer(app);
// export default httpServer;


