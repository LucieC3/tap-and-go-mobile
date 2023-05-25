import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios, { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import Station from "../../types/Station";

const StationsListScreen: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const navigation = useNavigation();

  const navigateToStationDetails = (stationId: string) => {
    navigation.navigate("StationDetailsScreen", { stationId });
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response: AxiosResponse<Station[]> = await axios.get(
          "https://api.jcdecaux.com/vls/v1/stations?contract=nantes",
          {
            params: {
              apiKey: "0755767fea34480e5e7bd38aad7b7468972dcc7c",
            },
          }
        );
        setStations(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des stations :", error);
      }
    };

    fetchStations();
  }, []);

  const renderStationItem = ({ item }: { item: Station }) => (
    <TouchableOpacity
      style={styles.stationItemContainer}
      onPress={() => navigateToStationDetails(item.number.toString())}
    >
      <Text style={styles.stationName}>
        {item.name.substr(item.name.lastIndexOf("-") + 1)}
      </Text>
      <Text style={styles.stationAvailability}>
        Vélos disponibles : {item.available_bikes}
      </Text>
      <Text style={styles.stationAvailability}>
        Places restantes : {item.available_bike_stands}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stations}
        renderItem={renderStationItem}
        keyExtractor={(item) => item.number.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  stationItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  stationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stationAvailability: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default StationsListScreen;
