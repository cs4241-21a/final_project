import { ResponsiveBar } from "@nivo/bar";
import barriers from "data/treatment-barriers/barriers_ncs-r_grouped";

const BarriersNCSRGrouped = (props: any) => {
    return (
        <ResponsiveBar
            data={barriers}
            keys={['mild', 'moderate', 'severe']}
            indexBy="reason"
            groupMode="grouped"
            margin={{ top: 10, right: 250, bottom: 60, left: 100 }}
            padding={0.3}
            // valueScale={{ type: 'linear' }}
            // indexScale={{ type: 'band', round: true }}
            valueFormat='.1%'
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Reason',
                legendPosition: 'middle',
                legendOffset: 40
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Percentage',
                legendPosition: 'middle',
                legendOffset: -70,
                format: '.1%'
            }}
            maxValue={1}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 250,
                    itemWidth: 200,
                    itemHeight: 20
                }
            ]}
            // labelSkipWidth={12}
            // labelSkipHeight={12}
            enableLabel={false}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            isInteractive={true}
        />
    );
};

export default BarriersNCSRGrouped;