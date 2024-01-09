import { NextApiRequest, NextApiResponse } from 'next';
import apiConnector from '@metajob/api-connector';

/**
 * Call API function to fetch Review Data.
 * @param {Object} options.
 * @returns {Object} Review Data.
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const connect = await apiConnector;
    // connect to database
    await connect.connectDB();

    switch (req.method) {
        case 'GET':
            try {
                const { id } = req.query;
                const connect = await apiConnector;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    emailType: id,
                };

                const email = await connect.getEmailSettings(reqQuery);
                res.status(200).send({
                    message:
                        'Successfully fetched email template by email type',
                    data: email,
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
            break;
        case 'PUT':
            try {
                const { id } = req.query;
                const connect = await apiConnector;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    emailType: id,
                    body: req.body,
                };

                const email = await connect.updateEmailSettings(reqQuery);

                res.status(200).send({
                    message: 'Successfully updated email template ',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: 'Server Error',
                    error: e.message,
                });
            }
    }
}
