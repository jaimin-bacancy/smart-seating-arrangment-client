import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppImages, CommonStyle} from '@Theme';
import {
  Authentication,
  getSize,
  goToNextScreen,
  setItemInStorage,
} from '@Utils';
import {BottomView, ButtonComponent} from '@SubComponents';
import {CustomText, Layout} from '@CommonComponent';
import {Route} from '@Routes/AppRoutes';
import {useAppContext} from '@AppContext';
import {I18n} from '@Localization';

const styles = StyleSheet.create({
  outer: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    marginTop: 130,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btnText: {
    textAlign: 'right',
    paddingVertical: 5,
  },
  marginTop: {
    marginTop: 50,
    minWidth: 160,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
});

const Login = () => {
  const {appTheme} = useAppContext();
  const navigation = useNavigation();
  const [state, setState] = useState({
    email: '',
    password: '',
    isSecureTextEntry: true,
    isProcessing: false,
  });
  const {email, password, isSecureTextEntry, isProcessing} = state;

  const refEmail = useRef<TextInput>(null);
  const refPassword = useRef<TextInput>(null);

  const {outer, title, btnText, marginTop, flexDirection, flex} = styles;
  const {input, flexContainer, center, inputIcon, inputImg} = CommonStyle;
  const inputStyle = [
    input,
    {
      color: appTheme.text,
      borderColor: appTheme.border,
    },
  ];

  const onSubmitEditing = (refName: any) => {
    if (refName) {
      refName.focus();
    }
  };

  const onChangeText = (text: string, type: string) => {
    setState({
      ...state,
      [type]: text,
    });
  };

  const onShowPassword = () => {
    setState({
      ...state,
      isSecureTextEntry: !isSecureTextEntry,
    });
  };

  const manageProcessing = (isProcessingState: boolean) => {
    setState({
      ...state,
      isProcessing: isProcessingState,
    });
  };

  const onLogin = () => {
    try {
      // Field Validation
      // Make api call ans store user in redux and token in Storage
      goToNextScreen(navigation, Route.HomeScreen);
      setItemInStorage(Authentication.TOKEN, 'set login token');
    } catch (error) {
      manageProcessing(false);
    }
  };

  return (
    <Layout
      backgroundColor={appTheme.background}
      navBarContainerStyle={{borderWidth: 1}}>
      <View
        style={[
          {
            borderWidth: 1,
            justifyContent: 'center',
            borderRadius: 50,
            backgroundColor: appTheme.themeColor,
          },
          getSize(100),
        ]}>
        <CustomText xxxlarge style={[title, {color: appTheme.background}]}>
          HP
        </CustomText>
      </View>
    </Layout>
  );
};

export default Login;
