import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';


interface Station {
  number: number;
  position: {
    lat: number;
    lng: number;
  };
  name: string;
  available_bikes: number;
  available_bike_stands: number;
}

// Nantes GPS coordinates
const center = {
    latitude: 47.218371, 
    longitude: -1.553621, 
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

const MapScreen: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const fetchStations = async () => {
      const response = await axios.get<Station[]>(
        `https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=0755767fea34480e5e7bd38aad7b7468972dcc7c`
      );
      setStations(response.data);
    };

    fetchStations();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={center}
      >
        {stations.map((station) => (
          <Marker
            key={station.number}
            coordinate={{
              latitude: station.position.lat,
              longitude: station.position.lng,
            }}
            title={station.name}
            description={`Vélos disponibles : ${station.available_bikes}, Places restantes : ${station.available_bike_stands}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;

