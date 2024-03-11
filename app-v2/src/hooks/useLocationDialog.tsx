import { useTranslation } from 'react-i18next';
import { Alert, Linking } from 'react-native';

export const useLocationDialog = () => {
  const { t } = useTranslation();

  const handleOnOpenSettings = () => {
    Linking.openSettings();
  };

  const showLocationDialog = () =>
    Alert.alert(t('location_dialog_title'), t('location_dialog_message'), [
      {
        text: t('turn_location_on_in_settings'),
        onPress: () => handleOnOpenSettings(),
        isPreferred: true,
      },
      {
        text: t('keep_location_services_off'),
        onPress: () => {},
      },
    ]);

  return showLocationDialog;
};
