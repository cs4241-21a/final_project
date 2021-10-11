import React from "react";
import SuicideByStateChloropleth from "visualizations/SuicideByState";
import USMentalIllness from "visualizations/USMentalIllness";
import WorldwideMentalIllness from "visualizations/WorldwideMentalIllness";
import WorldwideSuicide from "visualizations/WorldwideSuicide";

const PrevelanceVis = (props: any) => {
    const data = props.data;

    const country = data.country;

    const state = data.state;
    const shouldShowUSData = state || country === "United States of America";

    const keys = Object.keys(data);
    return (
        <>
            <h2>Prevelance of Mental Illnesses Worldwide</h2>
            <div style={{ "width": "1000px" }}>
                <WorldwideMentalIllness />
            </div>
            <h2>Prevelance of Suicide Worldwide (age-standardized, per 100,000 population)</h2>
            <div style={{ "width": "100%" }}>
                <WorldwideSuicide country={country} />
            </div>


            <div hidden={!shouldShowUSData}>
                <h2>Prevelance of Mental Illness in the United States </h2>
                <div style={{ "height": "600px", "width": "1000px" }}>
                    <USMentalIllness />
                </div>

                <h2>Prevelance of Suicide in the United States</h2>
                <div style={{ "height": "600px", "width": "1000px" }}>
                    <SuicideByStateChloropleth />
                </div>

            </div>

        </>
    )
}

export default PrevelanceVis;