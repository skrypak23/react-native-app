import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Toast as ToastBase } from 'native-base';
import { RootState } from '../../redux/store/types';
import { setSuccessAlert, setFailureAlert } from '../../redux/alert/actions';

type Props = {
  alert: {
    success: boolean | null;
    failure: boolean | null;
    message: string | null;
  };
  setSuccessAlert: (success: boolean | null, message: string | null) => void;
  setFailureAlert: (success: boolean | null, message: string | null) => void;
};

const TOAST_DURATION = 3000;

const withToast = (Component: ComponentType<any>) => {
  class Toast extends React.Component<Props> {
    componentDidUpdate() {
      const { alert, setSuccessAlert, setFailureAlert } = this.props;
      if (alert.success && alert.message) {
        ToastBase.show({
          text: alert.message,
          buttonText: 'Okay',
          type: 'success',
          duration: TOAST_DURATION
        });
        setSuccessAlert(null, null);
      }
      if (alert.failure && alert.message) {
        ToastBase.show({
          text: alert.message,
          buttonText: 'Okay',
          type: 'danger',
          duration: TOAST_DURATION
        });
        setFailureAlert(null, null);
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return connect(
    (state: RootState) => ({ alert: state.alert }),
    { setSuccessAlert, setFailureAlert }
  )(Toast);
};

export default withToast;
