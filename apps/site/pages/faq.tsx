import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../src/components/frontend/layout";
import PageTitle from "../src/components/frontend/page-title";

const FAQ = () => {
  const router = useRouter();
  let path = router.pathname;
  path = path.replace("/", "");
  path = path.toUpperCase();
  path = path.replace(/-/g, " ");

  return (
    <>
      <Head>
        <meta name="description" content={path} />
      </Head>

      <Layout>
        <main>
          <PageTitle title={path} />
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full shadow rounded bg-white !p-8 relative">
                <p className="text-themeLight leading-6 !mb-4">
                <h2>Frequently Asked Questions</h2>
                <h3>1. How do I create an account on Souq Talent?</h3>
  <p>Creating an account on Souq Talent is quick and easy. Click on the "Sign Up" button on the homepage,
     fill in the required information, and you'll be ready to explore job opportunities in no time.</p>
                </p>
                <p className="text-themeLight leading-6 !mb-4">
                <h3>2. Is it free to use Souq Talent for job seekers?</h3>
  <p>Yes, Souq Talent is completely free for job seekers. We believe in providing access to opportunities without any financial barriers.</p>

  <h3>3. How can businesses post job openings on Souq Talent?</h3>
  <p>Employers can post job openings by signing up for a business account. Once registered, you can easily post and manage job listings through your dashboard.</p>

                </p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default FAQ;
