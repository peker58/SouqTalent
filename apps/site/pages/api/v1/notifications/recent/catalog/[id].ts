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
        case 'PUT':
            try {
                const { id } = req.query;
                const status = req.body.status;

                const connect = await apiConnector;

                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = { accessToken, notificationId: id, status };

                const notifications = await connect.updateNotification(
                    reqQuery,
                );

                res.status(200).send({
                    message: 'Successfully updated notofication status',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
    }
}
