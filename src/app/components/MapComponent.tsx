import React, {
  useEffect,
  useState,
} from 'react';

interface MapComponentProps {
  onLatLngChange: (latitude: number, longitude: number) => void;
  latitude?:any;
  longitude?:any;
  setLongitude? : any;
  setLatitude? : any;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLatLngChange,latitude,longitude , setLatitude ,setLongitude }) => {
  // const [latitude, setLatitude] = useState<number | null>(lat);
  // const [longitude, setLongitude] = useState<number | null>(lng);
  const [searchInput, setSearchInput] = useState<string>("");

  console.log(latitude);

  
  

  useEffect(() => {
    const scriptId = "google-maps-script";
    const existingScript = document.getElementById(
      scriptId
    ) as HTMLScriptElement;

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyASdpNTLU5ZEqnl9eG0yP3n8GHmXGR0igM&libraries=places`;
      script.async = true;
      script.defer = true;
      const onLoad = () => {
        initializeMap();
      };

      script.addEventListener("load", onLoad);
      window.addEventListener("load", onLoad);

      document.head.appendChild(script);

      return () => {
        script.removeEventListener("load", initializeMap);
        script.remove();
      };
    } else {
      initializeMap();
    }
  }, []);
 

  let marker: google.maps.Marker | null = null; // Declare marker variable outside of the event listeners

  const initializeMap = () => {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 0, lng: 0 },
        zoom: 8,
      }
    );

    const input = document.getElementById("search-input") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("Place not found");
        return;
      }
      const location: any = place.geometry.location;
      console.log(location.lat() , location.lng())
      setLatitude(location.lat());
      setLongitude(location.lng());
      // onLatLngChange(location.lat() , location.lng())
      onLatLngChange(location.lat(), location.lng()); // Send latitude and longitude to parent component
      map.setCenter(location); // Update map's center to the selected location

      // Add a marker at the searched location
      if (marker) {
        marker.setMap(null); // Remove existing marker, if any
      }
      marker = new google.maps.Marker({
        position: location,
        map: map,
        title: place.name,
      });
    });

    map.addListener("click", (event: google.maps.MouseEvent) => {
      if (event.latLng) {
        setLatitude(event.latLng.lat());
        setLongitude(event.latLng.lng());
        onLatLngChange(event.latLng.lat(), event.latLng.lng()); // Send latitude and longitude to parent component

        // Remove existing marker, if any
        if (marker) {
          marker.setMap(null);
        }

        // Add a marker at the clicked location
        marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
        });
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          id="search-input"
          type="text"
          className="form-control"
          placeholder="Search for a location"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div id="map" style={{ height: "350px", marginTop: "10px" }}></div>
      <div>
        <div className="row pt-3">
          <div className="col-6">
            <div className="form-floating mb-7">
              <input
                type="text"
                name="latitude"
                id="latitude"
                className="form-control"
                placeholder="Latitude"
                value={latitude !== null ? latitude : ""}
                disabled
                required
              />
              <label htmlFor="latitude" className="text-muted">
                Latitude
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="form-floating mb-7">
              <input
                type="text"
                name="longitude"
                id="longitude"
                className="form-control"
                placeholder="Longitude"
                value={longitude}
                disabled
                required
              />
              <label htmlFor="longitude" className="text-muted">
                Longitude
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
