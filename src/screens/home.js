import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import useLocation from '../hooks/useLocation';
import { API_KEY } from '../utils/WeatherApi';
import { weatherConditions } from '../utils/WeatherConditions';

const Home = () => {
    const location = useLocation();
    const [temperature, setTemperature] = useState();
    const [condition, setCondition] = useState();
    const [icon, setIcon] = useState();
    const [bgColor, setBgColor] = useState();
    const [subTitle, setSubTitle] = useState();

    useEffect(() => {
        if (location) {
            fetchWeather(location.coords.latitude, location.coords.longitude);
        }
    }, [location]);

    const fetchWeather = async (lat, lon) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`);
        const data = await response.json();

        setTemperature(data.current.temp);
        setCondition(data.current.weather[0].main);
        setIcon(weatherConditions[data.current.weather[0].main].icon);
        setBgColor(weatherConditions[data.current.weather[0].main].color);
        setSubTitle(weatherConditions[data.current.weather[0].main].subtitle);
    };

    return (
        <View style={[styles.weatherContainer, { backgroundColor: bgColor }]}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons size={48} name={icon} color={'#fff'} />
                <Text style={styles.tempText}>{temperature}˚ </Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{condition}</Text>
                <Text style={styles.subtitle}>{subTitle}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempText: {
        fontSize: 48,
        color: '#fff',
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40,
    },
    title: {
        fontSize: 48,
        color: '#fff',
    },
    subtitle: {
        fontSize: 24,
        color: '#fff',
    },
});

export default Home;
