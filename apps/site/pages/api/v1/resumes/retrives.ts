import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import apiConnector from '@metajob/api-connector';
import upload from '@/src/lib/multer';

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

apiRoute.use(
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'resumeFile', maxCount: 1 },
    ]),
);

//create a resume
apiRoute.post(async (req, res) => {
    try {
        const connect = await apiConnector;
        const { headers } = req as any;
        const accessToken = headers.authorization?.substring(
            7,
            headers.authorization.length,
        );

        const { files } = req as any;
        const requestFiles = files;
        let image = '';
        let resumeFile = '';
        if (requestFiles.image) {
            image = requestFiles.image[0]?.path;
        }
        if (requestFiles.resumeFile) {
            resumeFile = requestFiles.resumeFile[0]?.path;
        }
        const inputFiles = {
            image,
            resumeFile,
        };
        let sortSkills = [];
        if (req.body.skills.length !== 0 && req.body.skills) {
            sortSkills = JSON.parse(req.body.skills);
        }
        const resumeInput = {
            name: req.body.fullName,
            email: req.body.email,
            region: req.body.region,
            professionalTitle: req.body.professionalTitle,
            location: req.body.location,
            video: req.body.video,
            category: req.body.category,
            workingRate: req.body.workingRate,
            education: JSON.parse(req.body.education),
            resumeContent: req.body.resumeContent,
            skills: sortSkills,
            url: JSON.parse(req.body.url),
            experience: JSON.parse(req.body.experience),
        };

        const reqQuery = {
            accessToken,
            resumeInput,
            inputFiles,
        };
        const resume = await connect.createResume(reqQuery);
        res.status(200).send({
            message: 'Successfully created a resume',
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
            error: e.message,
        });
    }
});

// find all resume of a candidate
apiRoute.get(async (req, res) => {
    try {
        const connect = await apiConnector;
        const { headers } = req as any;
        const accessToken = headers.authorization?.substring(
            7,
            headers.authorization.length,
        );

        const resumes = await connect.getResumePrivate(accessToken);

        res.status(200).send({
            message: 'Successfully fetched all resumes',
            data: resumes,
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Server error',
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
//         const connect = await apiConnector
//         const { headers } = req as any
//         const accessToken = headers.authorization?.substring(7, headers.authorization.length);

//         const resumes = await connect.getResumePrivate(accessToken)

//         res.status(200).send({
//           message: "Successfully fetched all resumes",
//           data: resumes
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//       break;
//     case "POST":
//       try {
//         res.status(200).send({
//           message: "Resume created successfully",
//         });
//       } catch (e: any) {
//         res.status(500).send({
//           message: "Server Error",
//           error: e.message,
//         });
//       }
//   }
// }
