import Head from "next/head";
import React from "react";
import AddJobAlerts from "../../src/components/dashboard/job-alerts/add-job-alerts";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function AddNewAlert() {
  const { user, loggedIn, loggedOut, isEmployer } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content=" Add New Alert" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isEmployer && <UserGoBack />}
          {userData && loggedIn && !isEmployer && <AddJobAlerts />}
        </main>
      </Layout>
    </>
  );
}
