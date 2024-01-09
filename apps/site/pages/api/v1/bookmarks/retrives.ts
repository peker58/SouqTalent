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

//get all bookmarks of an user
apiRoute.get(async (req, res) => {
	try {
		const connect = await apiConnector

		const { headers } = req as any
		const accessToken = headers.authorization?.substring(
			7,
			headers.authorization.length
		)

		const bookmarks = await connect.getBookmarks(accessToken)

		if (bookmarks[0].bookmarks.length == 0) {
			return res.status(200).send({
				message: 'No Bookmark Found',
				data: [],
			})
		}
		res.status(200).send({
			message: 'Successfully find all bookmarks',
			data: bookmarks[0].bookmarks,
		})
	} catch (e: any) {
		res.status(500).send({
			message: 'Server Error',
			error: e.message,
		})
	}
})

//create a bookmarks
apiRoute.post(async (req, res) => {
	try {
		const connect = await apiConnector
		const { headers } = req as any
		const accessToken = headers.authorization?.substring(
			7,
			headers.authorization.length
		)

		const reqQuery = {
			accessToken,
			body: {
				...req.body,
			},
		}
		const bookmark = await connect.createBookmark(reqQuery)

		res.status(200).send({
			message: 'Bookmark successfully created',
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
//         const connect = await apiConnector

//         const { headers } = req as any
//         const accessToken = headers.authorization?.substring(7, headers.authorization.length);

//         const bookmarks = await connect.getBookmarks(accessToken)

//         if (bookmarks[0].bookmarks.length == 0) {
//           return res.status(200).send({
//             message: 'No Bookmark Found',
//             data: [],
//           })
//         }
//         res.status(200).send({
//           message: 'Successfully find all bookmarks',
//           data: bookmarks[0].bookmarks,
//         })
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//     case "POST":
//       try {
//         res.status(200).send({
//           message: "Bookmark created successfully",
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//   }
// }
