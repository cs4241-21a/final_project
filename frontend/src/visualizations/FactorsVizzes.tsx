import React from "react";
import ExerciseDepression from "visualizations/ExerciseDepression";
import GenderFactor from "visualizations/GenderFactor";
import SuicideByStateChloropleth from "visualizations/SuicideByState";
import USMentalIllness from "visualizations/USMentalIllness";
import WorldwideMentalIllness from "visualizations/WorldwideMentalIllness";
import WorldwideSuicide from "visualizations/WorldwideSuicide";

const FactorsVizzes = (props: any) => {
    return (
        <>
            <h2>Factors Affecting Mental Health</h2>
            <p>
                There are many factors that affect mental health and suicide. These can range from genetic to geographical.
                Here we will talk about and show data for just a few factors. Some of these are behaviors which can be changed, and some are intrinsic to a person.
                It is important to note that none of this data is from studies that are capable of demostrating a causative relationship.
            </p>
            <h4>Correlation Between Exercise Fequency and Self Reported Depression</h4>
            <div style={{ "display": "flex", "justifyContent": "center" }} >
                <ExerciseDepression />
            </div>
            <h2>Gender Identity and Mental Health</h2>
            <h4>Percentage of People with Clinically Significant Deperessoin and Anxiety By Gender Identity</h4>
            <p>
                People who are part of the "Gender Minority" are those who are transgender and/or gender nonconforming. People who are part of the "Nongender Minority" are those who are cisgender.
            </p>
            <div style={{ "display": "flex", "justifyContent": "center" }} >
                <GenderFactor />
            </div>


        </>
    )
}

export default FactorsVizzes;