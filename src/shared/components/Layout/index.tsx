import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { Root, Container } from 'native-base';
import { withToast } from '../../hoc';

const Layout: FC = ({ children }) => (
  <Root>
    <Container>
      <StatusBar hidden />
      {children}
    </Container>
  </Root>
);

export default withToast(Layout);
