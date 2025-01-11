/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  StandaloneSearchBox,
} from "@react-google-maps/api";

interface MyComponentProps {
  setZoneAddress: (path: any[]) => void;
  currentData?: { path: { coordinates: [number, number][] } }; // Updated structure
}

const ZoonMapComponent: React.FC<MyComponentProps> = ({
  setZoneAddress,
  currentData,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [shapes, setShapes] = useState<google.maps.Polygon[]>([]);
  const [zoneCenter, setZoneCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (map && currentData?.path?.coordinates[0].length) {
      const polygonCoords = currentData.path.coordinates[0].map(
        (coord: any) => ({ lat: coord[1], lng: coord[0] })
      );

      const polygon = new google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        editable: true,
        draggable: true,
      });
      polygon.setMap(map);
      setShapes([polygon]);

      const bounds = new google.maps.LatLngBounds();
      polygonCoords.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds);
    }
  }, [map, currentData]);

  const handleLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
  }, []);

  const handlePolygonComplete = useCallback(
    (polygon: google.maps.Polygon) => {
      const path = polygon
        .getPath()
        .getArray()
        .map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
      setZoneCenter(path.length > 0 ? path[0] : null);

      const path2 = polygon
        .getPath()
        .getArray()
        .map((latLng) => [latLng.lng(), latLng.lat()]);

      setZoneAddress(path2);

      polygon.setMap(mapRef.current);
      setShapes((prevShapes) => [...prevShapes, polygon]);

      const bounds = new google.maps.LatLngBounds();
      path.forEach((coord) =>
        bounds.extend(new google.maps.LatLng(coord.lat, coord.lng))
      );
      mapRef.current?.fitBounds(bounds);
    },
    [setZoneAddress]
  );

  const handlePlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      if (place.geometry?.location) {
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(place.geometry.location);
        mapRef.current?.fitBounds(bounds);
      }
    }
  }, []);

  const handleReset = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      shapes.forEach((shape) => shape.setMap(null));
      setShapes([]);
      if (mapRef.current) {
        mapRef.current.setZoom(11);
        mapRef.current.setCenter({
          lat: 21.556159380959894,
          lng: 39.16683206580821,
        });
      }
      setZoneCenter(null);
    },
    [shapes]
  );

  return (
    <div className="p-5">
      <LoadScript
        googleMapsApiKey="AIzaSyASdpNTLU5ZEqnl9eG0yP3n8GHmXGR0igM"
        libraries={["drawing", "places"]}
      >
        <GoogleMap
          mapContainerStyle={{ height: "600px", width: "100%" }}
          center={
            zoneCenter
              ? zoneCenter
              : { lat: 21.556159380959894, lng: 39.16683206580821 }
          }
          zoom={11}
          onLoad={handleLoad}
        >
          {map && (
            <DrawingManager
              onPolygonComplete={handlePolygonComplete}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                },
                polygonOptions: {
                  editable: true,
                  draggable: true,
                },
              }}
            />
          )}

          <StandaloneSearchBox
            onLoad={(ref: google.maps.places.SearchBox) => {
              searchBoxRef.current = ref;
            }}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              id="pac-input"
              className="controls"
              type="text"
              placeholder="Enter an address"
              style={{
                boxSizing: "border-box",
                border: "1px solid transparent",
                width: "240px",
                height: "32px",
                marginTop: "10px",
                padding: "0 12px",
                borderRadius: "3px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                fontSize: "14px",
                outline: "none",
                textOverflow: "ellipsis",
                position: "absolute",
                top: "0px",
                left: "75%",
                transform: "translateX(-50%)",
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
      <button
        onClick={handleReset}
        className="btn btnRed mt-3"
        style={{
          cursor: "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default ZoonMapComponent;
