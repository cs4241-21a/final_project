import React from "react";

import "./css/card_row.css";

const Card_Row = (props) => {
    return <tr>
        <td>{props.set.reps}</td>
        <td>{props.set.weight}</td>
        <td>{props.set.rpe}</td>
    </tr>

};

export default Card_Row;
