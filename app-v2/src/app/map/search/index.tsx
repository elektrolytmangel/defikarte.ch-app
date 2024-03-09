import { View, BottomSheetTextInput } from '@/src/components/Themed';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

export default () => {
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.container}>
          <BottomSheetTextInput placeholder="Search Address..." />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
