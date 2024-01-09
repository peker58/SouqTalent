import Head from "next/head";
import React from "react";
import ApplicationsByJob from "../../../src/components/dashboard/job/applications-by-job";
import Layout from "../../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../../src/components/lib/user";

const JobApplications = () => {
  const { user, loggedIn, loggedOut, isCandidate } = useUser();
  const userData = user?.data;
  return (
    <>
      <Head>
        <meta name="description" content="Job Application" />
      </Head>

      <Layout>
        {loggedOut && <UserNotLogin />}
        {isCandidate && <UserGoBack />}
        <main>
          {userData && loggedIn && !isCandidate && <ApplicationsByJob />}
        </main>
      </Layout>
    </>
  );
};

export default JobApplications;
