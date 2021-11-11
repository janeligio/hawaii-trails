// import { useMap, useWebMap, useEvent } from 'esri-loader-hooks';
// import { WebMap } from '@esri/react-arcgis';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Graphic from '@arcgis/core/Graphic';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import CustomContent from '@arcgis/core/popup/content/CustomContent';
import Content from '@arcgis/core/popup/content/Content';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

import { useState, useEffect, useRef } from 'react';

import './Home.sass';

export default function Home() {
    const [map, setMap] = useState(null);
    const [view, setView] = useState(null);
    const [graphic, setGraphic] = useState(null);
    const mapDiv = useRef(null);

    const honolulu = [-157.858333, 21.306944]; // lng/lat for some reason

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3001/green', {
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const data = await response.json();
            return data;
        }
        console.log(fetchData().then((data) => console.log(data)));

        if (mapDiv.current) {
            // Initialize map
            const map = new Map({
                basemap: 'arcgis-nova', // Basemap layer service
            });

            // Add GeoJSON layers
            const trailColors = ['green', 'yellow', 'red'];
            const geoJSONLayers = [];

            for (const color of trailColors) {
                geoJSONLayers.push(
                    new GeoJSONLayer({
                        url: `http://localhost:3001/${color}`,
                        copyright: "HACC 2021 Hawai'i Trails",
                    })
                );
            }

            // Initialize view
            const view = new MapView({
                container: mapDiv.current,
                map: map,
                center: honolulu,
                zoom: 7,
            });

            for (const layer of geoJSONLayers) {
                layer.popupTemplate = new PopupTemplate({
                    Trailname: '{Trailname}',
                });
                map.add(layer);
            }

            const polyline = {
                type: 'polyline', // autocasts as new Polyline()
                paths: examplePolyLine,
            };

            // Proof of concept - adding a graphic to the map

            const lineSymbol = {
                type: 'simple-line', // autocasts as new SimpleLineSymbol()
                color: 'green', // RGB color values as an array
                width: 4,
            };

            const lineAtt = {
                // Trailname: 'Kamananui Valley Road',
                // Features: 'Hike, Nature Study, Hunt, Stream, Archeo, Culture',
                // Island: 'Oahu',
                // Length_Miles: 2,
                // Standard: 'Easy',
                TRAILNAME: 'Kamananui Valley Road',
                FEATURES: 'Hike, Nature Study, Hunt, Stream, Archeo, Culture',
                ISLAND: 'Oahu',
                LENGTH_MILES: 2,
                STANDARD: 'Easy',
            };

            const popupTemplate = new PopupTemplate();
            // TODO: Implement a button in popup that lets users check in
            let customContentWidget = new CustomContent({
                outFields: ['*'],
                creator: function (graphic) {},
                // creator function returns either string, HTMLElement, Widget, or Promise
            });
            popupTemplate.title = '<h1>{TRAILNAME}</h1>';
            popupTemplate.content =
                '<p>{FEATURES}</p>' +
                '<p>{ISLAND}</p>' +
                '<p>{LENGTH_MILES}</p>' +
                '<p>{STANDARD}</p>';

            // Add the geometry and symbol to a new graphic
            const polylineGraphic = new Graphic({
                geometry: polyline, // Add the geometry created in step 4
                symbol: lineSymbol, // Add the symbol created in step 5
                attributes: lineAtt, // Add the attributes created in step 6
                popupTemplate: popupTemplate,
                // popupTemplate: {
                //     // autocasts as new PopupTemplate()
                //     title: '{TRAILNAME}',
                //     content: [
                //         {
                //             type: 'fields',
                //             fieldInfos: [
                //                 {
                //                     fieldName: 'TRAILNAME',
                //                 },
                //                 {
                //                     fieldName: 'FEATURES',
                //                 },
                //                 {
                //                     fieldName: 'ISLAND',
                //                 },
                //                 {
                //                     fieldName: 'LENGTH_MILES',
                //                 },
                //                 {
                //                     fieldName: 'STANDARD',
                //                 },
                //             ],
                //         },
                //     ],
                // },
            });

            view.graphics.add(polylineGraphic);

            setMap(map);
            setView(view);
            setGraphic(polylineGraphic);
        }
    }, []);

    // TODO: useGraphics(view); // Add graphics to the view
    return (
        <main id="home">
            <div style={{ height: '100vh' }} ref={mapDiv} />
        </main>
    );
}

