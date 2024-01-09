import type { NextApiRequest, NextApiResponse } from 'next';
import apiConnector from '@metajob/api-connector';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const connect = await apiConnector;
    // connect to database
    await connect.connectDB();

    switch (req.method) {
        case 'GET':
            try {
                const connect = await apiConnector;
                await connect.connectDB();

                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const notifications = await connect.getNotification(
                    accessToken,
                );
                res.status(200).send({
                    message: 'Successfully fetched recent activities',
                    data: notifications,
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
            break;
        case 'POST':
            try {
                res.status(200).send({
                    message: 'Recent notification created successfully',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: 'Server Error',
                    error: e.message,
                });
            }
    }
}
