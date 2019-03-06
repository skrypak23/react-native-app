import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';

const Layout: FC = ({ children }) => (
  <Container>
    <StatusBar hidden />
    {children}
  </Container>
);

export default Layout;
