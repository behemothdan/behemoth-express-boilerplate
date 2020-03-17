/** @format */

import express, { Response,Request } from "express";
import HealthcheckObject from "./../models/healthcheck";

const router = express.Router();

/** This file tests our ability to use the database
 * using our healthcheck endpoints for inserting,
 * retrieving and deleting. We prefixed all the req
 * with an underscore to keep Typescript happy since
 * they need to be included in the API methods even
 * though they are not being used here. In other files
 * the underscore should be removed.
 */
router
	.route("/")
	.get((_req: Request, res: Response) => {
		return res.send("The API is running.");
	})
	.post((res: Response) => {
		const healthcheckObject = new HealthcheckObject();

		/**These are the different type tests we want to
		 * make sure are working in this simple healthcehck
		 * endpoint for now.
		 */
		healthcheckObject.StringTest =
			"This is a string we are testing inserting into the database.";
		healthcheckObject.IntegerTest = 1;
		healthcheckObject.BooleanTest = true;
		healthcheckObject.ArrayTest = [
			{ message: "Hello General Kenobi!", date: new Date(2020 - 1 - 15) }
		];
		healthcheckObject.save(err => {
			if (err) {
				res.send(err);
			} else {
				res.json(healthcheckObject);
			}
		});
	})
	.delete((_req: Request, res: Response) => {
		HealthcheckObject.deleteOne({ IntegerTest: 1 }, err => {
			if (err) {
				res.send(err);
			} else {
				res.json({ message: "Deleted successfully." });
			}
		});
	});

export default router;
