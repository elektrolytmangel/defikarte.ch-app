import Geolocation from '@react-native-community/geolocation';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, NativeEventSubscription, Platform } from 'react-native';
import { useLocationContext } from '../context/LocationContext';

export const useLocationState = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { dispatch: locationDispatch } = useLocationContext();

  useEffect(() => {
    var androidSubscription: NativeEventSubscription;
    var iosSubscription: NativeEventSubscription;
    if (Platform.OS === 'android') {
      androidSubscription = AppState.addEventListener('focus', _handleAppStateFocus);
    } else if (Platform.OS === 'ios') {
      iosSubscription = AppState.addEventListener('change', _handleAppStateChange);
    }

    return () => {
      androidSubscription?.remove();
      iosSubscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (appStateVisible === 'active') {
      requestLocationServices();
    }
  }, [appStateVisible]);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const _handleAppStateFocus = () => {
    setAppStateVisible('active');
  };

  const requestLocationServices = () => {
    Geolocation.getCurrentPosition(
      () => {
        locationDispatch({ type: 'SET_LOCATION_SERVICES_TURNED_ON', payload: true });
      },
      () => {
        locationDispatch({ type: 'SET_LOCATION_SERVICES_TURNED_ON', payload: false });
      },
      { enableHighAccuracy: true }
    );
  };
};
