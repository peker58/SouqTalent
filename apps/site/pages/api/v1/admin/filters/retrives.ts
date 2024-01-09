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
                const filters = await connect.getFilters();
                if (!filters) {
                    return res.status(404).send({
                        message: 'Sorry No filters Created yet',
                    });
                }
                res.status(200).send({
                    message: 'Successfully find all filters',
                    data: filters,
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
                const connect = await apiConnector;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    body: req.body,
                };

                const packageResult = await connect.createFilter(reqQuery);

                res.status(200).send({
                    message: 'Filter created successfully',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: 'Server Error',
                    error: e.message,
                });
            }
    }
}
