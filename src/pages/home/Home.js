import { useMap, useWebMap, useEvent } from 'esri-loader-hooks';
import { useEffect } from 'react';
import './Home.sass';

export default function Home({ zoom = 5, center = [10.306944, -157.858333] }) {
    const map = {
        basemap: 'streets',
    };
    const honolulu = [21.306944, -157.858333];
    const options = {
        view: {
            center,
            zoom,
        },
    };
    // const [ref] = useMap(map, options);

    const [ref, view] = useWebMap('f9338a96266b48198de612b0b27b580a', options);

    useEffect(() => {
        if (!view) {
            return;
        } else {
            console.log(view.allLayerViews);
            // if (view.zoom !== Math.round(zoom, 0)) {
            //     // zoom prop has changed, update view
            //     view.zoom = zoom;
            //     console.log(view.zoom);
            //     console.log(view.center);
            // }
        }
    }, [zoom, view]);

    useEvent(view, 'click', (e) => console.log(e));

    return (
        <main id="home">
            <div style={{ height: '100vh' }} ref={ref} />

            <div className="custom-actions">
                <button>Zoom in</button>
                <button>Zoom out</button>
            </div>
        </main>
    );
}
