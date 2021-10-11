import { ResponsiveBar } from '@nivo/bar';
import ncha_felt_mentally_exhausted_data from '../data/ncha/ncha_felt_mentally_exhausted_data';

const NCHAMentallyExhausted = (props: any) => {
    return (
        <div>
            <h4>Felt Exhausted (Not From Physical Activity)</h4>
            <div style={{ width: '800px', height: '600px' }}>
                <ResponsiveBar
                    data={ncha_felt_mentally_exhausted_data}
                    keys={['male', 'female', 'total']}
                    indexBy="answer"
                    margin={{ top: 50, right: 50, bottom: 150, left: 60 }}
                    padding={0.3}
                    // valueScale={{ type: 'linear' }}
                    // indexScale={{ type: 'band', round: true }}
                    valueFormat={(v) => v+'%'}
                    groupMode="grouped"
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 45,
                        // legend: 'Diagnosis',
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
                        format: (v) => (v + '%')
                    }}
                    // labelSkipWidth={12}
                    // labelSkipHeight={12}
                    enableLabel={false}
                    // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    isInteractive={true}
                />
            </div>
        </div>
    );
};

export default NCHAMentallyExhausted;