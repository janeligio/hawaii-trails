import { useState, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import { TRAILS } from '../../routes/routes';
import { useHistory } from 'react-router-dom';

import './Home.sass';

export default function Home() {
    const history = useHistory();

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
                center: [-157.858333, 21.306944],
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

            renderer.addClassBreakInfo({
                minValue: 0,
                maxValue: 32,
                symbol: {
                    type: 'simple-line', // autocasts as new SimpleMarkerSymbol()
                    size: 6,
                    color: 'green',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: 'white',
                    },
                },
            });

            renderer.addClassBreakInfo({
                minValue: 33,
                maxValue: 65,
                symbol: {
                    type: 'simple-line', // autocasts as new SimpleMarkerSymbol()
                    size: 6,
                    color: 'yellow',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: 'white',
                    },
                },
            });

            renderer.addClassBreakInfo({
                minValue: 66,
                maxValue: 100,
                symbol: {
                    type: 'simple-line', // autocasts as new SimpleMarkerSymbol()
                    size: 6,
                    color: 'red',
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: 'white',
                    },
                },
            });

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
