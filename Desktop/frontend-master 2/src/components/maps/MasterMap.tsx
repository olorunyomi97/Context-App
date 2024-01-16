import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

//libraries
import { connect } from "react-redux";

//redux actions
import { getTripEventsById } from "store/actions";

//styles
import './index.css';
import mapStyles from './mapStyles';

//icons
import port from "assets/icons/home-port.svg";

//maps
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline } from '@react-google-maps/api';

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


//64f1925ebb52536c9472d3b5
const MasterMap = (props: any) => {
    const { loading, tracking_error, trip_events, getTripEventsById, originText } = props;

    const { id:mapId } = useParams();

    const { isLoaded, loadError } = useLoadScript({
        //@ts-ignore
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES,
        //@ts-ignore
        libraries: libraries
    });

    const location = useLocation();

    const [path, setPath] = useState<any>([]);

    const [selected, setSelected] = useState<any>(null);

    const [eventList, setEventList] = useState([]);

    const [zoom, setZoom] = useState(3);

    const [center, setCenter] = useState<any>({});

    interface Coordinate {
        lat: number;
        lng: number;
        url?: any;
    };

    // console.log('loco>>>', location.pathname.includes('container'))

    const [markerPos, setMarkerPos] = useState<Coordinate[]>([]);

    const [markerEvents, setMarkerEvents] = useState<any>([]);

    const onMapLoad = useCallback((map) => {
        setTimeout(() => {
            setZoom(6)
        }, 1500)
    }, [])

    useEffect(() => {
        return () => setPath([]);
    }, [])

    // useEffect(() => {
    //     id && getTripEventsById(finalId);
    // }, [id]);
    const fetchMap = useCallback(() => {
        setMarkerEvents([]);
        (props.mapId || mapId) && getTripEventsById(props.mapId || mapId);
    }, [mapId, props.mapId])

    useEffect(() => {
       fetchMap();
    }, [fetchMap]);

    useEffect(() => {
        console.log('setting path')
        setPath([...(trip_events?.event_details || [])]?.filter((item) => typeof item?.latitude === 'number' && typeof item?.longitude === 'number' ).map(i => ({ lat: i.latitude, lng: i.longitude}) ))
    }, [trip_events]);

    const intervalMapRef = useRef<number>();

    useEffect(() => {
        if(!loading){
            intervalMapRef.current = setInterval(() => {
                (props.mapId || mapId) && getTripEventsById(props.mapId || mapId);
                console.log('interval called')
            }, 300000) as any as number
        }

        return () => {
            intervalMapRef.current && clearInterval(intervalMapRef.current);
            console.log('cleaned up')
        }
    }, [loading])

    useEffect(() => {
        if (path?.length > 0) {
            const firstPos = { ...path[0], url: '/initium.svg' };
            const lastPos = { ...path[path.length - 1], url: '/initium.svg' };

            console.log("markPos>>", lastPos)

            setMarkerEvents([...(trip_events?.event_details || [])]?.filter((item) => item?.event_status === 'warning' || item?.event_status === 'escalation' ).slice(0, -1).map(i => ({ lat: i.latitude, lng: i.longitude, url: i.event_status === 'warning' ? '/yellow-truck.svg' : '/red-truck.svg'}) ))

            // setMarkerPos([firstPos, lastPos]);
            setMarkerPos([firstPos]);
            setCenter({
                lat: path[Math.floor(path?.length / 2)]["lat"],
                lng: path[Math.floor(path?.length / 2)]["lng"]
            })
        }
    }, [path])

    console.log('markerEvents>>>', markerEvents)
    // console.log("trippy>>>", trip_events)
    // console.log('patty>>', path)

    if (loadError) return <><p>Error loading maps</p></>;
    if (!isLoaded) return <><p className='p-6 blac-text-3 font-light'>Loading Maps...</p></>;

    return (
    <>
    {loading ? <p className='p-6 font-light text-sm'>Loading...</p> : path?.length > 0 ?
        <div className={`${location.pathname.includes('container') || props.mapId ? 'w-full h-full' : 'w-screen h-screen'} bg-gray-200 ${loading ? 'animate-pulse' : ''} relative`}>
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
                                <p className='text-[#232323] text-[14px] mb-1'>{originText ? originText : "Origin"}</p>
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
        </div> :
        <p className='p-6 black-text-3 font-light'>No Map Detail</p> 
    }
    </>
    )
};

const mapStateToProps = (state) => {

    const { loading, error: tracking_error, trip_events } = state.tracking;

    return { loading, tracking_error, trip_events };
};

export default connect(mapStateToProps, { getTripEventsById })(MasterMap);

{/* <MarkerClusterer>
{(cluster) => (
    <>
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
    </>
)}
</MarkerClusterer> */}