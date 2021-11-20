import { useState, useEffect, useRef } from 'react';
import { scaleLinear, scaleBand, max } from 'd3';
import * as d3 from 'd3';
import './Histogram.sass';

function getCurrentDayOfWeek() {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(new Date());
}

export default function Histogram({ data }) {
    const [currentDay, setCurrentDay] = useState(getCurrentDayOfWeek());
    const [currentGraphData, setCurrentGraphData] = useState([
        { name: '7am', value: 0 },
        { name: '8am', value: 0 },
        { name: '9am', value: 0 },
        { name: '10am', value: 0 },
        { name: '11am', value: 0 },
        { name: '12pm', value: 0 },
        { name: '1pm', value: 0 },
        { name: '2pm', value: 0 },
        { name: '3pm', value: 0 },
        { name: '4pm', value: 0 },
        { name: '5pm', value: 0 },
        { name: '6pm', value: 0 },
        { name: '7pm', value: 0 },
    ]);

    useEffect(() => {
        const findDataForCurrentDay = (data) => {
            const index = data.findIndex((item) => item.fullDay === currentDay);

            if (index === -1) {
                console.log('Failed to query data');
                return [];
            }

            return data[index].data;
        };
        const data = findDataForCurrentDay(sampleData);
        setCurrentGraphData(data);
    }, [currentDay]); // eslint-disable-line react-hooks/exhaustive-deps

    const dayMap = {
        Sun: 'Sunday',
        Mon: 'Monday',
        Tue: 'Tuesday',
        Wed: 'Wednesday',
        Thu: 'Thursday',
        Fri: 'Friday',
        Sat: 'Saturday',
        Sunday: 'Sun',
        Monday: 'Mon',
        Tuesday: 'Tue',
        Wednesday: 'Wed',
        Thursday: 'Thu',
        Friday: 'Fri',
        Saturday: 'Sat',
    };

    const width = 300;
    const height = 170;

    function setCurrentDayHandler(e, day) {
        if (dayMap[day] === currentDay) {
            return;
        }
        setCurrentDay(dayMap[day]);
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
        (day, index) => {
            const isCurrentDay = day === dayMap[currentDay];
            const dayClass = isCurrentDay ? 'current-day' : '';

            return (
                <span
                    className={dayClass}
                    key={index}
                    onClick={(e) => setCurrentDayHandler(e, day)}
                >
                    {day}
                </span>
            );
        }
    );

    return (
        <div className="histogram-container">
            <h1 className="histogram-title">Popular Times</h1>
            <div className="day-picker">{days}</div>
            <BarChart width={width} height={height} data={currentGraphData} />
        </div>
    );
}

