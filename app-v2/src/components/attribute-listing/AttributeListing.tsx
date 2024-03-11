import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';

type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export const AttributeListing = (props: Props) => {
  const { title, value, icon } = props;
  return (
    <View style={styles.containerStyle}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.innerContainerStyle}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.valueStyle}>{value ?? 'n/A'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 14,
  },
  valueStyle: {
    fontSize: 18,
    flexWrap: 'wrap',
  },
  innerContainerStyle: {
    marginLeft: 20,
    flex: 1,
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
    padding: 10,
  },
  iconContainer: {
    width: 30,
  },
});
