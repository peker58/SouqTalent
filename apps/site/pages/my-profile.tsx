import Head from "next/head";
import React from "react";
import Layout from "../src/components/dashboard/layout";
import ProfileBox from "../src/components/dashboard/profile";
import useUser, { UserNotLogin } from "../src/components/lib/user";

export default function MyProfile() {
  const { user, loggedIn, loggedOut } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="My profile " />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && loggedIn && <ProfileBox data={userData} />}
        </main>
      </Layout>
    </>
  );
}
