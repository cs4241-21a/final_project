import React from "react";
import BarriersNCSR from "visualizations/BarriersNCSR";
import BarriersNCSRGrouped from "visualizations/BarriersNCSRGrouped";
import FirstYearCollegeBarriers from "visualizations/FirstYearCollegeBarriers";

const TreatmentVis = (props: any) => {
    const data = props.data;
    const keys = Object.keys(data);
    return (
        <>
            {keys.map(key => {
                return <div>{key}: {data[key]}</div>
            })}
            <p>Here are your answers to the previous questions:</p>

            <p>"You are not sure available treatments are very effective.": {data["avail"]}<br />
            "You would want to handle the problem on your own.": {data["handle"]}<br />
            "You would be too embarrassed.": {data["embarrassed"]}<br />
            "You would talk to friends or relatives instead.": {data["friends"]}<br />
            "You think it costs too much money.": {data["money"]}<br />
            "You are unsure of where to go or who to see.": {data["where"]}<br />
            "You anticipate problems with time, transportation, or scheduling.": {data["time"]}<br />
            "You are afraid it might harm your school or professional career": {data["harm"]}</p>

            <p>Below is data collected from a survey of first-year college students asked about the same barriers to treatment:</p>
            <h3>Importance of Barriers to Treatment to First-Year College Students</h3>
            <div style={{ "height": "600px", "width": "100%" }}>
                <FirstYearCollegeBarriers />
            </div>
            <p style={{fontSize: "small", marginTop: 15}}>Questions and data acquired from&nbsp;
            <a href="https://onlinelibrary.wiley.com/doi/10.1002/mpr.1782"><em>Barriers
                of mental health treatment utilization among first-year college students: First
                cross-national results from the WHO World Mental Health International College Student
                Initiative</em></a></p>
            
            <p>Below is data from another survey which shows reported barriers to treatment by severity of common mental disorder:</p>
            
            <h3>NCS-R: Reasons for Not Seeking Treatment</h3>
            <div style={{ "height": "600px", "width": "100%" }}>
                <BarriersNCSR />
            </div>
            <p style={{fontSize: "small", marginTop: 15}}>Data acquired from&nbsp;
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3128692/"><em>Barriers to
                Mental Health Treatment: Results from the National Comorbidity Survey Replication
                (NCS-R)</em></a></p>
        </>
    )
}

export default TreatmentVis;