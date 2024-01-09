import apiConnector from '@metajob/api-connector';
import { NextApiRequest, NextApiResponse } from 'next';

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

                const jobs = await connect.getJobsPrivate(accessToken);
                res.status(200).send({
                    message: 'Successfully fetched all private jobs',
                    data: jobs,
                });
            } catch (e: any) {
                res.status(500).send({
                    message: e.message,
                    error: 'Server Error',
                });
            }
    }
}
