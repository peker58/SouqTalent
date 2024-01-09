import type { NextApiRequest, NextApiResponse } from 'next';
import apiConnector from '@metajob/api-connector';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                res.status(200).send({
                    message: 'Successfully fetched all jobs',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: 'Server Error',
                    error: e.message,
                });
            }
            break;
        case 'POST':
            try {
                const { id } = req.query;
                const connect = await apiConnector;
                await connect.connectDB();
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    emailType: req.body.emailType,
                    body: req.body,
                };

                await connect.createEmailSettings(reqQuery);

                res.status(200).send({
                    message: 'Email template created successfully" ',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
    }
}
