import { useState, useEffect } from "react";

/*
This is a custom react hook to keep track of the currently logged in user

For instance, in a component, you could have:

const ExampleComponent = () => {
    const user = useUser();

    if(user) return <div>Logged in as {user.username}</div>

    return <div>Not logged in</div>
}
*/
const useUser = () => {
  const [user, setUser] = useState("loading");

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
};

export default useUser;
