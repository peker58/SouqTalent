import upload from '@/src/lib/multer';
import apiConnector from '@metajob/api-connector';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
    },
});

apiRoute.use(
    upload.fields([
        { name: 'logoImage', maxCount: 1 },
        { name: 'headerImage', maxCount: 1 },
    ]),
);

apiRoute.use(async (req, res, next) => {
    try {
        const connect = await apiConnector;
        await connect.connectDB();
        next();
    } catch (e: any) {
        res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
});
//update company
apiRoute.put(async (req, res) => {
    try {
        const { id } = req.query;
        const connect = await apiConnector;
        const { headers } = req as any;
        const accessToken = headers.authorization?.substring(
            7,
            headers.authorization.length,
        );

        const { files } = req as any;
        const inputFiles = files;
        let logoImage = '';
        let headerImage = '';
        if (inputFiles.logoImage) {
            logoImage = inputFiles.logoImage[0]?.path;
        }
        if (inputFiles.headerImage) {
            headerImage = inputFiles.headerImage[0]?.path;
        }
        const images = {
            logoImage,
            headerImage,
        };
        const companyInput = {
            companyName: req.body.companyName,
            companyTagline: req.body.companyTagline,
            category: req.body.category,
            companyEmail: req.body.companyEmail,
            phoneNumber: req.body.phoneNumber,
            eatablishedDate: req.body.eatablishedDate,
            companyWebsite: req.body.companyWebsite,
            avarageSalary: req.body.avarageSalary,
            companySize: req.body.companySize,
            description: req.body.description,
            location: req.body.location,
            locationMap: {
                latitude: req.body.locationLatitude,
                longitude: req.body.locationLongitude,
            },
            videoLink: req.body.videoLink,
            socialLink: {
                linkedin: req.body.linkedinLink,
                facebook: req.body.facebookLink,
                twitter: req.body.twitterLink,
            },
        };

        const reqQuery = {
            accessToken,
            companyInput,
            images,
            companyId: id,
        };
        const company = await connect.updateCompany(reqQuery);

        res.status(200).send({
            message: 'Successfully Updated Company Profile',
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        });
    }
});

//get a company by id
apiRoute.get(async (req, res) => {
    try {
        const { id } = req.query;
        const connect = await apiConnector;

        const companyResult = await connect.getSingleCompany(id);

        return res.status(200).send({
            message: 'Company Profile Found',
            data: companyResult,
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
});

//delete a company by id
apiRoute.delete(async (req, res) => {
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
            companyId: id,
        };
        const company = await connect.deleteCompany(reqQuery);

        res.status(200).send({
            message: 'Successfully deleted company',
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};

// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "GET":
//       try {
//         const { id } = req.query;
//         const connect = await apiConnector

//         const companyResult = await connect.getSingleCompany(id)

//         return res.status(200).send({
//           message: 'Company Profile Found',
//           data: companyResult,
//         })
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//     case "PUT":
//       try {
//         const { id } = req.query;
//         const jobID = id as string;

//         res.status(200).send({
//           message: "Successfully updated company",
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//     case "DELETE":
//       try {
//         const connect = await apiConnector
//         const { id } = req.query;
//         const { headers } = req as any
//         const accessToken = headers.authorization?.substring(7, headers.authorization.length);

//         const reqQuery = {
//           accessToken,
//           companyId: id,
//         }
//         const company = await connect.deleteCompany(reqQuery)

//         res.status(200).send({
//           message: "Successfully deleted company",
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//   }
// }
