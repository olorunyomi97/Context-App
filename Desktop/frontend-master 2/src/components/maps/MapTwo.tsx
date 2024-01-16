import { useState, useEffect, useRef, useCallback } from 'react';

//styles
import './index.css';
import mapStyles from './mapStyles';

//maps
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';

//icons
import initium from "assets/icons/initium.svg"
import finis from "assets/icons/finis.svg"
import port from "assets/icons/home-port.svg";

// import axios from 'axios';

// async function getRouteCoordinates() {
//   const apiKey = process.env.REACT_APP_GOOGLE_PLACES;
//   const origin = 'Austin Obiador, Lagos, Nigeria';
//   const destination = 'Clinix Festac, Lagos, Nigeria';

//   const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
//     params: {
//       origin,
//       destination,
//       key: apiKey,
//     },
//   });

//   const route = response.data.routes[0];
//   const steps = route.legs[0].steps;

//   const coordinates = steps.map(step => ({
//     lat: step.end_location.lat,
//     lng: step.end_location.lng,
//   }));

//   return coordinates;
// }

// getRouteCoordinates()
//   .then(coordinates => {
//     console.log("coco>>", coordinates);
//   })
//   .catch(error => {
//     console.error('Error fetching route:', error);
//   });


const libraries = ["places"];

const mapContainerStyle = {
    width: '100%',
    height: '100%'
}
//center
// lat: 6.4550575,
// lng: 3.3941795

const center = {
    lat: 6.453056,
    lng: 3.3941795
}

//6.466990
//3.287720
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true
}

const infoWindowStyle = {
    padding: "10px",
};