const examplePolyLine = [
    [-157.88026164532826, 21.374216183377357],
    [-157.87977552056387, 21.374473117460575],
    [-157.87904840995265, 21.37471217846694],
    [-157.87852148483094, 21.374753827766433],
    [-157.87807868436494, 21.37464065359356],
    [-157.87752184630946, 21.374304480863067],
    [-157.87715415686543, 21.374333639967745],
    [-157.87607013811365, 21.374957855600616],
    [-157.87581629003031, 21.375108829211676],
    [-157.8746930306648, 21.375187122344606],
    [-157.87456923691232, 21.37523146195758],
    [-157.87427049856882, 21.375450790165424],
    [-157.8740160565513, 21.375552972684293],
    [-157.8739322971581, 21.375785486740096],
    [-157.87348130229617, 21.37611310161879],
    [-157.87295078967082, 21.37637062059016],
    [-157.87166004950092, 21.377032263733433],
    [-157.8714074280961, 21.377148006177055],
    [-157.87083037072406, 21.37731125110441],
    [-157.87070407099964, 21.37743055264855],
    [-157.8704148968908, 21.377658971867376],
    [-157.87019417854086, 21.377890560776343],
    [-157.87001798852125, 21.37797519682789],
    [-157.8698884400379, 21.378014977103824],
    [-157.86975324345983, 21.378036651341123],
    [-157.86951233799283, 21.378007926600596],
    [-157.8691415996186, 21.37793044664219],
    [-157.8688537831662, 21.377856235082515],
    [-157.86871862133648, 21.377873391748608],
    [-157.86864704324628, 21.377900010974948],
    [-157.8684990309513, 21.377957733557185],
    [-157.86838855601334, 21.378025645597127],
    [-157.86824679274525, 21.37839959804488],
    [-157.86811685245374, 21.37861553522036],
    [-157.86805053949203, 21.378835516018064],
    [-157.8678970992657, 21.3789717957747],
    [-157.86777309202085, 21.37904323053449],
    [-157.86759051041997, 21.379080844306213],
    [-157.8672677157197, 21.379039819475537],
    [-157.86687190711157, 21.378961261809845],
    [-157.8666151104296, 21.378992049538834],
    [-157.8663503196593, 21.37905891860377],
    [-157.86608008796097, 21.37920615249717],
    [-157.8659741609541, 21.379309325942717],
    [-157.86576905271437, 21.379516623415217],
    [-157.86571189540405, 21.379674330866056],
    [-157.86558488312514, 21.380010436978264],
    [-157.8655504652386, 21.38009602663176],
    [-157.86543296804564, 21.38032378972849],
    [-157.86523933279852, 21.38054381153646],
    [-157.86509892791952, 21.38061513239735],
    [-157.86488792122623, 21.380711271393125],
    [-157.86468759029478, 21.380673780179023],
    [-157.86444115024364, 21.38048691770754],
    [-157.86417187722162, 21.38025924673126],
    [-157.86397547243308, 21.380088079114174],
    [-157.86379271228046, 21.380023604050415],
    [-157.86368827063907, 21.38005903245404],
    [-157.8634650834286, 21.38023368234347],
    [-157.8632051072008, 21.380426149599987],
    [-157.86312873949566, 21.38044821696252],
    [-157.8621361849736, 21.380581514233487],
    [-157.8619535514201, 21.380625445129805],
    [-157.86170091777376, 21.380741172302127],
    [-157.86161781963736, 21.38088515036167],
    [-157.86162394212954, 21.380966497215027],
    [-157.86176537837426, 21.38126105844007],
    [-157.8618533059143, 21.38136554507557],
    [-157.8619127058435, 21.381542109539325],
    [-157.86199291234604, 21.38177211526831],
    [-157.861934135444, 21.381889156661703],
    [-157.86181015889284, 21.381956070033326],
    [-157.86120519429988, 21.382107348110647],
    [-157.86068298528372, 21.382283576660107],
    [-157.86055357067065, 21.382305282537168],
    [-157.86038361178788, 21.382331229862935],
    [-157.85989621601885, 21.382246613046757],
    [-157.85929950010336, 21.382079946312196],
    [-157.8590587729391, 21.382027719424453],
    [-157.8589733383352, 21.382099409712225],
    [-157.85894252190903, 21.382217544417422],
    [-157.85878323185395, 21.38248476731541],
    [-157.8586177222593, 21.382683290869245],
    [-157.85848886969666, 21.382881160278878],
    [-157.8584750000474, 21.383052709367586],
    [-157.85847112405634, 21.38330382579757],
    [-157.85853761284966, 21.383560840458898],
    [-157.8584780336362, 21.383780862541464],
    [-157.85826929942556, 21.38408027043078],
    [-157.85807291927884, 21.3841548186156],
    [-157.85794659951722, 21.384150345122617],
    [-157.85787085317705, 21.38409201239664],
    [-157.85795020701033, 21.38380979211139],
    [-157.85794657930217, 21.383531522922116],
    [-157.85786889328276, 21.38335031579267],
    [-157.8578164072717, 21.383277688056072],
    [-157.85762594438765, 21.383211347020346],
    [-157.85741493287355, 21.383182808249874],
    [-157.85727373281873, 21.38323153300868],
    [-157.85719976530763, 21.383316850396472],
    [-157.85703901196797, 21.38352353517645],
    [-157.85685566474112, 21.38365869793447],
    [-157.85644269618234, 21.383677563809165],
    [-157.85606869131337, 21.383895441231413],
    [-157.85585672403826, 21.383989755093726],
    [-157.85575075242062, 21.384097438272818],
    [-157.85564522529484, 21.38427197621881],
    [-157.85553905059194, 21.384529621599384],
    [-157.85539797702913, 21.38468584812959],
    [-157.8552159304122, 21.38490141958903],
    [-157.8549743860065, 21.3849539744421],
    [-157.85462878711078, 21.384991363347556],
    [-157.85457895875535, 21.38507323163172],
    [-157.85437400958932, 21.385380791517672],
    [-157.8542501675454, 21.385429631242946],
    [-157.85415678051075, 21.385531076441612],
    [-157.85410960506243, 21.38564367794993],
    [-157.8540108046126, 21.385697206401314],
    [-157.8538538594639, 21.385785569725297],
    [-157.85362083762345, 21.38573429093371],
    [-157.85339626405772, 21.385589117017602],
    [-157.8532604039387, 21.385447259471526],
    [-157.85308671626206, 21.385456009306044],
    [-157.8530227080724, 21.385500741148178],
    [-157.8529748489506, 21.385577202036124],
    [-157.85299258983446, 21.38577606820961],
    [-157.85311620083056, 21.386128332053165],
    [-157.8530916796586, 21.386304324504994],
    [-157.8529748482914, 21.386443551052675],
    [-157.85265116958743, 21.386514511937172],
    [-157.8521406559398, 21.386795585994467],
    [-157.8518993800626, 21.387060434606973],
    [-157.8517291335389, 21.3871225055833],
    [-157.8507991344587, 21.38726700244144],
    [-157.85072831458115, 21.387442678098296],
    [-157.85052755560258, 21.387459369292664],
    [-157.85029340311596, 21.387552620325813],
    [-157.85009297305692, 21.38765061915732],
    [-157.84995765953306, 21.38768582699655],
    [-157.8498526666807, 21.387790803584252],
    [-157.8496599561144, 21.388011714783573],
    [-157.84957234754086, 21.38799033596907],
    [-157.8494425060964, 21.387942469138768],
    [-157.84942981526615, 21.38783849237353],
    [-157.84947422861913, 21.38770961333187],
    [-157.84946788195307, 21.387534312365762],
    [-157.84938276884276, 21.387440679474597],
    [-157.8493587690506, 21.387426060617027],
    [-157.849025172303, 21.387284650854237],
    [-157.84881768307238, 21.387298583653212],
    [-157.84866428738434, 21.38742581199182],
    [-157.84850950272693, 21.387607233959002],
    [-157.84825750491558, 21.387638929157518],
    [-157.8480428931516, 21.38757692833747],
    [-157.84793437704843, 21.38751565600051],
    [-157.84777056643856, 21.387494656242],
    [-157.84760430327876, 21.387540490216583],
    [-157.84742274437266, 21.387691914449814],
    [-157.84720607842732, 21.387769020249902],
    [-157.8470527215992, 21.387767966172568],
    [-157.8469453614654, 21.38768230967093],
    [-157.8468295696098, 21.3875649765483],
    [-157.84668613184016, 21.38740589830876],
    [-157.84645646436027, 21.387295912400166],
    [-157.84629044192135, 21.387311031525382],
    [-157.846191154913, 21.387303121470552],
    [-157.84607775451553, 21.387372805637742],
    [-157.8460036874159, 21.387469861078507],
    [-157.84581774458792, 21.387688104966255],
    [-157.84554903013358, 21.38788319424212],
    [-157.84508212316362, 21.38813654117565],
    [-157.84485459046616, 21.38824609099165],
    [-157.84443492884986, 21.388378707466956],
    [-157.8442142605038, 21.3884738494706],
    [-157.8436698350825, 21.388526107005724],
    [-157.84291598811092, 21.388592275733753],
    [-157.84226062202143, 21.388646472529487],
    [-157.84186364314698, 21.3884702824728],
    [-157.84172423619955, 21.38841240644088],
    [-157.84158804424496, 21.387946222517257],
    [-157.84148092304613, 21.387830752516145],
    [-157.84139355785115, 21.38777865600242],
    [-157.84130101541407, 21.387771693025016],
    [-157.8412089313879, 21.387828873631378],
    [-157.84090894180747, 21.38807523129005],
    [-157.84072741127628, 21.388222132139315],
    [-157.8405011532697, 21.388291935713564],
    [-157.84017822367878, 21.388389074600234],
    [-157.84000018501942, 21.388215297448298],
    [-157.8398774792559, 21.38799673261933],
    [-157.83980411639985, 21.387881495088404],
    [-157.83965021568102, 21.387827130671347],
    [-157.83946468570463, 21.38774725245395],
    [-157.839181555008, 21.387690187547665],
    [-157.83901190893198, 21.38767546258983],
    [-157.8389154751798, 21.387794944550592],
    [-157.83886566484196, 21.387873194347275],
    [-157.8385364828565, 21.387907050654047],
    [-157.83827317195232, 21.38790522711282],
    [-157.83811395994903, 21.38815707150868],
];
