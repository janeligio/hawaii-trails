import './Histogram.sass';
import { scaleLinear, scaleBand, max } from 'd3';

export default function ({ data }) {
    // The data to display
    const TIMEData = [
        { name: '7am', value: 32 },
        { name: '8am', value: 17 },
        { name: '9am', value: 72 },
        { name: '10am', value: 50 },
        { name: '11am', value: 70 },
        { name: '12pm', value: 10 },
        { name: '1pm', value: 25 },
        { name: '2pm', value: 62 },
        { name: '3pm', value: 48 },
        { name: '4pm', value: 72 },
        { name: '5pm', value: 52 },
        { name: '6pm', value: 31 },
        { name: '7pm', value: 15 },
    ];

    // const width = 175;
    const width = 300;
    const height = 170;
    const margin = { top: 20, right: 5, bottom: 15, left: 5 };
    const xRange = [margin.left, width - margin.right]; // Plotting on the x-axis starts from 40-500
    const yRange = [height - margin.bottom, margin.top]; // Plotting on the x-axis starts from 470-20

    // Function to calculate the height of a bar given a data value (i.e., the value of invest, tolerate)
    const y = scaleLinear()
        .domain([0, max(TIMEData, (d) => d.value)])
        .range(yRange);

    const x = scaleBand()
        .domain(TIMEData.map((d) => d.name))
        .rangeRound(xRange)
        .padding(0.1);

    const bars = TIMEData.map((d, index) => (
        <g key={`TIMEDataBars-${x(d.name)}-${y(d.value)}`} fill={'steelblue'}>
            <rect
                x={x(d.name)}
                y={y(d.value)}
                height={y(0) - y(d.value)}
                width={x.bandwidth()}
            />
        </g>
    ));

    // const titleX = margin.left+((width-margin.left)/2);
    const titleX = width / 2;
    const titleY = margin.top - 10;

    const yTitle = (
        <text textAnchor="middle" fontSize="7" x={titleX} y={titleY}></text>
    );

    const labels = TIMEData.map((d, index) => {
        const labelX = x(d.name) + x.bandwidth() / 2;
        const labelY = height - margin.bottom + 7;
        return (
            <text
                fontSize="6"
                key={`TIME Label:${d.name}`}
                x={labelX}
                y={labelY}
                textAnchor="middle"
            >
                {d.name}
            </text>
        );
    });

    return (
        <div className="histogram-container">
            <svg viewBox={`0, 0, ${width}, ${height}`}>
                {bars}
                {yTitle}
                {labels}
            </svg>
        </div>
    );
}
