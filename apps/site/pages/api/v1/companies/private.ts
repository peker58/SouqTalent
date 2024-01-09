import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from '@metajob/api-connector'

export default async function (req: NextApiRequest, res: NextApiResponse) {

	const connect = await apiConnector
	// connect to database
	await connect.connectDB()

    switch (req.method) {
        case "GET":
            try {
                const { id } = req.query;
                const connect = await apiConnector
                const { headers } = req as any
                const accessToken = headers.authorization?.substring(7, headers.authorization.length);

                const companies = await connect.findCompanyPrivate(accessToken)

                res.status(200).send({
                    message: "Successfully fetched all private companies",
                    data: companies
                });
            } catch (e: any) {
                res.status(500).send({
                    message: "Server Error",
                    error: e.message,
                });
            }
            break;
        default:
            res.status(400).send({
                message: "Unknown request",
            });
    }
}
