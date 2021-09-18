import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
    const [location, setLocation] = useState();

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
    };

    useEffect(() => {
        getLocation();
    }, []);

    return location;
}
