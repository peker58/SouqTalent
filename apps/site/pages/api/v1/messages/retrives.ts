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

                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const message = await connect.findMessageRoom(accessToken);

                if (message.length === 0) {
                    return res.status(200).send({
                        message: 'No Message Found',
                        data: [],
                    });
                }

                res.status(200).send({
                    message: 'Fetched message rooms',
                    data: message,
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
                const { body } = req;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const message = await connect.createMessageRoom(body);

                if (message.length === 0) {
                    return res.status(200).send({
                        message: 'No Message Found',
                        data: [],
                    });
                }

                res.status(200).send({
                    message: 'Messages sent successfully',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
    }
}
