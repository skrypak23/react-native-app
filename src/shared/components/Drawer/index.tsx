import React, { Component, createRef } from 'react';
import { Drawer as BaseDrawer } from 'native-base';
import { View, Text } from 'react-native';
//import SideBar from './yourPathToSideBar';
class Drawer extends Component {
  private drawer: any;
  constructor(props: any) {
    super(props);
    this.drawer = createRef();
  }

  componentDidMount(): void {
    this.openDrawer();
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  render() {
    return (
      <BaseDrawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <View style={{ width: 300, backgroundColor: 'red' }}>
            <Text>dsdasd</Text>
          </View>
        }
        onClose={() => this.closeDrawer()}
      >
        {this.props.children}
      </BaseDrawer>
    );
  }
}

export default Drawer;
