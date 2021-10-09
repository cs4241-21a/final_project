import React from "react";

import "./css/card_row.css";

const Card_Row = (props) => {
    return <tr>
        <td id={props.exercise_name+'weight'+props.setNumber}> {props.set.weight}</td>
        <td id={props.exercise_name+'reps'+props.setNumber}>{props.set.reps}</td>
        <td id={props.exercise_name+'RPE'+props.setNumber}>{props.set.rpe}</td>
    </tr>
};

export default Card_Row;
