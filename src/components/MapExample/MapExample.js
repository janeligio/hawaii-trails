import { loadModules } from 'esri-loader';

// Modules you can import with esri-loader
// 'esri/views/MapView'
// 'esri/WebMap'
// 'esri/WebScene'
// 'esri/views/SceneView'
// 'esri/layers/Layer'
// 'esri/widgets/FeatureTable'

const esriModules = {
    MapView: 'esri/views/MapView',
    WebMap: 'esri/WebMap',
    WebScene: 'esri/WebScene',
    SceneView: 'esri/views/SceneView',
    Layer: 'esri/layers/Layer',
    FeatureTable: 'esri/widgets/FeatureTable',
};

export default async function MapExample() {
    const loadEsriModule = (module) =>
        loadModules([esriModules[module]]).then(([EsriModule]) => EsriModule);
    const WebMap = await loadEsriModule('WebMap');
    const MapView = await loadEsriModule('MapView');
    const HawaiiTrailsMapKey = 'f9338a96266b48198de612b0b27b580a';

    const webMap = new WebMap({
        // Define the web map reference
        portalItem: {
            id: HawaiiTrailsMapKey,
        },
    });

    // const map = new MapView({
    //     map: webMap, // Load the web map
    //     container: 'map-view',
    // });

    return (
        <div className="map-container">
            <div id="map-view">yo</div>
        </div>
    );
}

// this will lazy load the ArcGIS API
// and then use Dojo's loader to require the classes
// loadModules(['esri/views/MapView', 'esri/WebMap'])
//     .then(([MapView, WebMap]) => {
//         // then we load a web map from an id
//         var webmap = new WebMap({
//             portalItem: {
//                 // autocasts as new PortalItem()
//                 id: 'f2e9b762544945f390ca4ac3671cfa72',
//             },
//         });
//         // and we show that map in a container w/ id #viewDiv
//         var view = new MapView({
//             map: webmap,
//             container: 'viewDiv',
//         });
//     })
//     .catch((err) => {
//         // handle any errors
//         console.error(err);
//     });
