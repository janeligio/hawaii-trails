import { useState, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import { TRAILS } from '../../routes/routes';
import { useHistory } from 'react-router-dom';

import './Home.sass';

const location = navigator.geolocation;

export default function Home() {
    const history = useHistory([-157.858333, 21.306944]);
    const [position, setPosition] = useState();
    const [map, setMap] = useState(null);
    const [view, setView] = useState(null);
    const mapDiv = useRef(null);

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
                        buttonEnabled: false,
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

            const renderer = new ClassBreaksRenderer({
                type: 'class-breaks',
                field: 'traffic',
            });

            const renderers = [
                { min: 0, max: 19, symbol: { color: '#00FF00' } },
                { min: 20, max: 39, symbol: { color: '#7FFF00' } },
                { min: 40, max: 59, symbol: { color: '#FFFF00' } },
                { min: 60, max: 79, symbol: { color: '#FF7F00' } },
                { min: 80, max: 100, symbol: { color: '#FF0000' } },
            ];

            for (let r of renderers) {
                renderer.addClassBreakInfo({
                    minValue: r.min,
                    maxValue: r.max,
                    symbol: {
                        type: 'simple-line',
                        width: 2,
                        color: r.symbol.color,
                        join: 'round',
                    },
                });
            }

            const viewFeatureAction = {
                title: 'View',
                id: 'view-trail',
            };

            const layer = new GeoJSONLayer({
                url: `${TRAILS}`,
                renderer: renderer,
                labelingInfo: [labelClass],
                popupTemplate: new PopupTemplate({
                    title: '{name}',
                    content: '{*}',
                    actions: [viewFeatureAction],
                }),
            });

            map.add(layer);

            function handleViewClick() {
                const featureId = view.popup.selectedFeature.attributes.id;
                console.log(featureId);
                // If the view is clicked, go to the trail page
                history.push('/feature/' + featureId);
            }

            view.popup.on('trigger-action', (event) => {
                if (event.action.id === 'view-trail') {
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
        </main>
    );
}
