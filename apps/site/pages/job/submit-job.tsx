import Head from "next/head";
import React from "react";
import SubmitJobForm from "../../src/components/dashboard/form/submit-job-form";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function SubmitJob() {
  const { user, loggedIn, loggedOut, isCandidate } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Submit your Job Details. fill up all the required field" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isCandidate && <UserGoBack />}
          {userData && loggedIn && !isCandidate && (
            <SubmitJobForm userData={userData} />
          )}
        </main>
      </Layout>
    </>
  );
}
