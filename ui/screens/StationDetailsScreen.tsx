import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

type RootStackParamList = {
  StationDetailsScreen: { number: string };
};

type StationDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "StationDetailsScreen"
>;

const StationDetailsScreen: React.FC = () => {
  const [station, setStation] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const route = useRoute<StationDetailsScreenRouteProp>();
  const { stationId } = route.params;

  useEffect(() => {
    axios
      .get(
        `https://api.jcdecaux.com/vls/v3/stations/${stationId}?contract=nantes&apiKey=0755767fea34480e5e7bd38aad7b7468972dcc7c`
      )
      .then((response) => response.data)
      .then((data) => {
        setStation(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="black" />
        <Text>Patience...</Text>
      </View>
    );
  }

  return (
    <View>
      <View>
        <View>
          <Text>{station.name.substr(station.name.lastIndexOf("-") + 1)}</Text>
          <Text>{station.address}</Text>
        </View>
        <View>
          <Text>
            Vélos disponibles : {station.totalStands.availabilities.bikes}
          </Text>
          <Text>
            Places disponibles : {station.totalStands.availabilities.stands}
          </Text>
          <View>
            <FontAwesome5 name={"credit-card"} />
            {station.banking ? (
              <FontAwesome5 name={"check"} />
            ) : (
              <FontAwesome5 name={"times"} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default StationDetailsScreen;
