import Head from "next/head";
import React from "react";
import CategoryInfo from "../../src/components/dashboard/job-alerts/category-info";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function Category() {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="category page " />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isAdmin && <UserGoBack />}
          {userData && loggedIn && isAdmin && <CategoryInfo />}
        </main>
      </Layout>
    </>
  );
}
