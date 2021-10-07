import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";

const RegisterPage = () => {
    const history = useHistory();
    const [state, setState] = useState({
        formData: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        error: {
            username: null,
            password: null
        }
    });

    // Redirect to todolist page if user already logged in
    // useEffect(() => {
    //     if (token) {
    //         history.push(`/user/${jwt_decode(token).id}`);
    //     }
    // });

    // Change state when user types in a text box
    const onInputChange = useCallback((name, value) => {
        setState({
            ...state,
            formData: {
                ...state.formData,
                [name]: value
            }
        });
    }, [state, setState]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log('Register form submission');

        // TODO: Change when deploying
        fetch(`http://localhost:3001/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: state.formData.username,
                password: state.formData.password,
                confirmPassword: state.formData.confirmPassword
            })
        })
            .then(async function (response) {
                const data = await response.json();

                if (data.loggedIn) {
                    console.log('Registered');
                    history.push(`/tournament-create/${data.id}`);
                }

                if (data.error) {
                    setState({
                        ...state,
                        error: {
                            ...state.error,
                            ...data.error
                        }
                    });
                    return;
                }
            });
    }, [state, history]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 offset-md-2 col-md-8">
                        <div className="p-5 mb-4 bg-light rounded-3 border">
                            <h2 className="text-center">Register</h2>
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    {/* <!-- Register form --> */}
                                    <form onSubmit={onSubmit}>
                                        <div className="form-group">

                                            <label className="small mb-1 mt-3" htmlFor="username">Username: </label>
                                            <input className="form-control" placeholder="Enter Your Username" name="username" type="text"
                                                onChange={(e) => {
                                                    onInputChange('username', e.target.value);
                                                }}
                                                required
                                                defaultValue={state.formData ? state.formData.username : ''} />
                                            {
                                                state.error && state.error.username &&
                                                <p className="small text-danger">{state.error.username}</p>
                                            }

                                            <label className="small mb-1 mt-3" htmlFor="password">Password: </label>
                                            <input className="form-control"
                                                placeholder="Password" name="password" type="password"
                                                onChange={(e) => {
                                                    onInputChange('password', e.target.value);
                                                }}
                                                required />

                                            <label className="small mb-1 mt-3" htmlFor="password">Confirm Password: </label>
                                            <input className="form-control"
                                                placeholder="Confirm Password" name="confirmPassword" type="password"
                                                onChange={(e) => {
                                                    onInputChange('confirmPassword', e.target.value);
                                                }}
                                                required />
                                            {
                                                state.error && state.error.password &&
                                                <p className="small text-danger">{state.error.password}</p>
                                            }

                                            <button className="mt-3 btn btn-primary" type="submit" onSubmit={onSubmit}>Register</button>

                                            <p className="bg-dark text-light p-2 my-2 rounded rounded-5" >Already have an account?
                                                <a href="/login" className="link-info"> Log in here</a>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;