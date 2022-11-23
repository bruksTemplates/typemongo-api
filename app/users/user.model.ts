import { DocumentType, getModelForClass, Prop, prop } from '@typegoose/typegoose';
// import { getSchemaOptions } from 'src/util/typegoose';
// import { Field as GqlField, ObjectType as GqlType } from 'type-graphql';


export class Session {
	@Prop({unique: true})
	sessionId!: string

	@Prop()
	deviceInfo?: string

	@Prop({type: String})
	hashedRefreshToken!: string

	@Prop({type: Date, default: Date.now})
	createdAt!: Date

	@Prop({type: Date, default: Date.now})
	updatedAt!: Date
}

export const SessionSchema = getModelForClass(Session);

export class User {
	// readonly id!: string;

	@prop({required: true})
	firstName!: string;

	@prop({required: false})
	lastName?: string;

	@prop({required: true})
	password!: string;

	@prop({required: true, unique: true})
	email!: string;

	@Prop({type: () => [Session]})
	sessions?: Session[]

	hashPassword(this: DocumentType<User>, _password: string) {
		// logic to hash passwords
	}
}

export const UserModel = getModelForClass(User); // UserModel is a regular Mongoose Model with correct types
