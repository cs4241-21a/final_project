import { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

/*
This is a custom react hook to keep track of the currently logged in user

For instance, in a component, you could have:

const ExampleComponent = () => {
    const user = useUser();

    if(user) return <div>Logged in as {user.username}</div>

    return <div>Not logged in</div>
}
*/
const fetcher = (url) =>
  axios.get(url).then((res) => {
    //console.log("Data returned from fetcher:");
    //console.log(res.data);
    return res.data;
  });
//const fetcher = (url) => fetch(url).then((r) => r.json());

const useUser = () => {
  const { data, mutate, error } = useSWR("/me", fetcher);

  const loading = !data && !error;
  const loggedOut = !data && error;

  //console.log({ data, error, loggedOut, loading });

  return { user: data, loggedOut, loading, error, mutate };

  /*
  From before SWR
  useEffect(async () => {
    const res = await fetch("/me");
    console.log("Just pinged /me");
    if (res.status === 401) {
      console.log("Not logged in, setting user to null");
      setUser(null);
    } else {
      const userObj = await res.json();
      console.log(userObj);
      setUser(userObj);
    }
  }, []);

  return [user, setUser];
  */
};

export default useUser;
