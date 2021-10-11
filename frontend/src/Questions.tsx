import React, { useState } from 'react';
import ExampleVis from 'SurveySections/ExampleVis';
import TreatmentVis from 'SurveySections/TreatmentVis';
import Factors from 'SurveySections/Factors';
import FactorsVis from 'SurveySections/FactorsVis';
import Prevelance from 'SurveySections/Prevelance';
import PrevelanceVis from 'SurveySections/PrevelanceVis';
import Prevention from 'SurveySections/Prevention';
import PreventionUserVis from 'SurveySections/PreventionUserVis';
import Treatment from 'SurveySections/Treatment';
import PreventionVizzes from 'visualizations/PreventionVizzes';
import PHQ9 from 'SurveySections/PHQ9';
import PHQ9Vis from 'SurveySections/PHQ9Vis';


const sendToAnswersApi = (data: object) => {
    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()).then(json => console.log(json)
    );
}
const Questions = (props: any) => {
    const [page, setPage] = useState(0);
    const [data, setData] = useState({});

    const pageArray = [
        { page: <Prevelance data={data} dataCallback={setData} />, type: "survey", name: "prevelance" },
        { page: <PrevelanceVis data={data} />, type: "vis" },
        { page: <PHQ9 data={data} dataCallback={setData} />, type: "survey", name: "phq9" },
        { page: <PHQ9Vis data={data} />, type: "vis" },
        { page: <Factors data={data} dataCallback={setData} />, type: "survey", name: "factors" },
        { page: <FactorsVis data={data} />, type: "vis" },
        { page: <Treatment data={data} dataCallback={setData} />, type: "survey", name: "treatment" },
        { page: <TreatmentVis data={data} />, type: "vis" },
        { page: <PreventionVizzes />, type: "vis" },
        { page: <Prevention data={data} dataCallback={setData} />, type: "survey", name: "prevention" },
        { page: <PreventionUserVis data={data} />, type: "vis" }
    ]

    const { nextCallback } = props;
    const next = () => {
        console.log("data is:");

        console.log(data);
        if (pageArray[page].type === 'survey') {
            // if next was clicked on a survey page
            sendToAnswersApi({ survey: pageArray[page].name, ...data });

        }
        if (page === pageArray.length - 1) {
            nextCallback();
        }

        if (pageArray[page + 1]?.type === 'survey') {
            setData({});
        }

        setPage(page + 1);
    }
    const back = () => {
        setPage(Math.max(0, page - 1));
    }

    const getPage = (pageNum: number) => {
        return pageArray[pageNum].page;
    }

    return (
        <div className="section">
            <h1>Survey</h1>
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

export default Questions;