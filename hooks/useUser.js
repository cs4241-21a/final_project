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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const res = await fetch("/me");
    setUser(res.status === 401 ? null : await res.json());
  });

  return user;
};

export default useUser;
