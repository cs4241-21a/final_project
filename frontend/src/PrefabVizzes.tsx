import React, { useState } from 'react';
import PreventionVizzes from 'visualizations/PreventionVizzes';
import PHQ9Correlation from 'visualizations/PHQ9Correlation';
import SuicideByStateChloropleth from 'visualizations/SuicideByState';
import USMentalIllness from 'visualizations/USMentalIllness';
import WorldwideMentalIllness from 'visualizations/WorldwideMentalIllness';
import WorldwideSuicide from 'visualizations/WorldwideSuicide';
import FactorsVizzes from 'visualizations/FactorsVizzes';
import PrevelanceVizzes from 'visualizations/PrevelanceVIzzes';
import NCHAVisualizations from 'visualizations/ncha_visualizations';


const PrefabVizzes = (props: any) => {
    const [page, setPage] = useState(0);

    const pageArray = [
        // todo replace with pages for each section
        // <PHQ9Correlation/>,
        // <SuicideByStateChloropleth/>,
        // <USMentalIllness/>,
        // <WorldwideMentalIllness/>,
        // <WorldwideSuicide/>,

        // todo this one we can keep
        <PrevelanceVizzes />,
        <FactorsVizzes />,
        <PreventionVizzes />,
        <NCHAVisualizations />,
    ]

    const { nextCallback } = props;
    const next = () => {
        if (page === pageArray.length - 1) {
            nextCallback();
        }
        setPage(page + 1);
    }
    const back = () => {
        setPage(Math.max(0, page - 1));
    }

    const getPage = (pageNum: number) => {
        return pageArray[pageNum];
    }

    return (
        <div className="section">
            <h1>Visualizations</h1>
            <div>
                {getPage(page)}

                <button type="button" onClick={back}>
                    Back
                </button>
                <button className="u-pull-right" type="button" onClick={next}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PrefabVizzes;