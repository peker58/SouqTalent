import useUser from '../../lib/user';
import EmailAlert from '../EmailAlert';
import Header from './header';
import SideNav from './side-nav';

const MainHeader = ({ children }: { children: any }) => {
    const { user, isConfirmed } = useUser();
    const userData = user?.data;
    return (
        <>
            <div data-container="1">
                <SideNav data={userData} />
                <Header />
                <div className="lg:ml-24 xl:ml-64 mt-20" data-bucket="1">
                    <div className="py-10 px-4 md:!px-10 relative">
                        {!isConfirmed && user?.data && <EmailAlert />}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainHeader;
