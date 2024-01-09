import type { NextApiRequest, NextApiResponse } from "next";
import apiConnector from '@metajob/api-connector'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const connect = await apiConnector
        const { headers } = req as any
        const accessToken = headers.authorization?.substring(7, headers.authorization.length);

        const jobAlerts = await connect.getJobAlerts(accessToken)

        res.status(200).send({
          message: "Successfully fetched all alert by this user",
          data: jobAlerts
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
      break;
    case "POST":
      try {
        const connect = await apiConnector
        const { headers } = req as any
        const accessToken = headers.authorization?.substring(7, headers.authorization.length);
        const reqData = {
          body: req.body,
          accessToken
        }
        const jobAlert = await connect.createJobAlerts(reqData)

        res.status(200).send({
          message: "Job alert created successfully",
        });
      } catch (e: any) {
        res.status(500).send({
          message: "Server Error",
          error: e.message,
        });
      }
  }
}
