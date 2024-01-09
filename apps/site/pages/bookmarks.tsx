import Head from "next/head";
import React from "react";
import AllList from "../src/components/dashboard/bookmarks/all-list";
import Layout from "../src/components/dashboard/layout";
import useUser, { UserNotLogin } from "../src/components/lib/user";

export default function Bookmarks() {
  const { user, loggedIn, loggedOut } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Bookmark jobs, company and resume" />
      </Head>
      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && loggedIn && <AllList />}
        </main>
      </Layout>
    </>
  );
}
