import { ResponsiveBar } from '@nivo/bar';
import { CartesianMarkerProps } from '@nivo/core';
import { ResponsiveChoropleth } from '@nivo/geo';
import WORLD_MAP from '../data/geo/custom.geo.json';
import WORLDWIDE_SUICIDE, { keys as worldwide_keys } from '../data/prevelance/worldwide_suicide';


const WorldwideSuicide = (props: any) => {
    const data = WORLDWIDE_SUICIDE
        .filter(d => d.Sex === "Both sexes")
        .map(datum => {
            return {
                ...datum,
                "rate": parseFloat(datum.rate),
            }
        })
        .sort((a, b) => (b.rate - a.rate));
    console.log(data);
    const highlightCountry = props.country;

    let markers: CartesianMarkerProps[] = [];
    if (highlightCountry) {
        const entry = data.find(c => c.Country === highlightCountry)
        const highlightCountryRate = entry ? entry.rate : 0;
        markers.push({
            axis: 'y',
            value: highlightCountryRate,
            lineStyle: { stroke: 'rgba(0, 0, 0, .35)', strokeWidth: 2 },
            legend: highlightCountry,
            legendOrientation: 'horizontal',
        });
    }

    return (
        <div style={{ width: "100%" }}>
            <div style={{ width: "100%", height: "600px" }}>
                <ResponsiveChoropleth
                    data={data}
                    value="rate"
                    features={WORLD_MAP.features}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    colors="nivo"
                    domain={[0, 88]}
                    unknownColor="#666666"
                    label="properties.brk_name"
                    valueFormat=".2s"
                    projectionTranslation={[0.5, 0.5]}
                    projectionRotation={[0, 0, 0]}
                    enableGraticule={true}
                    graticuleLineColor="#dddddd"
                    borderWidth={0.5}
                    borderColor="#152538"
                    match={(a, b) => a.properties.brk_name === b.Country
                        || a.properties.formal_en === b.Country
                        || a.properties.name_long === b.Country
                        || a.properties.name === b.Country}

                    legends={
                        [
                            {
                                anchor: 'bottom-left',
                                direction: 'column',
                                justify: true,
                                translateX: 20,
                                translateY: -100,
                                itemsSpacing: 0,
                                itemWidth: 94,
                                itemHeight: 18,
                                itemDirection: 'left-to-right',
                                itemTextColor: '#444444',
                                itemOpacity: 0.85,
                                symbolSize: 18,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000000',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                />
            </div>
            <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveBar
                    data={data}
                    keys={['rate']}
                    indexBy="Country"
                    margin={{ top: 50, right: 20, bottom: 10, left: 60 }}
                    padding={0.2}
                    // valueScale={{ type: 'linear' }}
                    // indexScale={{ type: 'band', round: true }}
                    // valueFormat='.2%'
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Worldwide Rate',
                        legendPosition: 'middle',
                        legendOffset: -50,
                        // format: '.1%'
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    markers={markers}
                    // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    isInteractive={true}
                />
            </div>
            <div>Data from the <a href="https://apps.who.int/gho/data/node.main.MHSUICIDEASDR?lang=en">World Health Organization</a></div>
        </div>
    );
}

export default WorldwideSuicide;