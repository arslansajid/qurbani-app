import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';
import store from './Store';
import {LanguageProvider} from './src/Context/LanguageContext';
import {NativeModules, Platform} from 'react-native';

console.disableYellowBox = true;

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: deviceLanguage,
    };
  }

  updateLanguage = language => {
    this.setState(prevState => ({...prevState, language}));
  };

  render() {
    return (
      <Provider store={store}>
        <LanguageProvider
          value={{
            language: this.state.language,
            updateLanguage: this.updateLanguage,
          }}>
          <Navigation />
        </LanguageProvider>
      </Provider>
    );
  }
}

export default App;
