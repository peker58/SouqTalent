import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import apiConnector from '@metajob/api-connector'

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

apiRoute.post(async (req, res) => {
	try {
		const { id } = req.query
		const connect = await apiConnector
		const { headers } = req as any
		const accessToken = headers.authorization?.substring(
			7,
			headers.authorization.length
		)

		const reqQuery = {
			accessToken,
		}
		const send = await connect.resendConfirmEmail(reqQuery)

		return res.status(200).send({
			message: 'Confirmation email sent successfully',
		})
	} catch (e: any) {
		res.status(500).send({
			message: 'Server Error',
			error: e.message,
		})
	}
})

export default apiRoute
