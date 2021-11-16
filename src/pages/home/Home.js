import { useState, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import CustomContent from '@arcgis/core/popup/content/CustomContent';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import Legend from '@arcgis/core/widgets/Legend';
import { TRAILS, PARKS } from '../../routes/routes';
import { useHistory } from 'react-router-dom';
import { getTrafficChipData, getDifficultyChipColor } from '../../util/util';

import './Home.sass';

const location = navigator.geolocation;

export default function Home() {
    const history = useHistory();
    const [position, setPosition] = useState([-157.858333, 21.306944]);
    const [map, setMap] = useState(null);
    const [view, setView] = useState(null);

    const mapDiv = useRef(null);
    const legendDiv = useRef(null);

    useEffect(() => {
        if (mapDiv.current) {
            // Initialize map
            const map = new Map({
                basemap: 'arcgis-nova', // Basemap layer service
            });

            // Initialize view
            const view = new MapView({
                container: mapDiv.current,
                map: map,
                // center: [-157.858333, 21.306944],
                center: position,
                zoom: 7,
                popup: {
                    dockEnabled: true,
                    dockOptions: {
                        // Disables the dock button from the popup
                        buttonEnabled: true,
                        // Ignore the default sizes that trigger responsive docking
                        breakpoint: true,
                    },
                },
            });

            if (location) {
                // If user has location enabled, center map on their location

                location.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        setPosition([longitude, latitude]);

                        view.goTo({
                            center: [longitude, latitude],
                            zoom: 13,
                        });

                        console.log(`Map center: `, view.center);
                        console.log('My location: ', [longitude, latitude]);
                    },
                    (err) => {
                        console.log(`code:${err.code} ${err.message}`);
                    }
                );
            } else {
                console.log('location not supported');
            }

            const labelClass = {
                symbol: {
                    type: 'text',
                    color: 'white',
                    font: {
                        family: 'Ubuntu Mono',
                        size: 15,
                        weight: 'bold',
                    },
                },
                labelPlacement: 'above-before',
                labelExpressionInfo: {
                    expression: '$feature.name',
                },
            };

            const trailsRenderer = new ClassBreaksRenderer({
                type: 'class-breaks',
                legendOptions: {
                    title: 'Traffic Density',
                },
                field: 'traffic',
            });

            const parksRenderer = new ClassBreaksRenderer({
                type: 'class-breaks',
                field: 'traffic',
            });

            const renderers = [
                {
                    min: 0,
                    max: 19,
                    symbol: { color: '#00FF00' },
                    label: 'Not Busy',
                },
                {
                    min: 20,
                    max: 39,
                    symbol: { color: '#7FFF00' },
                    label: 'Slightly Busy',
                },
                {
                    min: 40,
                    max: 59,
                    symbol: { color: '#FFFF00' },
                    label: 'Fairly Busy',
                },
                {
                    min: 60,
                    max: 79,
                    symbol: { color: '#FF7F00' },
                    label: 'Busy',
                },
                {
                    min: 80,
                    max: 100,
                    symbol: { color: '#FF0000' },
                    label: 'Very Busy',
                },
            ];

            for (let r of renderers) {
                trailsRenderer.addClassBreakInfo({
                    minValue: r.min,
                    maxValue: r.max,
                    label: r.label,
                    symbol: {
                        type: 'simple-line',
                        width: 2,
                        color: r.symbol.color,
                        join: 'round',
                    },
                });
                parksRenderer.addClassBreakInfo({
                    minValue: r.min,
                    maxValue: r.max,
                    symbol: {
                        type: 'simple-fill',
                        width: 2,
                        color: r.symbol.color,
                        join: 'round',
                    },
                });
            }

            const viewFeatureAction = {
                title: 'View',
                id: 'view-feature',
            };

            const customContent = new CustomContent({
                outFields: ['*'],
                creator: (event) => {
                    console.dir(event.graphic.attributes);
                    let { difficulty, traffic } = event.graphic.attributes;

                    const Chip = (className, text) => {
                        return `<li class="chip ${className}">${text}</li>`;
                    };

                    const [trafficLabel, , , trafficClassName] =
                        getTrafficChipData(traffic);
                    const [, , difficultyClassName] =
                        getDifficultyChipColor(difficulty);

                    const trafficChip = Chip(trafficClassName, trafficLabel);
                    const difficultyChip = Chip(
                        difficultyClassName,
                        `Difficulty - ${difficulty}`
                    );

                    return `<ul>
                    ${trafficChip}
                    ${difficultyChip}
                    </ul>`;
                },
            });

            const trailsLayer = new GeoJSONLayer({
                url: `${TRAILS}`,
                renderer: trailsRenderer,
                labelingInfo: [labelClass],
                legendEnabled: true,
                opacity: 0.75,
                popupTemplate: new PopupTemplate({
                    title: '{name}',
                    outFields: ['*'],
                    content: [customContent],
                    actions: [viewFeatureAction],
                }),
            });

            const parksLayer = new GeoJSONLayer({
                url: `${PARKS}`,
                renderer: parksRenderer,
                opacity: 0.75,
                popupTemplate: new PopupTemplate({
                    title: '{name}',
                    outFields: ['*'],
                    content: [customContent],
                    actions: [viewFeatureAction],
                }),
            });

            map.add(trailsLayer);
            map.add(parksLayer);

            const trafficLegend = new Legend({
                view: view,
                style: 'card',
                container: legendDiv.current,
                layerInfos: [
                    {
                        layer: trailsLayer,
                        title: 'Feature Traffic',
                    },
                ],
            });

            view.ui.add(trafficLegend, 'bottom-left');

            function handleViewClick() {
                const featureId = view.popup.selectedFeature.attributes.id;
                console.log(featureId);
                // If the view is clicked, go to the trail page
                history.push('/feature/' + featureId);
            }

            // Assign a button to the popup with text 'View' that opens the feature page
            view.popup.on('trigger-action', (event) => {
                if (event.action.id === 'view-feature') {
                    handleViewClick();
                }
            });

            setMap(map);
            setView(view);
        }
    }, [history]);

    return (
        <main id="home">
            <div className="map-view" ref={mapDiv} />
            <div className="view-legend" ref={legendDiv} />
        </main>
    );
}
