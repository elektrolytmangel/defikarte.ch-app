import { Button, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

type Props = {
  data: any;
};

export const AedDetail = (props: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.data) {
      setShow(true);
    }
  }, [props.data]);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titelContainer}>
        <Text style={styles.text}>Detail Information</Text>
        <Button
          title="Close"
          onPress={() => {
            setShow(false);
          }}
        />
      </View>
      <ScrollView>
        <Text style={styles.json}>{JSON.stringify(props.data, null, 2)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: '95%',
    backgroundColor: 'black',
    opacity: 0.8,
  },
  titelContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  json: {
    fontSize: 12,
    color: 'white',
  },
});
