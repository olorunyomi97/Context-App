// import { useState, useEffect, useRef, useCallback } from 'react';

// //styles
// import './index.css';
// import mapStyles from './mapStyles';

// //maps
// import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';

// //icons
// import initium from "assets/icons/initium.svg"
// import finis from "assets/icons/finis.svg"
// import port from "assets/icons/home-port.svg";

// const libraries = ["places"];

// const mapContainerStyle = {
//     width: '100%',
//     height: '100%'
// }

// const center = {
//     lat: 6.4550575,
//     lng: 3.3941795
// }

// //6.466990
// //3.287720
// const options = {
//     styles: mapStyles,
//     disableDefaultUI: true,
//     zoomControl: true,
//     fullscreenControl: true
// }

// const infoWindowStyle = {
//     padding: "10px",
// };

// // const path = [
// //     { lat: 6.447249, lng: 3.320473 },
// //     { lat: 6.447139, lng: 3.317246 },
// //     { lat: 6.447100, lng: 3.314467 },
// //     { lat: 6.447100, lng: 3.311241 },
// //     { lat: 6.515767, lng: 3.311241 }, // Festac, Lagos
// // ];

// export default function Map() {
//     const { isLoaded, loadError } = useLoadScript({
//         //@ts-ignore
//         googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES,
//         //@ts-ignore
//         libraries: libraries
//     });

//     const paths = [
//         { lat: 6.453056, lng: 3.364058 }, // Apapa, Lagos
//         { lat: 6.451541, lng: 3.361362 },
//         { lat: 6.450612, lng: 3.358886 },
//         { lat: 6.449856, lng: 3.355926 },
//         { lat: 6.449409, lng: 3.353774 },
//         { lat: 6.449177, lng: 3.352075 },
//         { lat: 6.448991, lng: 3.350067 },
//         { lat: 6.448888, lng: 3.347823 },
//         { lat: 6.448821, lng: 3.345366 },
//         { lat: 6.448769, lng: 3.342944 },
//         { lat: 6.448699, lng: 3.340364 },
//         { lat: 6.448577, lng: 3.337613 },
//         { lat: 6.448366, lng: 3.334906 },
//         { lat: 6.448077, lng: 3.332182 },
//         { lat: 6.447764, lng: 3.329280 },
//         { lat: 6.447527, lng: 3.326312 },
//         { lat: 6.447365, lng: 3.323369 },
//         { lat: 6.447249, lng: 3.320473 },
//     ];

//     const [markers, setMarkers] = useState<any>([
//         {
//             lat: 6.447810,
//             lng: 3.362530,
//             url: '/initium.svg'
//         },
//         {
//             lat: 6.021920,
//             lng: 6.915500,
//             url: '/finis.svg'
//         },
//     ]);
//     const [selected, setSelected] = useState(null);
//     const [progress, setProgress] = useState<any>([]);


//     const mapRef = useRef();
//     const onMapLoad = useCallback((map) => {
//         mapRef.current = map;
//     }, [])

//     const [path, setPath] = useState<Array<{ lat: number; lng: number }>>([]);
//     const [positionIndex, setPositionIndex] = useState(0);

//     useEffect(() => {
//         setPath([
//             { lat: 6.453056, lng: 3.364058 }, // Apapa, Lagos
//             { lat: 6.451541, lng: 3.361362 },
//             { lat: 6.450612, lng: 3.358886 },
//             { lat: 6.449856, lng: 3.355926 },
//             { lat: 6.449409, lng: 3.353774 },
//             { lat: 6.449177, lng: 3.352075 },
//             { lat: 6.448991, lng: 3.350067 },
//             { lat: 6.448888, lng: 3.347823 },
//             { lat: 6.448821, lng: 3.345366 },
//             { lat: 6.448769, lng: 3.342944 },
//             { lat: 6.448699, lng: 3.340364 },
//             { lat: 6.448577, lng: 3.337613 },
//             { lat: 6.448366, lng: 3.334906 },
//             { lat: 6.448077, lng: 3.332182 },
//             { lat: 6.447764, lng: 3.329280 },
//             { lat: 6.447527, lng: 3.326312 },
//             { lat: 6.447365, lng: 3.323369 },
//             { lat: 6.447249, lng: 3.320473 },
//         ])
//     }, []);

//     const animateMarkers = (index: number) => {
//         if (index < path.length) {
//             setPositionIndex(index);
//             setTimeout(() => {
//                 animateMarkers(index + 1);
//             }, 1000); // Adjust the delay (in milliseconds) as needed
//         }
//     };

//     const startAnimation = () => {
//         setPositionIndex(0);
//         animateMarkers(0);
//     };

//     const onAnimationComplete = () => {
//         setPositionIndex((prevIndex) => prevIndex + 0.5);
//     };

//     if (loadError) return <><p>Error loading maps</p></>;
//     if (!isLoaded) return <><p>Loading Maps</p></>;

//     // console.log(markers.map(item => console.log(item.url)))    

//     return (
//         <>
//             <button onClick={startAnimation}>Start Animation</button>
//             <GoogleMap
//                 mapContainerStyle={mapContainerStyle}
//                 zoom={7}
//                 center={center}
//                 options={options}
//                 onLoad={onMapLoad}
//             >
//                 {markers.map((marker, idx) =>
//                     <Marker
//                         key={idx}
//                         position={{ lat: marker.lat, lng: marker.lng }}
//                         icon={{
//                             url: marker.url,
//                             scaledSize: new window.google.maps.Size(50, 50),
//                             origin: new window.google.maps.Point(0, 0),
//                             anchor: new window.google.maps.Point(25, 25),
//                         }}
//                         onClick={() => {
//                             setSelected(marker)
//                             console.log("ki>>>", marker.url)
//                         }}
//                     // animation={window.google.maps.Animation.BOUNCE}
//                     />
//                 )}

//                 {selected ? (
//                     <InfoWindow
//                         //@ts-ignore
//                         position={{ lat: selected.lat, lng: selected.lng }}
//                         onCloseClick={() => setSelected(null)}
//                     >
//                         <div className='pl-3 pr-2 py-4 flex gap-x-5'>
//                             <div><img src={port} alt="" /></div>
//                             <div>
//                                 <p className='text-[#232323] text-[17px] mb-1'>Apapa Nigeria</p>
//                                 <p className='text-[#B0B0B0] font-light'>Rd. Santa Ana, Illinois 85486 </p>
//                             </div>
//                         </div>
//                     </InfoWindow>) : null}

//                 <Polyline path={paths} options={{ strokeColor: "#FF0000" }} />

//                 {path.map((coords, index) => (
//                     <Marker
//                         key={index}
//                         position={coords}
//                         animation={positionIndex === index ? window.google.maps.Animation.BOUNCE : undefined}
//                         onAnimationChanged={onAnimationComplete}
//                     />
//                 ))}

//             </GoogleMap>
//         </>
//     )
// }