import states from 'data/geo/states';
import React from 'react';
import WORLDWIDE_SUICIDE, { keys as worldwide_keys } from '../data/prevelance/worldwide_suicide';


const Prevelance = (props: any) => {
    const countryNames = WORLDWIDE_SUICIDE.filter(d => d.Sex === "Both sexes").map(e => e.Country);
    const stateNames = states.map(e => e[0]);
    const setData = props.dataCallback;
    const data = props.data;
    const onValueSelected = (event: any) => {
        const { name, value } = event.target;
        const newData = { ...data };
        newData[name] = value;
        setData(newData);
    }
    return (
        <>

            <h2>Prevalence of Suicide</h2>
            <form>
                <p>What country are you from?</p>
                <select id="country" name="country" onChange={onValueSelected}>
                    <option value=""></option>
                    {countryNames.map(name =>
                        <option value={name}>{name}</option>
                    )}

                </select>
                <div hidden={!(data.country === "United States of America")}>
                    <p>What State are you from?</p>
                    <select id="state" name="state" onChange={onValueSelected}>
                        <option value=""></option>
                        {stateNames.map(name =>
                            <option value={name}>{name}</option>
                        )}

                    </select>
                </div>
            </form>
        </>
    );
}

export default Prevelance;