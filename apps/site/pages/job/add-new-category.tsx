import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function AddNewCategory() {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Add new category" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {!isAdmin && <UserGoBack />}
          {userData && loggedIn && isAdmin && (
            <section>
              <h2>Welcome To Add New Category Page</h2>
            </section>
          )}
        </main>
      </Layout>
    </>
  );
}
