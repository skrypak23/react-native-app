import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    fontSize: 16,
    color: '#fff'
  },
  closeButton: {
    position: 'absolute',
    top: -100,
    right: 0,
    width: 50,
    height: 50
  }
});

export default styles;
