import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { localGet, localRemove } from "../utils/localStore";
import fetcher from "./api-user";
import { Loader } from "./loader";

export default function useUser() {
  const { data, mutate, error } = useSWR("/users/retrives", fetcher);
  const loading = !data && !error;
  const loggedIn = localGet("UserData") !== null;
  const loggedOut = localGet("UserData") === null ? true : false;
  const localData = localGet("UserData");

  // auto logout if token is expired or not found in localStorage
  if (error && error?.response?.status === 401) {
    localRemove("UserData");
  }

  React.useEffect(() => {
    if (localData) {
      // auto logout if time is expired
      const time = new Date(localData.expires_in).getTime();
      const now = new Date().getTime();
      if (now > time) {
        localRemove("UserData");
      }
    }
  }, [localData, mutate]);

  const isAdmin = data?.data?.role.isAdmin;
  const isConfirmed = data?.data?.isConfirmed;
  const isEmployer = data?.data?.role.isEmployer;
  const isCandidate = data?.data?.role.isCandidate;

  return {
    loading,
    loggedIn,
    loggedOut,
    user: data,
    mutate,
    isConfirmed,
    isAdmin,
    isEmployer,
    isCandidate,
  };
}

export const UserNotLogin = () => {
  const { loggedOut } = useUser();
  const router = useRouter();
  React.useEffect(() => {
    if (loggedOut) {
      router.replace("/login");
    }
  }, [loggedOut, router]);
  return <Loader />;
};

export const UserGoBack = () => {
  const { loggedIn } = useUser();
  const router = useRouter();
  React.useEffect(() => {
    if (loggedIn) {
      router.back();
    }
  }, [loggedIn, router]);
  return <Loader />;
};

export const UserLogin = () => {
  const { loggedIn } = useUser();
  const router = useRouter();
  React.useEffect(() => {
    if (loggedIn) {
      router.replace("/dashboard");
    }
  }, [loggedIn, router]);
  return <Loader />;
};
