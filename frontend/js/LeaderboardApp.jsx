import React, { useState, useEffect } from "react";

const Entry = function (props) {
    return (
        <tr>
            <td>{props.username}</td>
            <td>{props.gamesplayed}</td>
            <td>{props.highscore}</td>
        </tr>
    )
}

const LeaderboardApp = (props) => {

    const [entries, setEntryState] = useState([])

    useEffect(() => {
        fetch('/api/leaderboard')
            .then(response => response.json())
            .then(jsonArray => setEntryState(jsonArray.filter(entry => entry.githubId != null)))
    }, [])

    return (
        <div className="LeaderboardApp">
            <h1>Leaderboard</h1>
            <svg id='blue_yellow' width="170" height="1190" viewBox="0 0 170 1190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="85" width="85" height="85" fill="#DA1D1D"/>
                <rect width="85" height="85" fill="#45963E"/>
                <rect y="85" width="85" height="85" fill="#1D52DA"/>
                <rect y="255" width="85" height="85" fill="#1D52DA"/>
                <rect y="425" width="85" height="85" fill="#1D52DA"/>
                <rect y="595" width="85" height="85" fill="#1D52DA"/>
                <rect y="765" width="85" height="85" fill="#1D52DA"/>
                <rect y="935" width="85" height="85" fill="#1D52DA"/>
                <rect y="1105" width="85" height="85" fill="#1D52DA"/>
                <rect x="85" y="85" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="255" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="425" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="595" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="765" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="935" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="1105" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="170" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="340" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="510" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="680" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="850" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="1020" width="85" height="85" fill="#DA1D1D"/>
                <rect y="170" width="85" height="85" fill="#45963E"/>
                <rect y="340" width="85" height="85" fill="#45963E"/>
                <rect y="510" width="85" height="85" fill="#45963E"/>
                <rect y="680" width="85" height="85" fill="#45963E"/>
                <rect y="850" width="85" height="85" fill="#45963E"/>
                <rect y="1020" width="85" height="85" fill="#45963E"/>
            </svg>
            <svg id='red_green' width="170" height="1190" viewBox="0 0 170 1190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="85" width="85" height="85" fill="#DA1D1D"/>
                <rect width="85" height="85" fill="#45963E"/>
                <rect y="85" width="85" height="85" fill="#1D52DA"/>
                <rect y="255" width="85" height="85" fill="#1D52DA"/>
                <rect y="425" width="85" height="85" fill="#1D52DA"/>
                <rect y="595" width="85" height="85" fill="#1D52DA"/>
                <rect y="765" width="85" height="85" fill="#1D52DA"/>
                <rect y="935" width="85" height="85" fill="#1D52DA"/>
                <rect y="1105" width="85" height="85" fill="#1D52DA"/>
                <rect x="85" y="85" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="255" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="425" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="595" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="765" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="935" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="1105" width="85" height="85" fill="#DAC71D"/>
                <rect x="85" y="170" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="340" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="510" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="680" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="850" width="85" height="85" fill="#DA1D1D"/>
                <rect x="85" y="1020" width="85" height="85" fill="#DA1D1D"/>
                <rect y="170" width="85" height="85" fill="#45963E"/>
                <rect y="340" width="85" height="85" fill="#45963E"/>
                <rect y="510" width="85" height="85" fill="#45963E"/>
                <rect y="680" width="85" height="85" fill="#45963E"/>
                <rect y="850" width="85" height="85" fill="#45963E"/>
                <rect y="1020" width="85" height="85" fill="#45963E"/>
            </svg>
            <table>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col"># of Games Played</th>
                    <th scope="col">High Score</th>
                </tr>
                {entries.map((entry) => <Entry username={entry.username} gamesplayed={entry.gamesplayed} highscore={entry.highscore} />)}  
            </table>
            <button className="back" onClick={() => window.location.href='/room.html'}>Back</button>
        </div>
    )
}
export default LeaderboardApp