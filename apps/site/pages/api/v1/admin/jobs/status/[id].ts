import { NextApiRequest, NextApiResponse } from 'next';
import apiConnector from '@metajob/api-connector';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const connect = await apiConnector;
    // connect to database
    await connect.connectDB();
    switch (req.method) {
        case 'PUT':
            try {
                const connect = await apiConnector;
                const { id } = req.query;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const rewQuery = {
                    accessToken,
                    jobId: id,
                    jobStatus: req.body.status,
                };
                const message = await connect.updateJobStatus(rewQuery);

                res.status(200).send({
                    message,
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
    }
}
