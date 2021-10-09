import React from "react";
import Card_Row from "./Card_Row";

import "./css/movement_card_view.css";


const Movement_Card_View = (props) => {
    return <div id='movement_card'>
        <p>{props.movement.exercise_name}</p>
        <table>
            <tr>
                <th>Reps</th>
                <th>Weight</th>
                <th>RPE</th>
            </tr>
            {props.movement.sets.map((row, i) => <Card_Row key={i} set={row}></Card_Row>)}
        </table>
    </div>

};

export default Movement_Card_View;
