import Head from "next/head";
import React from "react";

import EditResume from "../../src/components/dashboard/edit-resume/edit-resume-form";
import Layout from "../../src/components/dashboard/layout";

import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function AddResume() {
  const { user, loggedIn, loggedOut, isEmployer } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Add resume" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isEmployer && <UserGoBack />}
          {userData && loggedIn && !isEmployer && <EditResume />}
        </main>
      </Layout>
    </>
  );
}
