import { LogColors, logTrace } from "../common/logger";

export const LOCAL_MONGO_DB_URI = process.env.LOCALMONGO || 'mongodb://localhost:27017/test9'
export const PORT = process.env.PORT || 9000
export const REMOTE_MONGO_DB_PASSWORD = process.env.REMOTE_MONGO_DB_PASSWORD || ""
export const REMOTE_MONGO_DB_USERNAME = process.env.REMOTE_MONGO_DB_USERNAME || ""
export const REMOTE_MONGO_DB_NAME = process.env.REMOTE_MONGO_DB_NAME || ""
export const IsMongoDbRemote = process.env.IsMongoDbRemote === "true" || false
export const REMOTE_MONGO_DB_URI = process.env.REMOTE_MONGO_DB_URI || ""

export const getMongoUri = () => {

	logTrace(LOCAL_MONGO_DB_URI, process.env.local, LogColors.BgGreen)
	return tryReadEnv('LOCALMONGO')
	if (IsMongoDbRemote) {

		logTrace("mongoUir=Remote", REMOTE_MONGO_DB_URI, LogColors.BgYellow)
		return REMOTE_MONGO_DB_URI
	} else
		return LOCAL_MONGO_DB_URI
}

export function tryReadEnv(variableId: string, defaultVal?: string) {
	if (variableId in process.env) {
		return process.env[variableId]!;
	}
	if (defaultVal != null) {
		return defaultVal;
	}
	throw new Error(
		`failed to read '${variableId}' environment variable`
	);
}

interface Consts {
	time: {
		minute: number,
		hour: number
		day: number
		week: number
	}
}

const constVals: Consts = {
	time: {
		minute: 1000 * 60,
		hour: 1000 * 60 * 60,
		day: 1000 * 60 * 60 * 24,
		week: 1000 * 60 * 60 * 24 * 7
		

	}
}
