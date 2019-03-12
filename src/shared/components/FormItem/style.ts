import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  item: {
    position: 'relative',
    height: 60
  },
  error: {
    position: 'absolute',
    bottom: -15,
    left: 0,
    fontSize: 12,
    color: 'red',
    width: 200
  },
  input: {
    flex: 1
  }
});

export default style;