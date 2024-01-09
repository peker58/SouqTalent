import Head from "next/head";
import React from "react";
import AllCompanies from "../../src/components/dashboard/companies/all-companies";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function ManagesCompanies() {
  const { user, loggedIn, loggedOut, isCandidate } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Manage Your Company" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isCandidate && <UserGoBack />}
          {userData && loggedIn && !isCandidate && <AllCompanies />}
        </main>
      </Layout>
    </>
  );
}
