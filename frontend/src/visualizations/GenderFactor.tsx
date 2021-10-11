// import US_STATES_MAP from './us_states';
import { ResponsiveBar } from '@nivo/bar'
import gender_factor from '../data/factors/gender';

const GenderFactor = (props: any) => {
    const data = gender_factor;
    // const data = us_suicide.map(state_entry => {
    //     return { ...state_entry, state: getLongStateNameFromShort(state_entry.state) };
    // });
    console.log(data);

    return (
        <div>
            <div style={{ "height": "600px", "width": "800px" }}>
                <ResponsiveBar
                    data={data}
                    keys={['depression', 'anxiety']}
                    indexBy="id"
                    groupMode="grouped"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    valueFormat=".1%"
                    // padding={0.3}
                    // valueScale={{ type: 'linear' }}
                    // indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Percentage',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: '.0%'
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    enableLabel={false}
                    // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    isInteractive={true}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
            <div>Data from <a href="https://doi.org/10.1016/j.jadohealth.2016.04.006">Journal of Adolescent Health</a></div>
        </div>
    )
};

export default GenderFactor;