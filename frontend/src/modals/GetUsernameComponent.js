import * as React from "react";
import { useState, useEffect } from "react";

import Typography from '@mui/material/Typography';

async function getUsername() {
    console.log("Within getUsername!");
    return fetch("/username", {
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

function GetUsernameComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        try {
            setLoading(true);
            const data = await getUsername();
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, []);

    let updateUsername = props.updateUsername;

    if (loading) {
        return (
            <Typography variant="h4">
                Loading username...
            </Typography>);
    }

    if (!data) {
        return (
            <Typography variant="h4">
                Welcome user!
            </Typography>
        );
    }

    return (
        <Typography variant="h4">
            Welcome, {data}!
        </Typography>
    );


}

export default GetUsernameComponent;