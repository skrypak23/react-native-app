import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from 'react-native';
import { Card, CardItem, Container, Content, Body } from 'native-base';
import GoBackButton from '../../../shared/components/GoBackButton';

type TNavigation = {
  navigation: NavigationScreenProp<any, any>;
};

type Props = TNavigation & {};

class Detail extends Component<Props> {
  static navigationOptions = ({ navigation }: TNavigation) => ({
    title: 'Customer Details',
    headerLeft: <GoBackButton navigation={navigation} />
  });

  render() {
    const customer = this.props.navigation.getParam('data');
    return customer ? (
      <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Name: {customer.name}</Text>
            </CardItem>
            <CardItem header bordered>
              <Text>Phone: {customer.phone}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Address: {customer.address}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    ) : null;
  }
}

export default Detail;
