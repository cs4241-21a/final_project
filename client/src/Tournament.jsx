import React from "react";
import Match from "./Match";
class Tournament extends React.Component {

    constructor(props) {
        super(props)
        this.state = {matches:[]}
        this.load()
    }

    load() {
        fetch("loadMatches", {
            method: "GET",
        }).then(async (response) => {
            const json = await response.json();
            this.setState({matches:json})
        })
    }
    render() {
        return (
          <>
           <table  class="table table-striped  w-50">
                
                <tbody>
                  {this.state.matches.map((match, i) => (
                    <Match
                      teamName1={match.teamName1}
                      teamName2={match.teamName2}
                    />
                  ))}
                </tbody>
              </table>
          </>
        );
      }
}


export default Tournament;