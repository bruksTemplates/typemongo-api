import { Session, UserModel } from "./user.model";


export default class SessionService {


	public async addSession(id: string, input: Session) {


		const result = await UserModel.updateOne(
			{_id: id},
			{$push: {sessions: input}},
			// { safe: true, upsert: true },
		)
		let {modifiedCount, matchedCount} = result

		if (matchedCount && modifiedCount) {
			return result
		} else {
			throw new Error(JSON.stringify({"message": "nothing Modified", matchedCount, modifiedCount}))
		}
	}

	public async updateSession(id: string, input: Session) {
		const user = await UserModel.findById(id)


		const result = await UserModel.updateOne(
			{_id: id, 'sessions.sessionId': input.sessionId},
			{
				$set: {
					'sessions.$.hashedRefreshToken': input.hashedRefreshToken,
					'sessions.$.updatedAt': Date.now(),
				},
			},
		)
		let {modifiedCount, matchedCount} = result

		if (matchedCount && modifiedCount) {
			return result
		} else {
			throw new Error(JSON.stringify({"message": "nothing Modified", matchedCount, modifiedCount}))
		}
	}

	public async deleteSession(userId: string, input: Session) {


		const result = await UserModel.updateOne({_id: userId}, {
			$pull: {
				sessions: {sessionId: input.sessionId},
			},
		})
		let {modifiedCount, matchedCount} = result

		if (matchedCount && modifiedCount) {
			return result
		} else {
			throw new Error(JSON.stringify({"message": "nothing Modified", matchedCount, modifiedCount}))
		}

	}

	public async deleteExpiredSessions(id: string, input: Session) {
		const minutes = 1000 * 60 * 60
		const result = await UserModel.updateOne({_id: id}, {
			$pull: {
				sessions: {updatedAt: {$lt: Date.now() - 1000 * 60 * 60 * 24 * 7}},
			},
		})

		let {modifiedCount, matchedCount} = result

		if (matchedCount && modifiedCount) {
			return result
		} else {
			throw new Error(JSON.stringify({"message": "nothing Modified", matchedCount, modifiedCount}))
		}
	}
}
