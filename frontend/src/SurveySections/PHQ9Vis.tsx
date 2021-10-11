import React from "react";
import ExerciseDepression from "visualizations/ExerciseDepression";
import GenderFactor from "visualizations/GenderFactor";
import PHQ9Correlation from "visualizations/PHQ9Correlation";
import SuicideByStateChloropleth from "visualizations/SuicideByState";
import USMentalIllness from "visualizations/USMentalIllness";
import WorldwideMentalIllness from "visualizations/WorldwideMentalIllness";
import WorldwideSuicide from "visualizations/WorldwideSuicide";

const PHQ9Vis = (props: any) => {
    const data = props.data;

    const pleasure = parseInt(data['phq9-pleasure'] ?? 0);
    const depressed = parseInt(data['phq9-depressed'] ?? 0);
    const sleep = parseInt(data['phq9-sleep'] ?? 0);
    const tired = parseInt(data['phq9-tired'] ?? 0);
    const appetite = parseInt(data['phq9-appetite'] ?? 0);
    const failure = parseInt(data['phq9-failure'] ?? 0);
    const concentrating = parseInt(data['phq9-concentrating'] ?? 0);
    const slowly = parseInt(data['phq9-slowly'] ?? 0);
    const suicide = parseInt(data['phq9-suicide'] ?? 0);

    const score = pleasure + depressed + sleep + tired + appetite + failure + concentrating + slowly + suicide;
    let severity = "";
    if (score <= 4) {
        severity = "minimal";
    }
    else if (score <= 9) {
        severity = "mild";
    }
    else if (score <= 14) {
        severity = "moderate";
    }
    else if (score <= 19) {
        severity = "moderately severe";
    }
    else {
        severity = "severe";
    }
    return (
        <>
            <h2>Your PHQ-9 Score was {score}</h2>
            <div>This corresponds to a severity of {severity}</div>

            <h4>Correlation with diagnosis by a medical health professional</h4>
            <p>
                While the PHQ-9 is useful as an initial screening test for patients. It is not a diagnostic test.
                This graph shows show what severity range people with major depressive disorder, other depressive disorders, and no depressive disorders got from the PHQ-9 Questionare.
            </p>
            <PHQ9Correlation />


        </>
    )
}

export default PHQ9Vis;