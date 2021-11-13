import { useState, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import { HAWAII_TRAILS_API } from '../../constants';
import { TRAILS } from '../../routes/routes';

import './Home.sass';

export default function Home() {
    const [map, setMap] = useState(null);
    const [view, setView] = useState(null);
    const mapDiv = useRef(null);

    useEffect(() => {
        if (mapDiv.current) {
            // Initialize map
            const map = new Map({
                basemap: 'arcgis-nova', // Basemap layer service
            });

            // Initialize GeoJSON layers
            const trailColors = ['green', 'yellow', 'red'];
            const geoJSONLayers = [];

            for (const color of trailColors) {
                geoJSONLayers.push(
                    new GeoJSONLayer({
                        url: `${TRAILS}${color}`,
                        copyright: "HACC 2021 Hawai'i Trails",
                        renderer: {
                            type: 'simple', // autocasts as new SimpleRenderer()
                            symbol: {
                                type: 'simple-line', // autocasts as new SimpleMarkerSymbol()
                                size: 6,
                                color: color,
                                outline: {
                                    // autocasts as new SimpleLineSymbol()
                                    width: 0.5,
                                    color: 'white',
                                },
                            },
                        },
                    })
                );
            }

            // Initialize view
            const view = new MapView({
                container: mapDiv.current,
                map: map,
                center: [-157.858333, 21.306944],
                zoom: 7,
            });

            // Add GeoJSON layers
            for (const layer of geoJSONLayers) {
                layer.popupTemplate = new PopupTemplate({
                    title: '{Trailname}',
                });
                map.add(layer);
            }

            setMap(map);
            setView(view);
        }
    }, []);

    // TODO: useGraphics(view); // Add graphics to the view
    return (
        <main id="home">
            <div className="map-view" ref={mapDiv} />
        </main>
    );
}
