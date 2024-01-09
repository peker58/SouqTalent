import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import AllPackages from "../../src/components/dashboard/packages/all-packages";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

const Packages = () => {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Your package to get features" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isAdmin && loggedIn && <UserGoBack />}
          {userData && loggedIn && isAdmin && <AllPackages />}
        </main>
      </Layout>
    </>
  );
};

export default Packages;
