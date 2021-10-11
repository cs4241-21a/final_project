import React from "react";

const ExampleVis = (props: any) => {
    const data = props.data;
    const keys = Object.keys(data);
    return (
        <>
            {keys.map(key => {
                return <div>{key}: {data[key]}</div>
            })}
        </>
    )
}

export default ExampleVis;