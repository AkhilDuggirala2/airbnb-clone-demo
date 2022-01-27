import { useState } from "react";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import { LocationMarkerIcon } from "@heroicons/react/solid";

function Map({ searchResults }) {
 const [ selectedLocation, setSelectedLocation] = useState({});

    // Transform the search results objects into the
    // { latitude: 52.516272, longitude: 13.377722 }
    // object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    // The latitude and longitude of the center of locations coordinates.
    const center = getCenter(coordinates);

    const [ viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return(
        <ReactMapGl
          mapStyle="mapbox://styles/akhilduggirala3/ckywklqg2004r14qliqqjqahj"
          mapboxApiAccessToken={process.env.mapbox_key}
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                      longitude={result.long}
                      latitude={result.lat}
                      offsetLeft={-20}
                      offsetTop={-10}
                    >
                      <p onClick={() => setSelectedLocation(result)}>
                      <LocationMarkerIcon 
                      role="img"
                      className="h-5 text-2xl text-red-500 animate-bounce cursor-pointer"
                      aria-label="push-pin" />
                      </p>
                    </Marker>

                    {/* The popup that should show if we click on a Marker */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                          onClose={() => setSelectedLocation({})}
                          closeOnClick={true}
                          latitude={result.lat}
                          longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}
        </ReactMapGl>
    );
}

export default Map