function BarChart({ width, height, data }) {
    const margin = { top: 20, right: 5, bottom: 15, left: 5 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const duration = 500;

    const ref = useRef();

    useEffect(() => {
        d3.select(ref.current)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        draw();
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const draw = () => {
        const y = scaleLinear()
            .domain([0, max(data, (d) => d.value)])
            .range([innerHeight, 0]);

        const x = scaleBand()
            .domain(data.map((d) => d.name))
            .rangeRound([0, innerWidth])
            .padding(0.5);

        const svg = d3.select(ref.current);
        const chart = svg.select('g');

        chart
            .selectAll('.bar')
            .data(data)
            .join((enter) =>
                enter
                    .append('rect')
                    .classed('bar', true)
                    .attr('y', (d) => y(0))
                    .attr('height', 0)
            )
            .attr('x', (d) => x(d.name))
            .style('fill', (d, i) => 'steelblue')
            .attr('width', (d) => x.bandwidth())
            .transition()
            .duration(duration)
            .delay((d, i) => (i * duration) / 10)
            .attr('height', (d) => innerHeight - y(d.value))
            .attr('y', (d) => y(d.value));

        chart
            .selectAll('.bar-label')
            .data(data)
            .join((enter) =>
                enter
                    .append('text')
                    .classed('bar-label', true)
                    .attr('text-anchor', 'middle')
                    .attr('dx', 0)
                    .attr('y', y(0))
                    .attr('dy', -6)
                    .attr('opacity', 0)
                    .attr('font-size', '6px')
            )
            .attr('x', (d) => x(d.name) + x.bandwidth() / 2)
            .text((d) => d.name)
            .transition()
            .duration(duration)
            .delay((d, i) => (i * duration) / 10)
            .attr('opacity', 1)
            .attr('y', innerHeight + 12);
    };

    return <svg viewBox={`0, 0, ${width}, ${height}`} ref={ref}></svg>;
}

const sampleData = [
    {
        day: 'Sun',
        fullDay: 'Sunday',
        data: [
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
        ],
    },
    {
        day: 'Mon',
        fullDay: 'Monday',
        data: [
            { name: '7am', value: 12 },
            { name: '8am', value: 97 },
            { name: '9am', value: 77 },
            { name: '10am', value: 15 },
            { name: '11am', value: 69 },
            { name: '12pm', value: 87 },
            { name: '1pm', value: 75 },
            { name: '2pm', value: 72 },
            { name: '3pm', value: 32 },
            { name: '4pm', value: 38 },
            { name: '5pm', value: 62 },
            { name: '6pm', value: 48 },
            { name: '7pm', value: 4 },
        ],
    },
    {
        day: 'Tue',
        fullDay: 'Tuesday',
        data: [
            { name: '7am', value: 61 },
            { name: '8am', value: 81 },
            { name: '9am', value: 78 },
            { name: '10am', value: 63 },
            { name: '11am', value: 12 },
            { name: '12pm', value: 76 },
            { name: '1pm', value: 54 },
            { name: '2pm', value: 27 },
            { name: '3pm', value: 62 },
            { name: '4pm', value: 85 },
            { name: '5pm', value: 3 },
            { name: '6pm', value: 87 },
            { name: '7pm', value: 29 },
        ],
    },
    {
        day: 'Wed',
        fullDay: 'Wednesday',
        data: [
            { name: '7am', value: 81 },
            { name: '8am', value: 80 },
            { name: '9am', value: 11 },
            { name: '10am', value: 42 },
            { name: '11am', value: 93 },
            { name: '12pm', value: 92 },
            { name: '1pm', value: 94 },
            { name: '2pm', value: 75 },
            { name: '3pm', value: 85 },
            { name: '4pm', value: 60 },
            { name: '5pm', value: 81 },
            { name: '6pm', value: 26 },
            { name: '7pm', value: 86 },
        ],
    },
    {
        day: 'Thu',
        fullDay: 'Thursday',
        data: [
            { name: '7am', value: 100 },
            { name: '8am', value: 43 },
            { name: '9am', value: 99 },
            { name: '10am', value: 64 },
            { name: '11am', value: 36 },
            { name: '12pm', value: 1 },
            { name: '1pm', value: 44 },
            { name: '2pm', value: 100 },
            { name: '3pm', value: 77 },
            { name: '4pm', value: 43 },
            { name: '5pm', value: 63 },
            { name: '6pm', value: 96 },
            { name: '7pm', value: 96 },
        ],
    },
    {
        day: 'Fri',
        fullDay: 'Friday',
        data: [
            { name: '7am', value: 34 },
            { name: '8am', value: 75 },
            { name: '9am', value: 62 },
            { name: '10am', value: 48 },
            { name: '11am', value: 35 },
            { name: '12pm', value: 42 },
            { name: '1pm', value: 12 },
            { name: '2pm', value: 0 },
            { name: '3pm', value: 98 },
            { name: '4pm', value: 70 },
            { name: '5pm', value: 95 },
            { name: '6pm', value: 86 },
            { name: '7pm', value: 23 },
        ],
    },
    {
        day: 'Sat',
        fullDay: 'Saturday',
        data: [
            { name: '7am', value: 32 },
            { name: '8am', value: 15 },
            { name: '9am', value: 79 },
            { name: '10am', value: 96 },
            { name: '11am', value: 10 },
            { name: '12pm', value: 4 },
            { name: '1pm', value: 27 },
            { name: '2pm', value: 74 },
            { name: '3pm', value: 20 },
            { name: '4pm', value: 2 },
            { name: '5pm', value: 17 },
            { name: '6pm', value: 82 },
            { name: '7pm', value: 0 },
        ],
    },
];
