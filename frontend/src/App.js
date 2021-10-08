import "./App.css";
import * as React from "react";

import Layout from "./components/layout/Layout";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import BuildingList from "./components/BuildingInformation/BuildingList";

import { Route, Switch } from "react-router-dom";
import WelcomeMessage from "./components/WelcomeMessage";
import LoginPage from "./modals/LoginPage";
import RegisterPage from "./modals/RegisterPage";

import useToken from "./store/loginStore";
import ContactsContext from "./store/favoriteContext";

import { ContactsContextProvider } from "./store/favoriteContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DC143C",
    },
  },
});

function App() {
  const { token, setToken } = useToken();

  const [laundryData, setData] = React.useState([]);

  const [timestampData, setTimestampData] = React.useState([]);

  React.useEffect(() => {
    fetch("/laundry", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.splice(data.length - 1);
        setData(data);
        console.log(data);
      });
  }, []);

  React.useEffect(() => {
    fetch("/timestamp", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimestampData(data);
        console.log(data);
      });
  }, []);

  async function logoutUser() {
    console.log("Within logout...");
    return fetch("/logout", {
      method: "GET",
    }).then((data) => {
      console.log("Logged out successfully!");

      setToken(null);
    });
  }

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);

  const [showFavorites, setShowFavorites] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleClickOpenLogout = () => {
    logoutUser();
    console.log("Logging out user!");
    setToken(null);
  };
  const handleClickRegister = () => {
    setOpenRegister(true);
  };
  const handleClose = () => {
    setOpenLogin(false);
    setOpenRegister(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout
        handleRegister={handleClickRegister}
        handleLogin={handleClickOpenLogin}
        handleLogout={handleClickOpenLogout}
        loggedIn={token}
      >
        {openLogin && (
          <LoginPage
            loginOpen={openLogin}
            setToken={setToken}
            handleClose={handleClose}
          />
        )}
        {openRegister && (
          <RegisterPage
            registerOpen={openRegister}
            setToken={setToken}
            handleClose={handleClose}
          />
        )}
        <WelcomeMessage
          setFavorites={setShowFavorites}
          timestamp={timestampData}
          loggedIn={token}
        />
        <Switch>
          <Route path="/" exact={true}>
            {token && (
              <ContactsContextProvider>
                <BuildingList
                  data={laundryData}
                  showFavorites={showFavorites}
                />
              </ContactsContextProvider>
            )}
            {!token && (
              <div>
                <BuildingList
                  data={laundryData}
                  showFavorites={showFavorites}
                />
              </div>
            )}
          </Route>

          <Route path="/favorites"></Route>
        </Switch>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
