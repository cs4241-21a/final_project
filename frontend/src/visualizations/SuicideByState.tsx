// import US_STATES_MAP from './us_states';
import { ResponsiveBar } from '@nivo/bar'
import us_suicide from '../data/prevelance/us_suicide';

const SuicideByStateChloropleth = (props: any) => {
    const data = us_suicide;
    // const data = us_suicide.map(state_entry => {
    //     return { ...state_entry, state: getLongStateNameFromShort(state_entry.state) };
    // });
    console.log(data);

    return (
        <ResponsiveBar
            data={data}
            keys={['rate']}
            indexBy="state"
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            // padding={0.3}
            // valueScale={{ type: 'linear' }}
            // indexScale={{ type: 'band', round: true }}
            // valueFormat={{ format: '', enabled: false }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'suicides per 100,000',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            enableLabel={false}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            isInteractive={true}
        />
    )
};

export default SuicideByStateChloropleth;