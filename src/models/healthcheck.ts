/** @format */

import { createSchema, Type, typedModel } from "ts-mongoose";

const healthcheck = createSchema({
	ArrayTest: Type.array().of({
		date: Type.date({ required: true }),
		message: Type.string({ required: true })
	}),
	BooleanTest: Type.boolean(),
	IntegerTest: Type.number({ required: true }),
	StringTest: Type.string({ required: true })
});

const healthcheckModel = typedModel("healthcheck", healthcheck);
healthcheckModel.createIndexes();

export default healthcheckModel;
