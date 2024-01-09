import { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import useSWR from 'swr';
import useUser from '../components/lib/user';
import { Axios, authAxios } from '../components/utils/axiosKits';
import { localRemove } from '../components/utils/localStore';

type ThemeContextType = {
    apiEndPoint: string;
    body: any;
    windowWidth: any;
    windowHeight: any;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: any;
    isSideNavOpen: boolean;
    setIsSideNavOpen: any;
    LoginPopup: boolean;
    LoginPopupHandler: any;
    setLoginPopup: any;
    RegisterPopup: boolean;
    RegisterPopupHandler: any;
    setRegisterPopup: any;
    lostPasswordShow: boolean;
    lostPasswordHandler: any;
    categoryData: any;
    categoryError: any;
    categoryMutate: any;
    logOutHandler: any;
    frontendLogOutHandler: any;
    recentNotification: any;
    recentNotificationError: any;
    bookmarkData: any;
    bookmarkError: any;
    bookmarkMutate: any;
    hydrationFix: boolean;
};

const defaultThemeContext: ThemeContextType = {
    apiEndPoint: '',
    body: null,
    windowWidth: undefined,
    windowHeight: undefined,
    isMobileMenuOpen: false,
    setIsMobileMenuOpen: null,
    isSideNavOpen: false,
    setIsSideNavOpen: null,
    LoginPopup: false,
    LoginPopupHandler: null,
    setLoginPopup: null,
    RegisterPopup: false,
    RegisterPopupHandler: null,
    setRegisterPopup: null,
    lostPasswordShow: false,
    lostPasswordHandler: null,
    categoryData: null,
    categoryError: null,
    categoryMutate: null,
    logOutHandler: null,
    frontendLogOutHandler: null,
    recentNotification: null,
    recentNotificationError: null,
    bookmarkData: null,
    bookmarkError: null,
    bookmarkMutate: null,
    hydrationFix: false,
};

export const ThemeContext = createContext(defaultThemeContext);

const fetcher = (url: AxiosRequestConfig<any>) =>
    Axios(url).then((res: any) => res.data.data);
const authFetcher = (url: AxiosRequestConfig<any>) =>
    authAxios(url).then((res: any) => res.data.data);
const JobCategoryAPI = '/jobs/categories/retrives';

const ThemeContextProvider = ({ children }: { children: any }) => {
    const apiEndPoint = `/api/v1`;
    const router = useRouter();
    const [windowWidth, setWindowWidth] = React.useState(
        typeof window === 'object' && window.innerWidth,
    );
    const [windowHeight, setWindowHeight] = React.useState(
        typeof window === 'object' && window.innerHeight,
    );
    const body = typeof window === 'object' && document.querySelector('body');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); // mobile menu open
    const [isSideNavOpen, setIsSideNavOpen] = React.useState(false); // side nav open
    const [LoginPopup, setLoginPopup] = React.useState(false); // Login Popup
    const [RegisterPopup, setRegisterPopup] = React.useState(false); // register popup
    const [lostPasswordShow, setLostPasswordShow] = React.useState(false); // lost password popup
    const [hydrationFix, setHydrationFix] = useState(false);

    // Hydration Fix
    useEffect(() => {
        setHydrationFix(true);
    }, []);

    // user after login fetch data
    const { loggedIn, mutate } = useUser() as any;

    // Frontend data fetching hooks
    const {
        data: categoryData,
        error: categoryError,
        mutate: categoryMutate,
    } = useSWR(JobCategoryAPI, fetcher, {
        revalidateOnFocus: false,
    });

    // user bookmark data fetching hooks
    const {
        data: bookmarkData,
        error: bookmarkError,
        mutate: bookmarkMutate,
    } = useSWR(
        loggedIn &&
            (router.asPath === '/bookmarks' ||
                router.asPath === '/dashboard') &&
            `/bookmarks/retrives`,
        authFetcher,
    );

    // user notification data fetching hooks
    const { data: recentNotification, error: recentNotificationError } = useSWR(
        loggedIn && `/notifications/recent/retrives`,
        authFetcher,
    );

    const { addToast } = useToasts();

    React.useEffect(() => {
        const body = document.querySelector('body') as any;
        let resizeWindow = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
            window.innerWidth >= 768 && window.innerWidth < 1300
                ? body.setAttribute('data-sidebar-style', 'overlay')
                : window.innerWidth <= 768
                ? body.setAttribute('data-sidebar-style', 'overlay')
                : body.setAttribute('data-sidebar-style', 'full');
        };
        body.setAttribute('data-typography', 'poppins');
        body.setAttribute('data-theme-version', 'light');
        body.setAttribute('data-theme-version', 'dark');
        body.setAttribute('data-layout', 'vertical');
        body.setAttribute('data-nav-headerbg', 'color_1');
        body.setAttribute('data-headerbg', 'color_1');
        body.setAttribute('data-sidebar-style', 'overlay');
        body.setAttribute('data-sibebarbg', 'color_1');
        body.setAttribute('data-primary', 'color_1');
        body.setAttribute('data-sidebar-position', 'fixed');
        body.setAttribute('data-header-position', 'fixed');
        body.setAttribute('data-container', 'wide');
        body.setAttribute('direction', 'ltr');
        resizeWindow();
        window.addEventListener('resize', resizeWindow);
        return () => window.removeEventListener('resize', resizeWindow);
    }, []);

    const LoginPopupHandler = () => {
        setLoginPopup(!LoginPopup);
    };

    const RegisterPopupHandler = () => {
        setRegisterPopup(!RegisterPopup);
    };

    const lostPasswordHandler = () => {
        setLostPasswordShow(!lostPasswordShow);
        setLoginPopup(false);
    };

    const logOutHandler = async () => {
        try {
            localRemove('UserData');
            await mutate(null);
            await router.replace('/login');
            addToast('You have successfully logged out', {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error: any) {
            addToast(error.response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };

    const frontendLogOutHandler = async () => {
        try {
            await localRemove('UserData');
            await mutate(null);
            addToast('You have successfully logged out', {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error: any) {
            addToast(error.response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                apiEndPoint,
                body,
                windowWidth,
                windowHeight,
                isMobileMenuOpen,
                setIsMobileMenuOpen,
                isSideNavOpen,
                setIsSideNavOpen,
                LoginPopup,
                LoginPopupHandler,
                setLoginPopup,
                RegisterPopup,
                RegisterPopupHandler,
                setRegisterPopup,
                lostPasswordShow,
                lostPasswordHandler,
                categoryData,
                categoryError,
                categoryMutate,
                logOutHandler,
                frontendLogOutHandler,
                recentNotification: recentNotification?.notification,
                recentNotificationError,
                bookmarkData,
                bookmarkError,
                bookmarkMutate,
                hydrationFix,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
