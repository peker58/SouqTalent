import Head from "next/head";
import React from "react";
import JobAlertsInfo from "../../src/components/dashboard/job-alerts";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function JobAlerts() {
  const { user, loggedIn, loggedOut, isEmployer } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Job Alert" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isEmployer && <UserGoBack />}
          {userData && loggedIn && !isEmployer && <JobAlertsInfo />}
        </main>
      </Layout>
    </>
  );
}
