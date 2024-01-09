import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from '@metajob/api-connector'
import nextConnect from 'next-connect'


const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
	onError(error, req, res) {
		res
			.status(501)
			.json({ error: `Sorry something Happened! ${error.message}` })
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method "${req.method}" Not Allowed` })
	},
})

apiRoute.use(async (req, res, next) => {
	try {
		const connect = await apiConnector
		await connect.connectDB()
		next()
	} catch (e: any) {
		res.status(500).send({
			message: 'Server Error',
			error: e.message,
		})
	}
})

apiRoute.put(async (req, res) => {
	const connect = await apiConnector

	const { headers } = req as any
	const accessToken = headers.authorization?.substring(
		7,
		headers.authorization.length
	)
	
  const packageId = req.body.packageId;

	const reqQuery = {
		accessToken,
		packageId,
	}

	 await connect.updateUserPackage(reqQuery)

	res.status(200).send({
		message: 'Successfully updated user package',
	})
})

export default apiRoute