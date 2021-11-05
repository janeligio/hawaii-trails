import { useMap, useWebMap, useEvent } from 'esri-loader-hooks';

export default function Home() {
    const map = {
        basemap: 'streets',
    };
    const honolulu = [21.306944, -157.858333];
    const options = {
        view: {
            // center: [21, -157],
            zoom: 4,
        },
    };
    // const [ref] = useMap(map, options);

    const [ref, view] = useWebMap('f9338a96266b48198de612b0b27b580a');
    useEvent(view, 'click', (e) => console.log(e));
    return (
        <main>
            <div style={{ height: '100vh' }} ref={ref} />
        </main>
    );
}
