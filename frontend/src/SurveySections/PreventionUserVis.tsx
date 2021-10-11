import React from "react";
import '../skeleton/skeleton.css';
import '../App.css';
import { ResponsivePie } from '@nivo/pie'
import interest from 'data/prevention/interested';
import talking_public from '../data/prevention/talking_public';
import think_prvntble from "data/prevention/think_prvntble";

// const PreventionVisOg = (props: any) => {
// const data = props.data;
// const keys = Object.keys(data);

// return (
//     // todo if user is willing, say that's great!
//     // todo if user is unwilling, say maybe reconsider

//     // todo comment this out after
//     <>
//         {keys.map(key => {
//             return <div>{key}: {data[key]}</div>
//         })}
//     </>

// )
// }

// const Message = (props: any) => {
//     const data = props.data;
//     console.log('data', data)
//     const keys = Object.keys(data);
//     console.log('keys', keys)

//     return (
//         <>
//             {keys.map(key => {
//                 return <div>{key}: {data[key]}</div>
//             })}
//         </>

//     )


// }



const PreventionUserVis = (props: any) => {
    const data = props.data;
    console.log('data', typeof data)
    const keys = Object.keys(data);
    console.log('keys', typeof keys)

    let negativeCount = 0
    let positiveCount = 0
    let message = ""

    // MESSAGE

    switch (data[keys[0]]) {
        case "Yes": {
            positiveCount++;
            break;
        }
        case "No": {
            negativeCount++;
            break;
        }
    }
    switch (data[keys[1]]) {
        case "Yes": {
            positiveCount++;
            break;
        }
        case "No": {
            negativeCount++;
            break;
        }
    }
    switch (data[keys[2]]) {
        case "Always": {
            positiveCount++;
            break;
        }
        case "Often": {
            positiveCount++;
            break;
        }
        case "Sometimes": {
            positiveCount++;
            break;
        }
        case "Rarely": {
            negativeCount++;
            break;
        }
        case "Never": {
            negativeCount++;
            break;
        }
    }

    switch (data[keys[3]]) {
        case "Yes": {
            positiveCount++;
            break;
        }
        case "No": {
            negativeCount++;
            break;
        }
    }

    if (positiveCount >= negativeCount) {
        message = "That's great that you've expressed interest in advocating for suicide prevention!"
    } else {
        message = "We need your help to lessen the rates of suicide!"
    }

    return (
        <>
            <div>
                <h4>{message}</h4>
                <ThinkPreventablePie />
                <InterestPie />
                <TalkingPublicPie />
                <p>Source:
                    <a href="https://theactionalliance.org/resource/national-public-perception-mental-health-and-suicide-prevention-survey-results">
                        National Action Alliace for Suicide Prevention || National Public Perception of Mental Health and Suicide Prevention Survey Results</a></p>
            </div>
        </>
    )
}

const ThinkPreventablePie = (props: any) => {
    console.log('think preventable', think_prvntble)

    return (
        <div style={{ "height": "500px", "width": "700px" }}>

            <h6>93% of people believe that suicide is preventable</h6>
            <ResponsivePie
                data={think_prvntble}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'row',
            //         justify: false,
            //         translateX: 0,
            //         translateY: 56,
            //         itemsSpacing: 0,
            //         itemWidth: 100,
            //         itemHeight: 18,
            //         itemTextColor: '#999',
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 18,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
            />
        </div>
    )
}

const TalkingPublicPie = (props: any) => {
    // const data = props.data;
    // console.log('data', data)
    // const keys = Object.keys(data);
    // console.log('keys', keys)

    console.log('talking public', talking_public)

    return (
        <div style={{ "height": "500px", "width": "700px" }}>
            <h6>58% of people are comfortable talking openly about mental health in public</h6>

            <ResponsivePie
                data={talking_public}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'row',
            //         justify: false,
            //         translateX: 0,
            //         translateY: 56,
            //         itemsSpacing: 0,
            //         itemWidth: 100,
            //         itemHeight: 18,
            //         itemTextColor: '#999',
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 18,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
            />
        </div>
    )
}

const InterestPie = (props: any) => {
    // const data = props.data;
    // console.log('data', data)
    // const keys = Object.keys(data);
    // console.log('keys', keys)

    console.log('interest', interest)

    return (
        <div style={{ "height": "500px", "width": "700px" }}>
            <h6>78% of people would be interested in learning how to play a role in helping someone who may be suicidal</h6>

            <ResponsivePie
                data={interest}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            // legends={[
            //     {
            //         anchor: 'bottom',
            //         direction: 'row',
            //         justify: false,
            //         translateX: 0,
            //         translateY: 56,
            //         itemsSpacing: 0,
            //         itemWidth: 100,
            //         itemHeight: 18,
            //         itemTextColor: '#999',
            //         itemDirection: 'left-to-right',
            //         itemOpacity: 1,
            //         symbolSize: 18,
            //         symbolShape: 'circle',
            //         effects: [
            //             {
            //                 on: 'hover',
            //                 style: {
            //                     itemTextColor: '#000'
            //                 }
            //             }
            //         ]
            //     }
            // ]}
            />
        </div>
    )
}

export default PreventionUserVis;

/*
         */