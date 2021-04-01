import React, { useEffect, useState, useRef } from 'react'
import api from '../../services/ipgeolocation'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'



const IpInfoMapBox = ({ location }) => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN;
    const [data, setData] = useState(null)
    const [status, setStatus] = useState("pending") // resolved(ok)|rejected(BAD)|pending(default)
    useEffect(() => {
        if (location) {

            api.fetchByIP(location)
                .then(setData)
                .then(() => setStatus("resolved"))
                .catch(() => setStatus("rejected"))
        }

    }, [location])

    // initialize map when component mounts
    useEffect(() => {
        if (data) {
            let map = new mapboxgl.Map({
                container: "mapContainer",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [data.geo.longitude, data.geo.latitude],
                zoom: 9,
            });
            let marker = new mapboxgl.Marker()
                .setLngLat([data.geo.longitude, data.geo.latitude])
                .addTo(map);
            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, "top-right");


        }

    }, [data]);

    return (


        <div className="map-container">
            <p>Last Location: {location}</p>
            <div id="mapContainer" className="map"></div>
        </div>


    )
}

export default IpInfoMapBox
