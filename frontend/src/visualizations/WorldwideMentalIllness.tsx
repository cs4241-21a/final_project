import { ResponsiveBar } from '@nivo/bar';
import WORLDWIDE_MENTAL_ILLNESS, { keys as worldwide_keys } from '../data/prevelance/worldwide_mental_illness';


const WorldwideMentalIllness = (props: any) => {
    const data = WORLDWIDE_MENTAL_ILLNESS
        .filter(datum => datum.disorder !== "Any mental or substance use disorder")
        .map(datum => {
            return {
                "disorder": datum.disorder,
                "rate": parseFloat(datum.rate),
                "rateMale": parseFloat(datum.rateMale),
                "rateFemale": parseFloat(datum.rateFemale),
                "numPeople": parseInt(datum.numPeople)
            }
        })
        .sort((a, b) => (b.rate - a.rate));
    console.log(data);

    return (
        <div>
            <div style={{ "height": "400px", "width": "1000px" }}>
                <ResponsiveBar
                    data={data}
                    keys={['rate']}
                    indexBy="disorder"
                    margin={{ top: 50, right: 130, bottom: 40, left: 60 }}
                    padding={0.3}
                    valueFormat='.2%'
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
                        legend: 'Worldwide Rate',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: '.1%'
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    isInteractive={true}
                />

            </div>
            <div>Data from <a href="https://ourworldindata.org/mental-health">Our World In Data</a></div>
        </div>
    );
}

export default WorldwideMentalIllness;