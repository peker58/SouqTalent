import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../src/components/frontend/layout";
import PageTitle from "../src/components/frontend/page-title";
import capitalize from "../src/components/lib/capitalize";

const PrivacyPolicy = () => {
  const router = useRouter();
  let path = router.pathname;
  path = path.replace("/", "");
  path = capitalize(path);
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
                Thank you for using SouqTalent! This Privacy Policy outlines how we collect, use, and protect the information you provide when using our website.
                </p>
                <p className="text-themeLight leading-6 !mb-4">
                Personal Information:

When you register on our website, we may collect personal information such as your name, email address, contact number, and other relevant details.
Resume and Profile Information:

To enhance your job search experience, you may choose to upload a resume and create a profile on our website. This information will be used to match you with relevant job opportunities.
Job Applications:

When you apply for jobs through our platform, we collect the information you submit, including your resume, cover letter, and any additional documents you choose to provide.
Usage Information:

We may collect information about how you interact with our website, including the pages you visit, the jobs you view, and your browsing patterns.
                </p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default PrivacyPolicy;
