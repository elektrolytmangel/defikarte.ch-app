import { View, Text } from '@/src/components/Themed';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Detail: I should be in the bottom sheet</Text>
        <Link href="/map/search/">search</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
