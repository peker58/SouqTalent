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

// connect to db
//  const connect = await apiConnector
// await connect.connectDB()
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

//check a bookmark by job-id
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
			bookmarkId: id,
		}

		const bookmarkData = (await connect.checkBookmark(reqQuery)) as any

		if (!bookmarkData.isBookmark) {
			return res.status(200).send({
				message: 'Bookmark not found',
				data: bookmarkData,
			})
		}

		res.status(200).send({
			message: 'Bookmark status found',
			data: bookmarkData,
		})
	} catch (e: any) {
		res.status(500).send({
			message: 'Server Error',
			error: e.message,
		})
	}
})

//delete a bookmark by job-id
apiRoute.delete(async (req, res) => {
	try {
		const connect = await apiConnector
		const { id } = req.query
		const { headers } = req as any
		const accessToken = headers.authorization?.substring(
			7,
			headers.authorization.length
		)

		const reqQuery = {
			accessToken,
			bookmarkId: id,
		}
		const bookmark = await connect.deleteBookmark(reqQuery)
		if (!bookmark) {
			return res.status(404).send({
				message: 'Bookmark Not Found',
			})
		}
		return res.status(200).send({
			message: 'Bookmark Deleted',
		})
	} catch (e: any) {
		res.status(500).send({
			message: 'Server Error',
			error: e.message,
		})
	}
})

export default apiRoute

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "GET":
//       try {
//         const { id } = req.query;

//         res.status(200).send({
//           message: "Successfully fetched bookmark",
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//     case "DELETE":
//       try {
//         const { id } = req.query;

//         res.status(200).send({
//           message: "Successfully removed bookmark",
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//   }
// }
