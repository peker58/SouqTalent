// Tailwind CSS
import "../styles/tailwind.css";
// React slick slider CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// React Skeleton CSS
import "react-loading-skeleton/dist/skeleton.css";
import ThemeContext from "../src/context/ThemeContext";
import { ToastProvider } from "react-toast-notifications";
import Head from "next/head";
import { useRouter } from "next/router";
import PopupLogin from "../src/components/register/popup-login";
import PopupRegister from "../src/components/register/popup-register";
import LostPassword from "../src/components/register/lost-password";
import theme_config from "../theme_config";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let pageTitle = router.pathname.split("/")[1];
  pageTitle =
    pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).replace(/-/g, " ");

  const { site_name } = theme_config;

  return (
    <ToastProvider>
      <ThemeContext>
        <Head>
          <title>
            {pageTitle !== "" ? pageTitle : "Home"} - {site_name}
          </title>
          <link rel="icon" href="/SouqFavicon.png" />
        </Head>
        <Component {...pageProps} />
        <PopupLogin />
        <PopupRegister />
        <LostPassword />
      </ThemeContext>
    </ToastProvider>
  );
}
