import { ResponsiveBar } from '@nivo/bar';
import { getShortStateNameFromLong } from 'util/stateUtil';
import US_MENTAL_ILLNESS from '../data/prevelance/us_mental_illness';

const USMentalIllness = (props: any) => {
    const data = US_MENTAL_ILLNESS
        .filter(d => d.state !== "Total United States")
        .map(datum => {
            return {
                "state": getShortStateNameFromLong(datum.state),
                "rate": parseFloat(datum.rate)
            }
        })
    // .sort((a, b) => (b.rate - a.rate));
    console.log(data);

    return (
        <ResponsiveBar
            data={data}
            keys={['rate']}
            indexBy="state"
            margin={{ top: 50, right: 10, bottom: 80, left: 60 }}
            padding={0.3}
            // valueScale={{ type: 'linear' }}
            // indexScale={{ type: 'band', round: true }}
            valueFormat='.2%'
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                // legend: 'Disorder',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'State Rate',
                legendPosition: 'middle',
                legendOffset: -50,
                format: '.1%'
            }}
            // labelSkipWidth={12}
            // labelSkipHeight={12}
            enableLabel={false}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            isInteractive={true}
            markers={[
                {
                    axis: 'y',
                    value: parseFloat(US_MENTAL_ILLNESS[0].rate),
                    lineStyle: { stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2 },
                    legend: 'National Average',
                    legendOrientation: 'vertical',
                },
            ]}
        />
    );
}

export default USMentalIllness;