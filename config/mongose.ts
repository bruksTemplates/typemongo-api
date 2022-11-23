/**
 * Node, TS, Apollo, Auth, - Starter
 * https://github.com/eduard-kirilov/node-ts-apollo-auth-starter
 * Copyright (c) 2020 Eduard Kirilov | MIT License
 */
import mongoose from 'mongoose';
import chalk from 'chalk';


import { getMongoUri } from "./constants"
import { LogColors, logTrace } from "../common/logger";

export const mongooseMiddleware = (): void => {
	// mongoose.set('useFindAndModify', false);
	// mongoose.set('useCreateIndex', true);
	// mongoose.set('useNewUrlParser', true);
	// mongoose.set('useUnifiedTopology', true);
	let uri = getMongoUri()
	// chalk.blue(uri)
	logTrace("uri=", uri, LogColors.BgYellow)
	mongoose.connect(uri);
	mongoose.connection.on('connected', () => {
		console.log(`${chalk.green('✓')} MongoDB successfully connected.`);
	});
	mongoose.connection.on('error', (err) => {
		console.error(err);
		console.log(`${chalk.red('✗')} MongoDB connection error. Please make sure MongoDB is running.`);
		process.exit();
	});
};
