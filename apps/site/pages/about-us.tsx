import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../src/components/frontend/layout";
import PageTitle from "../src/components/frontend/page-title";
import capitalize from "../src/components/lib/capitalize";

const AboutUs = () => {
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 !px-5">
              <div className="shadow rounded bg-white !p-8 relative">
                <p className="text-themeLight leading-6 !mb-4">
                Welcome to <strong>Souq Talent</strong>, your premier destination for unlocking career opportunities in the dynamic job market of the United Arab Emirates. At Souq Talent, we are dedicated to connecting talented individuals with exciting job prospects, fostering partnerships that drive professional growth and organizational success.
                </p>
                <p className="text-themeLight leading-6 !mb-4">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using Content
                  here, content here, making it look like readable English. Many
                  desktop publishing packages and web page editors now use Lorem
                  Ipsum as their default model text, and a search for lorem
                  ipsum will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>
              <div className="shadow rounded bg-white !p-8 relative">
                <p className="text-themeLight leading-6 !mb-4">
                Welcome to Souq Talent – where career opportunities come to life, fast and free! We're your ultimate destination for unlocking the door to exciting jobs in the bustling job market of the United Arab Emirates. Souq Talent is all about connecting talent with opportunity, 
                with a commitment to making the process quick, easy, and absolutely free.
                </p>
                <p className="text-themeLight leading-6 !mb-4">
                  <h1>What Sets Us Apart</h1>
                  <strong>Speedy Solutions </strong>
                  Souq Talent is designed for those who want results fast. 
                  Our streamlined processes ensure that you can discover, apply, 
                  and secure opportunities in record time.
                  <strong>Cost-Free Connections </strong> 
                  At Souq Talent, we believe in providing access to opportunities without any financial barriers. It's free for job seekers and cost-effective for businesses.
                </p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default AboutUs;
