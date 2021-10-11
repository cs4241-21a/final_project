import { ResponsiveBar } from "@nivo/bar";
import barriers from "data/treatment-barriers/first_year_college_barriers";

barriers.sort((a,b) => (a.Important+a["Very important"]) - (b.Important+b["Very important"]));

const FirstYearCollegeBarriers = (props: any) => {
    return (
        <ResponsiveBar
            data={barriers}
            keys={['Unimportant', 'Of little importance', 'Moderately important', 'Important', 'Very important']}
            indexBy="short-barrier"
            groupMode="stacked"
            layout="horizontal"
            margin={{ top: 10, right: 250, bottom: 60, left: 250 }}
            padding={0.3}
            // valueScale={{ type: 'linear' }}
            // indexScale={{ type: 'band', round: true }}
            valueFormat='.1%'
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Reason',
                legendPosition: 'middle',
                legendOffset: -200,
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Percentage',
                legendPosition: 'middle',
                legendOffset: 40,
                format: '.1%'
            }}
            maxValue={1}
            // labelSkipWidth={12}
            // labelSkipHeight={12}
            enableLabel={true}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            isInteractive={true}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    translateX: 250,
                    itemWidth: 200,
                    itemHeight: 20
                }
            ]}
        />
    );
};

export default FirstYearCollegeBarriers;