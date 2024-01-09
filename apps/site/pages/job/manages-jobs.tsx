import Head from "next/head";
import React from "react";
import MangeJobsList from "../../src/components/dashboard/job/manage-jobs-list";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function ManagesJobs() {
  const { user, loggedIn, loggedOut, isCandidate } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
      <meta name="description" content="Manage your job" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isCandidate && <UserGoBack />}
          {userData && loggedIn && !isCandidate && <MangeJobsList />}
        </main>
      </Layout>
    </>
  );
}
