import React, { useState } from "react";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => images[item.replace('./', '')] = r(item));
    return images;
}

const blue_images = importAll(require.context('../img/blue_champs', false, /\.(png|jpe?g|svg)$/));
const red_images = importAll(require.context('../img/red_champs', false, /\.(png|jpe?g|svg)$/));

const SinglePage = () => {
    const [state, setState] = useState({
        formData: { blueSums: '', redSums: '', blueChamps: '', redChamps: '', blueDraft: '', redDraft: '' }
    });

    const [btnDisable, setBtnDisable] = useState(false);

    const onInputChange = (name, value) => {
        setState({
            ...state,
            formData: {
                ...state.formData,
                [name]: value
            }
        });
    };

    const checkFive = (input) => {

        let split = input.split(",");
        if (split.length !== 5) {
            return false;
        }

        //remove all spaces
        split.map(e => e.trim());

        return split;
    }


    const formatChamps = (input, images) => {
        let element = '<div></div>';

        input.forEach(e => {
            let name = e + '.png';
            name = name.replace(/ /g, "_");
            name = name.replace('\'', "");
            console.log(name.toLocaleLowerCase(), images[name.toLocaleLowerCase()]);
            try {
                element += '<li style=\'list-style-type: none;\'><img src=' + images[name.toLocaleLowerCase()].default +
                    ' class="champ-icon"/><a href="https://www.leagueoflegends.com/en-us/champions/' + e.toLocaleLowerCase() + '">' + e + '</a></li>';
            } catch (err) {
                element += '<li style=\'list-style-type: none;\'><a href="https://www.leagueoflegends.com/en-us/champions/' + e.toLocaleLowerCase() + '">' + e + '</a></li>';

            }

        });

        return element
    }

    const onSubmit = (e) => {
        // TODO: Change when deploying
        console.log(btnDisable);
        if (checkFive(state.formData.blueSums) && checkFive(state.formData.redSums) && !btnDisable) {

            // Separate summoner names and remove whitespace at the beginning and end
            const team1Sums = state.formData.blueSums.split(',').map(e => e.trim());
            const team2Sums = state.formData.redSums.split(',').map(e => e.trim());
            console.log(team1Sums, team2Sums);

            fetch(`/tournament/single?blue=` + team1Sums + `&red=` + team2Sums, {
                method: 'GET',
                credentials: 'include'
            }).then(async function (response) {

                const data = await response.json();

                // Set any errors with user input
                if (data.error) {
                    console.log("error")
                    alert(data.error);
                    return;
                }

                document.getElementById('redChamps').innerHTML = formatChamps(data.team2Champs, red_images);
                document.getElementById('blueChamps').innerHTML = formatChamps(data.team1Champs, blue_images);
                document.getElementById('redLabel').innerHTML = 'Red Side Champions';
                document.getElementById('redLabel').className = 'h3';
                document.getElementById('blueLabel').innerHTML = 'Blue Side Champions';
                document.getElementById('blueLabel').className = 'h3';

                setBtnDisable(false);
            }).catch((err) => {
                console.log(err)
                alert('Generation failed');
                setBtnDisable(false);
            });
        }
    };

    return (
        <div className="container">
            <h1 className='display-1'>Champion Pool Generator</h1>
            <p className='lead'>Enter the usernames separated by comma in each text box
            </p>

            <h1>ARAM Generator</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                setBtnDisable(true, onSubmit(e));
            }}>
                <div className="custom-container">
                    <div className="row mb-3">
                        <div className="col-sm">
                            <div className='float-start'>
                                <div className='blue-container'>
                                    <h2 className='blue-label' htmlFor="blueSums">Blue Side</h2>
                                    <div className="form-floating mb-3">
                                        <textarea className='form-control' id='blueInput' value={state.formData.blueSums} name="blueSums" onChange={
                                            (e) => {
                                                onInputChange('blueSums', e.target.value);
                                            }
                                        } required />
                                        <label for='blueInput'>Blue Side Usernames</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className='float-end'>
                                <div className='red-container'>
                                    <h2 className='red-label' htmlFor="redSums">Red Side</h2>
                                    <div className="form-floating mb-3">
                                    <textarea className='form-control' id='blueInput' value={state.formData.redSums} name="redSums" onChange={
                                        (e) => {
                                            onInputChange('redSums', e.target.value);
                                        }
                                    } required />
                                    <label for='redInput'>Red Side Usernames</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='league-button-border'>
                            <button className="main" type="submit" onSubmit={(e) => {
                                e.preventDefault();
                                setBtnDisable(true, onSubmit(e));
                            }} disabled={state.btnDisable}>Generate</button>
                        </div>
                    </div>
                </div>
            </form>


            <div className="row">
                <div className="col-sm">
                    <label id="blueLabel" />
                    <ul className="border-end border-dark border-5 rounded-end" id="blueChamps">

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

export default SinglePage;