import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  item: {
    position: 'relative',
    height: 60,
    width: '100%',
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
    flex: 1,
    width: '100%'
  }
});

export default style;
