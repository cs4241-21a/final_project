import { ResponsiveBar } from '@nivo/bar';
import phq_score_correlation from 'data/phq-9/phq_score_correlation';

const PHQ9Correlation = (props: any) => {
    return (
        <div>
            <div style={{ "height": "600px", "width": "800px" }}>
                <ResponsiveBar
                    data={phq_score_correlation}
                    keys={['minimal', 'mild', 'moderate', 'moderately severe', 'severe']}
                    indexBy="diagnosis"
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
                        tickRotation: 0,
                        // legend: 'Diagnosis',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        // legend: 'Percentage',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        format: '.1%'
                    }}
                    // labelSkipWidth={12}
                    // labelSkipHeight={12}
                    enableLabel={false}
                    // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    isInteractive={true}
                />
            </div>
            <div>Data from the <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1495268/">Journal General Internal Medicine</a></div>
        </div>
    );
};

export default PHQ9Correlation;