// const path = [
//     { lat: 6.447249, lng: 3.320473 },
//     { lat: 6.447139, lng: 3.317246 },
//     { lat: 6.447100, lng: 3.314467 },
//     { lat: 6.447100, lng: 3.311241 },
//     { lat: 6.515767, lng: 3.311241 }, // Festac, Lagos
// ];

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        //@ts-ignore
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES,
        //@ts-ignore
        libraries: libraries
    });

    // const paths = [
    //     { lat: 6.453056, lng: 3.364058 }, // Apapa, Lagos
    //     { lat: 6.451541, lng: 3.361362 },
    //     { lat: 6.450612, lng: 3.358886 },
    //     { lat: 6.449856, lng: 3.355926 },
    //     { lat: 6.449409, lng: 3.353774 },
    //     { lat: 6.449177, lng: 3.352075 },
    //     { lat: 6.448991, lng: 3.350067 },
    //     { lat: 6.448888, lng: 3.347823 },
    //     { lat: 6.448821, lng: 3.345366 },
    //     { lat: 6.448769, lng: 3.342944 },
    //     { lat: 6.448699, lng: 3.340364 },
    //     { lat: 6.448577, lng: 3.337613 },
    //     { lat: 6.448366, lng: 3.334906 },
    //     { lat: 6.448077, lng: 3.332182 },
    //     { lat: 6.447764, lng: 3.329280 },
    //     { lat: 6.447527, lng: 3.326312 },
    //     { lat: 6.447365, lng: 3.323369 },
    //     { lat: 6.447249, lng: 3.320473 },
    // ];
    // lat: 6.447810,
    //lng: 3.362530,
    // lat: 6.021920,
    // lng: 6.915500,
    const [markers, setMarkers] = useState<any>([
        {
            lat: 6.453056,
            lng: 3.364098,
            url: '/initium.svg'
        },
        {
            lat: 6.447249,
            lng: 3.320473,
            url: '/finis.svg'
        },
    ]);
    const [selected, setSelected] = useState(null);
    const [progress, setProgress] = useState<any>([]);


    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const [path, setPath] = useState<Array<{ lat: number; lng: number }>>([]);
    const [positionIndex, setPositionIndex] = useState(0);

    const [animationIndex, setAnimationIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setPath([
            {"lat": 11.985521, "lng": 8.533176},
            {"lat": 11.9839, "lng": 8.534449},
            {"lat": 11.9839, "lng": 8.534449},
            {"lat": 11.9839, "lng": 8.534449},
            {"lat": 11.94617, "lng": 8.579323},
            {"lat": 11.94032, "lng": 8.582836},
            {"lat": 11.94617, "lng": 8.579323},
            {"lat": 11.94617, "lng": 8.579323},
            {"lat": 11.94617, "lng": 8.579323},
            {"lat": 11.953596, "lng":8.585813},
            {"lat": 11.953596, "lng": 8.585813},
            {"lat": 11.946102, "lng": 8.578866},
            {"lat": 11.946102, "lng": 8.578866},
            {"lat": 11.91639, "lng": 8.543691},
            {"lat": 11.905396, "lng": 8.546911},
            {"lat": 11.905396, "lng": 8.546911},
            {"lat": 11.758089, "lng": 8.425418},
            {"lat": 11.507168, "lng": 8.229281},
            {"lat": 11.33838, "lng": 7.906827},
            {"lat": 11.07828, "lng": 7.689368},
            {"lat": 10.735143, "lng": 7.51468},
            {"lat": 10.707277, "lng": 7.512519},
            {"lat": 10.707277, "lng": 7.512519},
            {"lat": 10.543103, "lng": 7.411171},
            {"lat": 10.425671, "lng": 7.396637},
            {"lat": 10.343523, "lng": 7.39372},
            {"lat": 10.341111, "lng": 7.39231},
            {"lat": 10.343523, "lng": 7.39372},
            {"lat": 10.024742, "lng": 7.395878},
            {"lat": 9.736985, "lng": 7.452955},
            {"lat": 9.564746, "lng": 7.433388},
            {"lat": 9.327949, "lng": 7.25328},
            {"lat": 9.33093, "lng": 7.258246},
            {"lat": 9.327949, "lng": 7.25328},
            {"lat": 9.327949, "lng": 7.25328},
            {"lat": 9.069319, "lng": 7.206498},
            {"lat": 8.74781, "lng": 6.963528},
            {"lat": 8.487089, "lng": 6.94005},
            {"lat": 8.285312, "lng": 6.845977},
            {"lat": 7.844823, "lng": 6.734474},
            {"lat": 7.822343, "lng": 6.606089},
            {"lat": 7.851901, "lng": 6.550349},
            {"lat": 7.822343, "lng": 6.606089},
            {"lat": 7.675294, "lng": 6.410931},
            {"lat": 7.656463, "lng": 6.366993},
            {"lat": 7.656463, "lng": 6.366993},
            {"lat": 7.517305, "lng": 6.262084},
            {"lat": 7.326186, "lng": 6.374479},
            {"lat": 7.135491, "lng": 6.30341},
            {"lat": 7.002101, "lng": 6.277058},
            {"lat": 6.931462, "lng": 6.270304},
            {"lat": 6.931462, "lng": 6.270304},
            {"lat": 6.854123, "lng": 6.259624},
            {"lat": 6.747637, "lng": 6.212742},
            {"lat": 6.76163, "lng": 6.233307},
            {"lat": 6.76163, "lng": 6.233307},
            {"lat": 6.736239, "lng": 6.126306},
            {"lat": 6.741231, "lng": 6.094835},
            {"lat": 6.741732, "lng": 6.101303},
            {"lat": 6.741231, "lng": 6.094835},
            {"lat": 6.690052, "lng": 6.000708},
            {"lat": 6.514288, "lng": 5.858093},
            {"lat": 6.02024, "lng": 5.67671},
            {"lat": 6.061073, "lng": 5.663215},
            {"lat": 6.061073, "lng": 5.663215},
            {"lat": 5.936747, "lng": 5.68714},
            {"lat": 5.926945, "lng": 5.696516},
            {"lat": 5.936747, "lng": 5.68714},
            {"lat": 5.936747, "lng": 5.68714},
            {"lat": 5.67046, "lng": 5.759959},
            {"lat": 5.539022, "lng": 5.923757},
            {"lat": 5.322973, "lng": 6.063061},
            {"lat": 5.29194, "lng": 6.073364},
            {"lat": 5.29194, "lng": 6.073364},
            {"lat": 5.203509, "lng": 6.209132},
            {"lat": 5.097507, "lng":6.392468},
            {"lat": 5.072418, "lng":6.429651},
            {"lat": 5.072418, "lng":6.429651},
            {"lat": 5.072418, "lng":6.429651},
            {"lat": 5.05975, "lng":6.451297},
            {"lat": 5.064839, "lng":6.61474},
            {"lat": 5.000893, "lng":6.74689},
            {"lat": 4.89383, "lng":6.893189},
            {"lat": 4.888855, "lng":6.885085},
            {"lat": 4.89383, "lng":6.893189},
            {"lat": 4.773594, "lng":7.133237},
            {"lat": 4.772913, "lng":7.1347},
            {"lat": 4.772913, "lng":7.1347},
            {"lat": 4.763907, "lng":7.147144},
            {"lat": 4.755547, "lng":7.158106},
            {"lat": 4.763907, "lng":7.147144},
            {"lat": 4.763837, "lng":7.146935},
            {"lat": 4.772211, "lng":7.137049},
            {"lat": 4.772211, "lng":7.137049},
            {"lat": 4.818829, "lng":7.121428},
            {"lat": 4.801102, "lng":7.130637},
            {"lat": 4.801102, "lng":7.130637}
        ])
    }, []);

    useEffect(() => {
        if (isAnimating) {
            if (animationIndex < path.length - 1) {
                const interval = setInterval(() => {
                    setAnimationIndex((prevIndex) => prevIndex + 1);
                }, 2000); // Adjust the interval (in milliseconds) as needed

                return () => {
                    clearInterval(interval);
                };
            } else {
                setIsAnimating(false); // Animation ends when last point is reached
            }
        }
    }, [animationIndex, isAnimating]);

    const startAnimation = () => {
        setAnimationIndex(0);
        setIsAnimating(true);
    };

    if (loadError) return <><p>Error loading maps</p></>;
    if (!isLoaded) return <><p>Loading Maps</p></>;

    // console.log(markers.map(item => console.log(item.url)))    

    return (
        <div className='w-full h-full relative'>
            {/* <button onClick={startAnimation}>Start Animation</button> */}
            <button className='mapbutton' onClick={startAnimation} disabled={isAnimating}>
                Start Animation
            </button>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {markers.map((marker, idx) =>
                    <Marker
                        key={idx}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: marker.url,
                            scaledSize: new window.google.maps.Size(50, 50),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(25, 25),
                        }}
                        onClick={() => {
                            setSelected(marker)
                            console.log("ki>>>", marker.url)
                        }}
                    // animation={window.google.maps.Animation.BOUNCE}
                    />
                )}

                {selected ? (
                    <InfoWindow
                        //@ts-ignore
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div className='pl-3 pr-2 py-4 flex gap-x-5'>
                            <div><img src={port} alt="" /></div>
                            <div>
                                <p className='text-[#232323] text-[17px] mb-1'>Apapa Nigeria</p>
                                <p className='text-[#B0B0B0] font-light'>Rd. Santa Ana, Illinois 85486 </p>
                            </div>
                        </div>
                    </InfoWindow>) : null}

                <Polyline path={path} options={{ strokeColor: "#007003" }} />

                {path.map((coords, index) => (
                    <Marker
                        key={index}
                        icon={{
                            url: '/truck.svg',
                            scaledSize: new window.google.maps.Size(50, 50),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(25, 25),
                        }}
                        position={coords}
                        visible={animationIndex === index}
                        animation={animationIndex === index ? window.google.maps.Animation.BOUNCE : undefined}
                    // onAnimationChanged={onAnimationComplete}
                    />
                ))}

            </GoogleMap>
        </div>
    )
}