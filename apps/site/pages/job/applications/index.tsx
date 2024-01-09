import Head from "next/head";
import React from "react";
import AllApplications from "../../../src/components/dashboard/job/all-applied-job";
import Layout from "../../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../../src/components/lib/user";

const Applications = () => {
  const { user, loggedIn, loggedOut, isEmployer } = useUser();
  const userData = user?.data;
  return (
    <>
      <Head>
        <meta name="description" content="Job Application" />
      </Head>

      <Layout>
        {loggedOut && <UserNotLogin />}
        {isEmployer && <UserGoBack />}
        <main>
          {userData && loggedIn && !isEmployer && <AllApplications />}
        </main>
      </Layout>
    </>
  );
};

export default Applications;
