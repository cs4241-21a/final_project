import { ifStatement } from "@babel/types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const blue_images = importAll(require.context('../img/blue_champs', false, /\.(png|jpe?g|svg)$/));
const red_images = importAll(require.context('../img/red_champs', false, /\.(png|jpe?g|svg)$/));

const LandingPage = () => {
    const history = useHistory();

    const [state, setState] = useState({
        formData: { blueSums: '', redSums: '', blueChamps: '', redChamps: '', blueDraft: '', redDraft: '' },
        error: { blue: null, red: null }
    });

    const onInputChange = (name, value) => {
        setState({
            ...state,
            formData: {
                ...state.formData,
                [name]: value
            }
        });
    };

    //creates 
    const generateDraft = (champList, poolSize) => {
        let shuffled = champList.sort(function () { return .5 - Math.random() });
        return shuffled.slice(0, poolSize);
    }

    const checkFive = (input) => {

        let split = input.split(",");
        if (split.length != 5) {
            return false;
        }
        //remove all spaces
        split.forEach((e, i, a) => { a[i] = e.split(' ').join('') });
        return split;
    }
    const formatChamps = (input, images) => {
        let element = '<div></div>';
        input.forEach(e => {
            let name = e + '.png'
            element += '<li><img src=' + images[name].default + ' class="champ-icon"/><a href="https://www.leagueoflegends.com/en-us/champions/' + e + '">' + e + '</a></li>'
        })
        return element
    }

    const onSubmit = () => {
        // TODO: Change when deploying

        if (checkFive(state.formData.blueSums) && checkFive(state.formData.redSums)) {
            fetch(`http://localhost:3001/getnames?blue=` + checkFive(state.formData.blueSums) + `&red=` + checkFive(state.formData.redSums), {
                method: 'GET'
                ,
                credentials: 'include'
            })
                .then(async function (response) {

                    const data = await response.json();
                    // Set any errors with user input
                    if (data.error) {
                        console.log("error")
                        setState({
                            ...state,
                            error: {
                                ...state.error,
                                ...data.error
                            }
                        });
                        return;
                    }

                    // check if successful
                    if (data.status) {

                        state.formData.redChamps = data.redChamps;
                        state.formData.blueChamps = data.blueChamps;
                        state.formData.redDraft = generateDraft(state.formData.redChamps.split(','), 5);
                        state.formData.blueDraft = generateDraft(state.formData.blueChamps.split(','), 5);
                        document.getElementById('redChamps').innerHTML = formatChamps(state.formData.redDraft, red_images);
                        document.getElementById('blueChamps').innerHTML = formatChamps(state.formData.blueDraft, blue_images);
                        document.getElementById('redLabel').innerHTML = 'Red Side Champions';
                        document.getElementById('blueLabel').innerHTML = 'Blue Side Champions';
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert('Generation failed');
                });
        }
        else {

        }


    };

    return (
        <div className="container">
            <div></div>
            <h1 className='display-1'>Champion Pool Generator</h1>
            <p className='lead'>Enter the usernames separated by comma in each text box
            </p>

            <h1>ARAM Generator</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <div className="custom-container">
                    <div className="row">
                        <div className="col-sm">
                            <h2 htmlFor="blueSums">Blue Side</h2>
                            <div><textarea value={state.formData.blueSums} name="blueSums" onChange={
                                (e) => {
                                    onInputChange('blueSums', e.target.value);
                                }
                            } required /></div>
                            <div><label>Blue Side Usernames</label></div>
                        </div>
                        <div className="col-sm">
                            <h2 htmlFor="redSums">Red Side</h2>
                            <div><textarea value={state.formData.redSums} name="redSums" onChange={
                                (e) => {
                                    onInputChange('redSums', e.target.value);
                                }
                            } required /></div>
                            <div><label>Red Side Usernames</label></div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}>Generate</button>
                </div>
            </form>


            <div className="row">
                <div className="col-sm">
                    <label id="blueLabel" />
                    <ul id="blueChamps">

                    </ul>
                </div>
                <div className="col-sm">
                    <label id="redLabel" />
                    <ul id="redChamps">

                    </ul>

                </div>
            </div>
        </div>
    );
}

export default LandingPage;