import apiConnector from '@metajob/api-connector'
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Call API function to message.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const connect = await apiConnector
	// connect to database
	await connect.connectDB()

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;

        const { headers } = req as any;
        const accessToken = headers.authorization?.substring(
          7,
          headers.authorization.length
        );

        const message = await connect.findMessageRoom(accessToken);

        if (message.length === 0) {
          return res.status(200).send({
            message: "No Message Found",
            data: [],
          });
        }


        res.status(200).send({
          message: "Successfully get message",
          data: message,
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "PUT":

      try {
        const { id } = req.query;
        const { body } = req;
        const { headers } = req as any;
        const accessToken = headers.authorization?.substring(
          7,
          headers.authorization.length
        );

        const message = await connect.updateMessageRoom(id, body);

        if (message.length === 0) {
          return res.status(200).send({
            message: "No Message Found",
            data: [],
          });
        }

        res.status(200).send({
          message: "Successfully updated message",
          data: message,
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
  }
}
