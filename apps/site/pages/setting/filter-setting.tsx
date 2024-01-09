import Head from "next/head";
import React from "react";
import Layout from "../../src/components/dashboard/layout";
import Filters from "../../src/components/dashboard/super-admin/Filters";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

export default function FilterPage() {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Filter Settings" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isAdmin && <UserGoBack />}
          {userData && loggedIn && isAdmin && (
            <section>
              <Filters />
            </section>
          )}
        </main>
      </Layout>
    </>
  );
}
