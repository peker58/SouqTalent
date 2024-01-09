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
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    packageId: id,
                };

                const packageResult = await connect.getSinglePackage(reqQuery);
                res.status(200).send({
                    message: 'Successfully fetched packege',
                    data: packageResult,
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
                const connect = await apiConnector;
                const { id } = req.query;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    packageId: id,
                    body: req.body,
                };

                const packageResult = await connect.updatePackage(reqQuery);

                res.status(200).send({
                    message: 'Successfully updated packege',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: 'Server Error',
                    error: e.message,
                });
            }
            break;
        case 'DELETE':
            try {
                const connect = await apiConnector;
                const { id } = req.query;
                const { headers } = req as any;
                const accessToken = headers.authorization?.substring(
                    7,
                    headers.authorization.length,
                );

                const reqQuery = {
                    accessToken,
                    packageId: id,
                };

                const packageResult = await connect.deletePackage(reqQuery);

                res.status(200).send({
                    message: 'Successfully deleted packege',
                });
            } catch (e: any) {
                res.status(500).send({
                    message: 'Server Error',
                    error: e.message,
                });
            }
            break;
    }
}
