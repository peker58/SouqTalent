import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import AllResumes from "../../src/components/dashboard/manage-resumes/all-resumes";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function ManagesResumes() {
  const { user, loggedIn, loggedOut, isEmployer } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Manage Your Resumes" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isEmployer && <UserGoBack />}
          {userData && loggedIn && !isEmployer && <AllResumes />}
        </main>
      </Layout>
    </>
  );
}
