import React, { FC } from 'react';
import { Image, FlatList } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Content, Text, ListItem, Icon } from 'native-base';
import styles from './style';
import PATHS from '../../paths';

type Props = {
  navigation: NavigationScreenProp<any, any>;
};

const ROUTES = [
  { key: PATHS.Customers, icon: 'user' },
  { key: PATHS.Products, icon: 'product-hunt' },
  { key: PATHS.Invoices, icon: 'dollar' }
];

const SideBar: FC<Props> = ({ navigation }) => (
  <Container>
    <Content>
      <Image
        source={require('../../../assets/img/invoice-img.jpg')}
        style={styles.image}
      />
      <FlatList
        style={styles.list}
        data={ROUTES}
        renderItem={({ item }) => {
          return (
            <ListItem button onPress={() => navigation.navigate(item.key)}>
              <Icon type="FontAwesome" name={item.icon} style={styles.icon} />
              <Text> {item.key}</Text>
            </ListItem>
          );
        }}
      />
    </Content>
  </Container>
);

export default SideBar;
