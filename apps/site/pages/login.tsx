import Head from 'next/head';
import Layout from '../src/components/frontend/layout';
import { Loader } from '../src/components/lib/loader';
import useUser, { UserLogin } from '../src/components/lib/user';
import LoginForm from '../src/components/register/login-form';

const Login = () => {
    const { loggedOut, loggedIn } = useUser();

    if (loggedOut) {
        return (
            <>
                <Head>
                    <meta
                        name="description"
                        content="Login to your dashboard"
                    />
                </Head>

                <Layout>
                    <main>
                        <section className="py-24 md:py-32 bg-light">
                            <LoginForm />
                        </section>
                    </main>
                </Layout>
            </>
        );
    }

    if (loggedIn) return <UserLogin />;
    return <Loader />;
};

export default Login;
