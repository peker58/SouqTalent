import RecentActivities from '@/src/components/dashboard/dashboard/recent-activities';
import ResumeBookmarks from '@/src/components/dashboard/dashboard/recent-bookmarks';
import UserInfoBox from '@/src/components/dashboard/dashboard/user-info-box';
import Layout from '@/src/components/dashboard/layout';
import useUser, { UserNotLogin } from '@/src/components/lib/user';
import Head from 'next/head';

const Dashboard = () => {
    const { user, loggedIn, loggedOut } = useUser();

    const userData = user?.data;

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Dashboard- Bookmark jobs, company and resume"
                />
            </Head>

            <Layout>
                <main>
                    {loggedOut && <UserNotLogin />}
                    {userData && loggedIn && (
                        <section className="mb-6">
                            <div className="mx-auto">
                                <UserInfoBox />
                                <div className="grid lg:grid-cols-2 grid-cols-1 sm:grid-cols-1 gap-10">
                                    <div>
                                        <RecentActivities />
                                    </div>
                                    <div>
                                        <ResumeBookmarks />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </Layout>
        </>
    );
};

export default Dashboard;
