import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

//styles
import './index.css';
import mapStyles from './mapStyles';

//maps
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';

//icons
import initium from "assets/icons/initium.svg"
import finis from "assets/icons/finis.svg"
import port from "assets/icons/home-port.svg";

const libraries = ["places", "geometry"];

const mapContainerStyle = {
    width: '100%',
    height: '100%'
}

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true
}

const infoWindowStyle = {
    padding: "10px",
};

export default function Map({ trip_events, origin }: { trip_events: any, origin: string }) {
    const { isLoaded, loadError } = useLoadScript({
        //@ts-ignore
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES,
        //@ts-ignore
        libraries: libraries
    });

    const [selected, setSelected] = useState<any>(null);

    interface Coordinate {
        lat: number;
        lng: number;
        url?: any;
    };

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        setInterval(() => {
            setZoom(12)
        }, 1500)
    }, [])

    const [markerPos, setMarkerPos] = useState<Coordinate[]>([]);

    const [markerEvents, setMarkerEvents] = useState<any>([]);

    // const [path, setPath] = useState<Array<{ lat: number; lng: number }>>([]);
    const [path, setPath] = useState<any>([]);

    const [center, setCenter] = useState<any>({});

    const [zoom, setZoom] = useState(8);


    // useEffect(() => {
    //     // Wait for the map to load (idle state) and then change the zoom level
    //     const listener = window.google.maps.event.addListenerOnce(mapRef, 'idle', () => {
    //     setZoom(7); // Change the zoom level to 7
    //     });

    //     return () => {
    //     window.google.maps.event.removeListener(listener);
    //     };
    // }, []);

    useEffect(() => {
        setPath([...(trip_events || [])]?.filter((item) => typeof item?.latitude === 'number' && typeof item?.longitude === 'number' ).map(i => ({ lat: i.latitude, lng: i.longitude}) ))
    }, [trip_events]);


    useEffect(() => {
        if (path?.length > 0) {
            const firstPos = { ...path[0], url: '/initium.svg' };
            const lastPos = { ...path[path.length - 1], url: '/finis.svg' };

            setMarkerEvents([...(trip_events || [])]?.filter((item) => item?.event_status === 'warning' || item?.event_status === 'escalation' ).map(i => ({ lat: i.latitude, lng: i.longitude, url: i.event_status === 'warning' ? '/yellow-truck.svg' : 'red-truck.svg'}) ))

            // setMarkerPos([firstPos, lastPos]);
            setMarkerPos([firstPos]);
            setCenter({
                lat: path[0]["lat"],
                lng: path[0]["lng"]
            })
        }
    }, [path])

    // console.log("center>>>", center)
    // console.log("markerPos>>>", markerPos)
    // console.log('selected>>>', selected)
    // console.log("pol", path)
    // console.log("first")
    // console.log('tryEvents>>>', markerEvents)

    if (loadError) return <><p className='p-6 blac-text-3 font-light'>Error loading maps</p></>;
    if (!isLoaded) return <><p className='p-6 blac-text-3 font-light'>Loading Maps...</p></>;

    return (
        <div className='w-full h-full relative'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
                {markerPos.map((marker, idx) =>
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
                        }}
                        animation={window.google.maps.Animation.DROP}
                    />
                )}

                {selected ? (
                    <InfoWindow              
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => setSelected(null)}
                    >
                        <div className='pl-3 pr-2 py-4 flex gap-x-5'>
                            <div><img src={port} alt="" /></div>
                            <div>
                                <p className='text-[#232323] text-[14px] mb-1'>{origin}</p>
                                {/* <p className='text-[#B0B0B0] font-light'>Rd. Santa Ana, Illinois 85486 </p> */}
                                <p className='green-text font-medium'>{selected.lat + ',' + ' ' + selected.lng}</p>
                            </div>
                        </div>
                    </InfoWindow>) : null}

                {path?.length > 0 && <Polyline path={path} options={{ strokeColor: "#007003" }} />}

                {markerEvents?.map((coords, index) => (
                    <Marker
                        key={index}
                        icon={{
                            url: coords.url,
                            scaledSize: new window.google.maps.Size(50, 50),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(25, 25),
                        }}
                        position={coords}
                        // onClick={() => {
                        //     setSelected(coords)
                        // }}
                    />
                ))}

                {path?.slice(-1)?.map((coords, index) => (
                    <Marker
                        key={index}
                        icon={{
                            url: '/truck.svg',
                            scaledSize: new window.google.maps.Size(50, 50),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(25, 25),
                        }}
                        position={coords}
                    />
                ))}
            </GoogleMap>
        </div>
    )
}