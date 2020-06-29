import React from 'react';
import {totalSize} from 'react-native-dimension';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Splash from '../Containers/IntroFlow/Splash';
import SignIn from '../Containers/AuthFlow/SignIn';
import SignUp from '../Containers/AuthFlow/SignUp';
import Home from '../Containers/MainFlow/Home/Home';
import FilterSearchScreen from '../Containers/MainFlow/Home/FilterSearchScreen';
import FavoriteJobsScreen from '../Containers/MainFlow/Home/FavoriteJobsScreen';
import SearchResultsScreen from '../Containers/MainFlow/Home/SearchResultsScreen';
import FiltersScreen from '../Containers/MainFlow/Home/FiltersScreen';
import JobDetailScreen from '../Containers/MainFlow/Home/JobDetailScreen';
import EmployerDetailScreen from '../Containers/MainFlow/Home/EmployerDetailScreen';
import AnimalDetailScreen from '../Containers/MainFlow/Home/AnimalDetailScreen';
import AnimaRecommendationScreen from '../Containers/MainFlow/Home/AnimaRecommendationScreen';
import AnimalUploadScreen from '../Containers/MainFlow//Home/AnimalUploadScreen';
import ScrollableGalleryScreen from "../Containers/GalleryScreens/ScrollableGalleryScreen";
import FullscreenGalleryScreen from "../Containers/GalleryScreens/FullscreenGalleryScreen";
import EmployersListScreen from '../Containers/MainFlow/Home/EmployersListScreen';
import Notification from '../Containers/MainFlow/Notifications/Notification';
import Footer from "../Components/Footer";
import Profile from '../Containers/MainFlow/Profile/Profile';
import colors from '../Themes/Colors';
import {Icon} from 'react-native-elements';
import commonStyles from '../Containers/Styles/commonStyles';
import Drawer from '../Components/Drawer';
import DrawerIcon from '../Components/DrawerIcon';

import {View, Image, Text} from 'react-native';

const IntroStack = createStackNavigator({
  splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  },
});

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
});

const MainAppTab = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: <Text style={[commonStyles.h4, {textAlign: 'center'}]}>Home</Text>,
        tabBarIcon: ({tintColor, focused}) =>
          focused ? (
            <Icon
              name="home-variant"
              color={tintColor}
              size={totalSize(3)}
              type="material-community"
            />
          ) : (
            <Icon
              name="home-variant-outline"
              color={tintColor}
              size={totalSize(2.5)}
              type="material-community"
            />
          ),
      },
    },
    AnimalUpload: {
      screen:  AnimalUploadScreen,
      navigationOptions: {
        tabBarLabel: <Text></Text>,
        // tabBarIcon: ({tintColor, focused}) =>
        //   focused ? (
        //     <Icon
        //       name="cash"
        //       color={tintColor}
        //       size={totalSize(3)}
        //       type="material-community"
        //     />
        //   ) : (
        //     <Icon
        //       name="cash"
        //       color={tintColor}
        //       size={totalSize(2.5)}
        //       type="material-community"
        //     />
        //   ),
          tabBarIcon: ({tintColor}) => (
            <View
              style={{
                position: 'absolute',
                bottom: -20, // space from bottombar
                height: 65,
                width: '100%',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor: colors.appColor1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[commonStyles.h3, {color: 'white'}]}>SELL</Text>
            </View>
          ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: <Text style={[commonStyles.h4, {textAlign: 'center'}]}>Profile</Text>,
        tabBarIcon: ({tintColor, focused}) =>
          focused ? (
            <Icon
              name="account"
              color={tintColor}
              size={totalSize(3)}
              type="material-community"
            />
          ) : (
            <Icon
              name="account-outline"
              color={tintColor}
              size={totalSize(2.5)}
              type="material-community"
            />
          ),
      },
    },
  },
  // {
  //   tabBarComponent: props => <Footer {...props} />
  // },
  {
    tabBarOptions: {
      activeTintColor: colors.appColor1,
      inactiveTintColor: colors.steel,
      labelStyle: {fontSize: totalSize(1.5)},
    },
  },
);

const CustomDrawerComponent = props => <Drawer {...props} />;

const MainDrawer = createDrawerNavigator(
  {
    MainTab: {
      screen: MainAppTab,
      navigationOptions: {
        //header: null,
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
          <Icon
            name="home-outline"
            color={tintColor}
            size={totalSize(2.5)}
            type="material-community"
          />
        ),
      },
    },
  },
  {
    contentComponent: props => <CustomDrawerComponent {...props} />,
    drawerType: 'slide',
    contentOptions: {
      inactiveTintColor: colors.steel,
      activeTintColor: colors.appColor1,
      labelStyle: commonStyles.h4,
    },
  },
);

const AppStack = createStackNavigator({
  mainDrawer: {
    screen: MainDrawer,
    navigationOptions: ({navigation}) => ({
      headerLeft: <DrawerIcon navigation={navigation} />,
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
    }),
  },
  FilterSearchScreen: {
    screen: FilterSearchScreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
    }),
  },
  SearchResultsScreen: {
    screen: SearchResultsScreen,
  },
  FiltersScreen: {
    screen: FiltersScreen,
  },
  JobDetailScreen: {
    screen: JobDetailScreen,
  },
  FavoriteJobsScreen: {
    screen: FavoriteJobsScreen,
  },
  EmployersListScreen: {
    screen: EmployersListScreen,
  },
  EmployerDetailScreen: {
    screen: EmployerDetailScreen,
  },
  AnimalDetailScreen: {
    screen: AnimalDetailScreen,
  },
  AnimaRecommendationScreen: {
    screen: AnimaRecommendationScreen
  },
  ScrollableGalleryScreen: {
    screen: ScrollableGalleryScreen
  },
  FullscreenGalleryScreen: {
    screen: FullscreenGalleryScreen,
    navigationOptions: {
      mode: "modal",
      header: null
    }
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Intro: IntroStack,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Intro',
    },
  ),
);
