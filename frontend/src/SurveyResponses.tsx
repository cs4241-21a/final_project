import { Bar, ResponsiveBar } from "@nivo/bar";
import React, { useEffect, useState } from "react";

const getSurveyData = async () => {
    let res = await fetch('/getAnswers').then(res => res.json());
    return res;
}

const SurveyResponses = () => {
    const [responseData, setResponseData] = useState<any[]>([]);

    useEffect(() => {
        getSurveyData().then(setResponseData);
    }, [])

    if (responseData.length === 0) {
        return (<div></div>);
    }
    const prevelanceData = responseData.find(d => d?.survey === 'prevelance');
    const phq9Data = responseData.find(d => d?.survey === 'phq9');
    const factorsData = responseData.find(d => d?.survey === 'factors');
    const treatmentData = responseData.find(d => d?.survey === 'treatment');
    const preventionData = responseData.find(d => d?.survey === 'prevention');
    console.log(responseData);

    let countryResponses = prevelanceData.questions.country;
    let mostCommonCountries = Object.keys(countryResponses).sort((a, b) => countryResponses[b] - countryResponses[a]);
    let mostCommonCountriesData = mostCommonCountries.map(country => {
        return { id: country, value: countryResponses[country] };
    });

    let stateResponses = prevelanceData.questions.state;
    let mostCommonStates = Object.keys(stateResponses).sort((a, b) => stateResponses[b] - stateResponses[a]);
    let mostCommonStatesData = mostCommonStates.map((state: any) => {
        return { id: state, value: stateResponses[state] };
    });

    let phq9Responses = phq9Data.questions;
    let zeros: any = { id: '0' };
    let ones: any = { id: '1' };
    let twos: any = { id: '2' };
    let threes: any = { id: '3' };
    Object.keys(phq9Responses).forEach((question, index) => {
        zeros[`question ${index + 1}`] = phq9Responses[question][0] ?? 0;
        ones[`question ${index + 1}`] = phq9Responses[question][1] ?? 0;
        twos[`question ${index + 1}`] = phq9Responses[question][2] ?? 0;
        threes[`question ${index + 1}`] = phq9Responses[question][3] ?? 0;
    })
    let phq9ResponseData = [zeros, ones, twos, threes];
    console.log(phq9ResponseData);


    return (
        <div className="section">
            <h2>Data from Survey Responses</h2>
            <h3>The most common countries were...</h3>
            <Bar
                width={800}
                height={400}
                data={mostCommonCountriesData}
                margin={{ top: 50, right: 10, bottom: 80, left: 60 }}
                keys={['value']}
                indexBy="id"
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -50,
                    // format: '.1%'
                }}
                // labelSkipWidth={12}
                // labelSkipHeight={12}
                enableLabel={false}
                // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                isInteractive={true}
            />
            <h3>The most common states were...</h3>
            <Bar
                width={800}
                height={400}
                data={mostCommonStatesData}
                margin={{ top: 50, right: 10, bottom: 80, left: 60 }}
                keys={['value']}
                indexBy="id"
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'Disorder',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -50,
                    // format: '.1%'
                }}
                // labelSkipWidth={12}
                // labelSkipHeight={12}
                enableLabel={false}
                // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                isInteractive={true}
            />
            <h3>PHQ-9 Responses looked like</h3>
            <Bar
                width={800}
                height={400}
                data={phq9ResponseData}
                margin={{ top: 50, right: 10, bottom: 80, left: 60 }}
                keys={['question 1', 'question 2', 'question 3', 'question 4', 'question 5', 'question 6', 'question 7', 'question 8', 'question 9']}
                indexBy="id"
                colors={{ scheme: 'nivo' }}
                groupMode="grouped"
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'Disorder',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendPosition: 'middle',
                    legendOffset: -50,
                    // format: '.1%'
                }}
                // labelSkipWidth={12}
                // labelSkipHeight={12}
                enableLabel={false}
                // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                isInteractive={true}
            />
        </div>
    )
}

export default SurveyResponses;