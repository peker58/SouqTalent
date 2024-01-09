import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import PreviewPackages from "../../src/components/dashboard/packages/preview-packages";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

const PreviewPackage = () => {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;

  return (
    <>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isAdmin && loggedIn && <UserGoBack />}
          {userData && loggedIn && isAdmin && <PreviewPackages />}
        </main>
      </Layout>
    </>
  );
};

export default PreviewPackage;
