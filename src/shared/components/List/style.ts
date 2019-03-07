import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  separatorStyle: {
    height: 1,
    backgroundColor: 'transparent'
  },
  listItem: {
    marginLeft: -WIDTH,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  absoluteCell: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  absoluteCellText: {
    margin: 16,
    color: '#fff'
  },
  innerCell: {
    width: WIDTH,
    marginLeft: WIDTH,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: { width: 30 }
});

export default styles;
