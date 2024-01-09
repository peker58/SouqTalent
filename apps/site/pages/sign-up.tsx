import Head from "next/head";
import React from "react";
import Layout from "../src/components/frontend/layout";
import useUser, { UserLogin } from "../src/components/lib/user";
import RegisterForm from "../src/components/register/register-form";

export default function SignUp() {
  const { loggedIn, loggedOut } = useUser();
  if (loggedIn) return <UserLogin />;

  if (loggedOut) {
    return (
      <>
        <Head>
          <meta name="description" content="Sign Up to get access" />
        </Head>

        <Layout>
          <main>
            <section className="py-24 md:py-32 bg-light">
              <RegisterForm />
            </section>
          </main>
        </Layout>
      </>
    );
  }
}
