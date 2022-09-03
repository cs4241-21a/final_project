import * as React from "react";
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import GetUsernameComponent from './GetUsernameComponent'

const theme = createTheme({
    palette: {
        primary: {
            main: "#DC143C",
        },
    },
});

const RedTypography = withStyles({
    root: {
        color: "#DC143C",
    },
})(Typography);

async function changePasswordRequest(credentials) {
    return fetch("/changePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        //alert("Changed password!");
    });
}

function getUsername() {
    console.log("Within getUsername!");
    fetch("/username", {
        method: "GET",
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.username + " is our username!");
        if (data.failed === "false" && data.username) {
            return data.username;
        } else {
            return "N/A";
        }
    });
}


class MyAccountPage extends React.Component {

   
    constructor(props) {
        super(props);
        this.passwordInput = React.createRef('');
    }

    changePassword = (event) => {
        event.preventDefault();
        console.log("Changing password in changePassword!")
        const data = new FormData(event.currentTarget);
        const password = data.get('newPassword');
        if (password.trim() === "") {
            this.setState({
                success: false,
                emptyPassword: true
            })
        } else {
            const credentials = {
                newPassword: password
            }
            changePasswordRequest(credentials);
            this.passwordInput.current.value = null;
            this.setState({
                success: true,
                emptyPassword: false
            })
        }
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main">
                    <Grid container spacing={0}
                        sx={{ my: 2 }}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <GetUsernameComponent>
                        </GetUsernameComponent>
                    </Grid>

                    <Grid container spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "row", boxShadow: 3 }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box component="form" noValidate onSubmit={this.changePassword} sx={{ mx: 12, my: 4 }}>
                                    <Typography variant="h5" mb={2} textAlign="center">
                                        Change Password
                                    </Typography>
                                    <Grid container spacing={2} direction="column"
                                        >
                                        <Grid item>
                                            <TextField
                                                name="newPassword"
                                                required
                                                type="password"
                                                fullWidth
                                                id="newPassword"
                                                label="Enter your new password"
                                                autoFocus
                                                inputRef={this.passwordInput}
                                            />
                                        </Grid>
                                    </Grid>
                                    {this.state && this.state.success && (
                                        <Grid container spacing={0} sx={{ mt: 2 }} direction="column"
                                            alignItems="center"
                                            justifyContent="center">
                                            <RedTypography variant="h8">
                                                Password changed!
                                            </RedTypography>
                                        </Grid>
                                    )
                                    }
                                    {this.state && this.state.emptyPassword && (
                                        <Grid container spacing={0} sx={{ mt: 2 }} direction="column"
                                            alignItems="center"
                                            justifyContent="center">
                                            <RedTypography variant="h8">
                                                Password cannot be blank!
                                            </RedTypography>
                                        </Grid>
                                    )
                                    }
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid container spacing={0}
                        sx={{ my: 2 }}
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <Button component={Link} to="/">Return To Main Page</Button>
                    </Grid>
                </Container>
            </ThemeProvider >
        );
    }
}

export default MyAccountPage;