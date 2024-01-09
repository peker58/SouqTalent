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

apiRoute.use(upload.single('headerImage'));

//update job
apiRoute.put(async (req, res) => {
    try {
        const { id } = req.query;
        const connect = await apiConnector;
        const { headers } = req as any;
        const accessToken = headers.authorization?.substring(
            7,
            headers.authorization.length,
        );

        const { file } = req as any;
        const headerImage = file?.path;

        const jobData = {
            company: req.body.company,
            jobTitle: req.body.jobTitle,
            location: req.body.location,
            region: req.body.region,
            jobTypes: req.body.jobTypes.split(','),
            category: req.body.category,
            jobExperience: req.body.jobExperience,
            specialTags: req.body.specialTags.split(','),
            jobDescription: req.body.jobDescription,
            email: req.body.email,
            applyDeadline: req.body.applyDeadline,
            hourlyrate: {
                minimum: req.body.hourlyrateMinimum,
                maximum: req.body.hourlyrateMaximum,
            },
            salary: {
                minimum: req.body.salaryMinimum,
                maximum: req.body.salaryMaximum,
            },
            applyLink: req.body.applyLink,
        };

        const reqQuery = {
            accessToken,
            jobData,
            headerImage,
            jobID: id,
        };
        const job = await connect.updateJob(reqQuery);

        res.status(200).send({
            message: 'Successfully updated job',
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        });
    }
});

apiRoute.get(async (req, res) => {
    try {
        const { id } = req.query;
        const connect = await apiConnector;

        const job = await connect.getSingleJob(id);

        if (!job) {
            return res.status(404).send({
                message: 'Job Not Found',
            });
        }

        return res.status(200).send({
            message: 'Job Found',
            data: job.job,
            relatedJobs: job.relatedJobs,
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server Error',
            error: e.message,
        });
    }
});

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
            jobId: id,
        };
        const job = await connect.deleteJob(reqQuery);

        res.status(200).send({
            message: 'Successfully deleted job',
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

//         const job = await connect.getSingleJob(id)

//         if (!job) {
//           return res.status(404).send({
//             message: 'Job Not Found',
//           })
//         }

//         return res.status(200).send({
//           message: 'Job Found',
//           data: job.job,
//           relatedJobs: job.relatedJobs,
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

//         res.status(200).send({
//           message: "Successfully updated job",
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
//           jobId: id,
//         }
//         const job = await connect.deleteJob(reqQuery)

//         res.status(200).send({
//           message: "Successfully deleted job",
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
