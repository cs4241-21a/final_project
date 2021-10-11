import React from "react";
import SuicideByStateChloropleth from "visualizations/SuicideByState";
import USMentalIllness from "visualizations/USMentalIllness";
import WorldwideMentalIllness from "visualizations/WorldwideMentalIllness";
import WorldwideSuicide from "visualizations/WorldwideSuicide";

const PrevelanceVizzes = (props: any) => {
    return (
        <div className="section">
            <h2>Rates of Mental Illnesses Worldwide</h2>
            <div style={{ "width": "1000px" }}>
                <WorldwideMentalIllness />
            </div>
            <h2>Rates of Suicide Worldwide (age-standardized, per 100,000 population)</h2>
            <div style={{ "width": "100%" }}>
                <WorldwideSuicide />
            </div>

            <h2>Rates of Mental Illness in the United States </h2>
            <div style={{ "height": "600px", "width": "1000px" }}>
                <USMentalIllness />
            </div>
            <div>Data from <a href="https://www.samhsa.gov/data/report/2016-2018-nsduh-substate-region-estimates-tables">SAMHSA</a></div>

            <h2>Rates of Suicide in the United States</h2>
            <div style={{ "height": "600px", "width": "1000px" }}>
                <SuicideByStateChloropleth />
            </div>
            <div>Data from the <a href="https://www.cdc.gov/nchs/pressroom/sosmap/suicide-mortality/suicide.htm">CDC</a></div>

        </div>
    )
}

export default PrevelanceVizzes;