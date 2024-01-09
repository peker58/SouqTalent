import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import PreviewPackages from "../../src/components/dashboard/packages/preview-packages";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

const ActivePackage = () => {
  const { user, loggedIn, loggedOut, isEmployer } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Active package" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isEmployer && loggedIn && <UserGoBack />}
          {userData && loggedIn && isEmployer && <PreviewPackages />}
        </main>
      </Layout>
    </>
  );
};

export default ActivePackage;
