import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLatLike, Marker } from 'mapbox-gl';
import './map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import {
  selectSelectedIcon,
  selectIcons,
  actions,
} from 'redux/annotations_reducer';

const Map = () => {
  const dispatch = useAppDispatch();
  const [markers, setMakers] = useState<Marker[]>([]);
  const mapContainerRef = useRef(null);
  const mapIconRef = useRef<mapboxgl.Map | null>(null);

  const icons = useAppSelector(selectIcons);

  useEffect(() => {
    if (process.env.REACT_APP_MAPBOXGL_API_KEY === undefined) {
      throw new Error('REACT_APP_MAPBOXGL_API_KEY is undefined');
    }
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_API_KEY;

    if (mapContainerRef.current) {
      // Coordinates of the corners of the image
      const imageCorners: LngLatLike[] = [
        [-123.10006191, 44.55455659],
        [-123.09966229, 44.55455659],
        [-123.09966229, 44.55391499],
        [-123.10006191, 44.55391499],
      ];

      const bounds = imageCorners.reduce(
        (bounds, coord) => bounds.extend(coord),
        new mapboxgl.LngLatBounds([imageCorners[0], imageCorners[0]])
      );

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        bounds: bounds,
        fitBoundsOptions: { padding: 20 }, // padding around the bounding box
      });

      mapIconRef.current = map;

      map.on('load', function () {
        // Add image of building and place on map
        map.addSource('building-image', {
          type: 'image',
          url: '/downstairs-map.png',
          coordinates: imageCorners as number[][],
        });
        map.addLayer({
          id: 'building-image',
          type: 'raster',
          source: 'building-image',
          paint: { 'raster-opacity': 0.85 }, // adjust transparency as needed
        });
      });
      map.on('click', function (evt) {
        const lngLat = evt.lngLat;
        dispatch(
          actions.addIcon({
            lat: lngLat.lat,
            lng: lngLat.lng,
          })
        );
      });
    }
  }, [mapContainerRef.current]);

  useEffect(() => {
    if (mapIconRef.current) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].remove();
      }
      setMakers([]);
      const newMarkers = [];
      for (let i = 0; i < icons.length; i++) {
        const customIconEl = document.createElement('div');
        customIconEl.innerHTML = `<img src="${icons[i].path}" width="25" height="25" />`;
        const marker = new mapboxgl.Marker(customIconEl)
          .setLngLat({ lng: icons[i].lng, lat: icons[i].lat })
          .addTo(mapIconRef.current);
        newMarkers.push(marker);
      }
      setMakers(newMarkers);
    }
  }, [icons]);

  return <div id="map" ref={mapContainerRef} />;
};

export default Map;
