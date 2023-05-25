interface Station {
    number: number;
    stationId: string;
    name: string;
    address: string;
    position: {
      lat: number;
      lng: number;
    };
    status: string;
    available_bikes: number;
    available_bike_stands: number;
  }
  
  export default Station;
  