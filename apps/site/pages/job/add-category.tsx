import Head from "next/head";
import React from "react";
import AddCategoryForm from "../../src/components/dashboard/form/add-category-form";
import Layout from "../../src/components/dashboard/layout";
import useUser, {
  UserGoBack,
  UserNotLogin,
} from "../../src/components/lib/user";

const AddCategory = () => {
  const { user, loggedIn, loggedOut, isAdmin } = useUser();
  const userData = user?.data;

  return (
    <>
      <Head>
        <meta name="description" content="Add Job category " />
      </Head>

      <Layout>
        <main>
          {loggedOut && <UserNotLogin />}
          {userData && !isAdmin && <UserGoBack />}
          {userData && loggedIn && <AddCategoryForm />}
        </main>
      </Layout>
    </>
  );
};

export default AddCategory;
