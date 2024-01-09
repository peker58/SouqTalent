import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import apiConnector from '@metajob/api-connector'

import dbConnect from '@metajob/next-mongo/utils/connect'

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

//get all applications of a Job
apiRoute.get(async (req, res) => {
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
			jobID: id,
		}
		const japplyData = await connect.getJobApplication(reqQuery)
		return res.status(200).send({
			message: 'Successfully find all applications of this job',
			data: japplyData,
		})
	} catch (e: any) {
		res.status(500).send({
			message: 'Server Error',
			error: e.message,
		})
	}
})

// update job application status
apiRoute.put(async (req, res) => {
	try {
		const { id } = req.query
		const connect = await apiConnector
		const { headers } = req as any
		const accessToken = headers.authorization?.substring(
			7,
			headers.authorization.length
		)

		const applyData = {
			status: req.body.status,
		}

		const reqQuery = {
			accessToken,
			applyData,
			applyId: id,
		}
		const application = await connect.updateApplyStatus(reqQuery)

		if (!application) {
			return res.status(404).send({
				message: 'Application Not Found',
			})
		}
		return res.status(200).send({
			message: 'Application Updated',
			application,
		})
	} catch (e: any) {
		res.status(500).send({
			message: 'Server error',
			error: e.message,
		})
	}
})

export default apiRoute

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
