import { ResponsiveBar } from "@nivo/bar";
import barriers from "data/treatment-barriers/first_year_college_barriers";

barriers.sort((b,a) => (a.Important+a["Very important"]) - (b.Important+b["Very important"]));

const FirstYearCollegeBarriers = (props: any) => {
    return (
        <>
        <h3>Importance of Barriers to Treatment to First-Year Colege Students</h3>
        <ResponsiveBar
            data={barriers}
            keys={['Unimportant', 'Of little importance', 'Moderately important', 'Important', 'Very important']}
            indexBy="short-barrier"
            groupMode="stacked"
            margin={{ top: 10, right: 250, bottom: 150, left: 100 }}
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
                legendOffset: 50,
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
            // labelSkipWidth={12}
            // labelSkipHeight={12}
            enableLabel={false}
            // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            isInteractive={true}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 250,
                    itemWidth: 200,
                    itemHeight: 50
                }
            ]}
        />
        </>
    );
};

export default FirstYearCollegeBarriers;