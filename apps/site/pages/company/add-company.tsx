import Head from "next/head";
import React from "react";
import AddCompanyForm from "../../src/components/dashboard/form/add-company-form";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function AddCompany() {
  const { user, loggedIn, loggedOut, isCandidate } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Add your company" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {isCandidate && <UserGoBack />}
          {userData && loggedIn && !isCandidate && <AddCompanyForm />}
        </main>
      </Layout>
    </>
  );
}
