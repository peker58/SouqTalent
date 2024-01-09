import Head from "next/head";
import React from "react";
import Layout from "../src/components/dashboard/layout";
import MessagesInfo from "../src/components/dashboard/messages";
import useUser, { UserNotLogin } from "../src/components/lib/user";

export default function Messages() {
  const { user, loggedIn, loggedOut } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Message Page" />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && loggedIn && <MessagesInfo />}
        </main>
      </Layout>
    </>
  );
}
