import React from "react";

const Card_Row = (props) => {
    return <tr>
        <td id={props.exercise_name+'reps'+props.key}>{props.set.reps}</td>
        <td id={props.exercise_name+'weight'+props.key}> {props.set.weight}</td>
        <td id={props.exercise_name+'RPE'+props.key}>{props.set.rpe}</td>
    </tr>
};

export default Card_Row;
