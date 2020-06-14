import React, {Component} from 'react';
import {NativeModules, Platform} from 'react-native';

const GlobalContext = React.createContext({});
const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

export class GlobalContextProvider extends Component {
  state = {
    isOnline: true,
    language: deviceLanguage,
    favoriteJobs: [],
  }

  switchToOnline = () => {
    this.setState({ isOnline: true });
  }

  switchToOffline = () => {
    this.setState({ isOnline: false });
  }

  updateLanguage = language => {
    this.setState(prevState => ({...prevState, language}));
  };

  updateFavoriteJobs = job => {
    const { favoriteJobs } = this.state;
    let searchIndex = null;
    
    if (!!favoriteJobs.length) {
      favoriteJobs.find((favJob, i) => {
        if (favJob.id === job.id) {
          searchIndex = i;
          return true; // stop searching
        }
      });
    }
    if(searchIndex !== null && searchIndex > -1) {
      favJobs = favoriteJobs.slice();
      favJobs.splice(searchIndex, 1);
    } else {
      favJobs = [...favoriteJobs, job];
    }
    this.setState({ favoriteJobs: favJobs });
  };

  render () {
    console.log("HEHHEHEHEH", this.state.favoriteJobs)
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          switchToOnline: this.switchToOnline,
          switchToOffline: this.switchToOffline,
          updateLanguage: this.updateLanguage,
          updateFavoriteJobs: this.updateFavoriteJobs,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
  <GlobalContext.Consumer>
    {
      context => <ChildComponent {...props} global={context}  />
    }
  </GlobalContext.Consumer>
);