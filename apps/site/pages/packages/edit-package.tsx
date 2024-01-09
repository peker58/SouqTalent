import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import EditPackageForm from "../../src/components/dashboard/packages/edit-package-form";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

const EditPackage = () => {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;
  return (
    <>
      <Head>
        <meta name="description" content="Create new package" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isAdmin && loggedIn && <UserGoBack />}
          {userData && loggedIn && isAdmin && <EditPackageForm />}
        </main>
      </Layout>
    </>
  );
};

export default EditPackage;
