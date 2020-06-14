import React, { Component } from "react";
import { View, Text, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../../Themes/Colors";
import Styles from "./styles/GalleryScreenStyles";
import { SafeAreaView } from "react-navigation";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMG_MARGIN = 18;
const IMG_DEFAULT_WIDTH = 1300;
const IMG_DEFAULT_HEIGHT = 975;

const ScreenTitle = props => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{ color: Colors.SCREEN_TITLE, fontSize: 16, fontWeight: "bold" }}>{props.heading}</Text>
      {props.subheading && <Text style={{ color: Colors.TEXT_GREY, fontSize: 12 }}>{props.subheading}</Text>}
    </View>
  );
};

class ScrollableGalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyName: props.navigation.getParam("propertyName"),
      galleryList: props.navigation.getParam("images"),
      groupsedList: [],
      selectedImageIndex: 0
    };
    this.state.groupsedList = this.processList(this.state.galleryList.names);
  }

  static navigationOptions = ({ navigation }) => {
    const propertyName = navigation.getParam("propertyName", null);
    const propertyType = navigation.getParam("propertyType", null);
    const roomType = navigation.getParam("roomType", null);

    let subheading = null;
    if (roomType != null) {
      if (propertyName != null) {
        subheading = roomType + " | " + propertyName;
      }
    } else {
      if (propertyName != null && propertyType != null) {
        subheading = propertyName + " | " + propertyType;
      }
    }

    return {
      headerTitleStyle: {
        alignSelf: "center",
        textAlign: "center",
        flex: 1,
        fontSize: 16,
        fontWeight: "bold",
        color: "#1a1a1a"
      },
      headerStyle: {
        elevation: 0,
        borderWidth: 1,
        borderColor: "#ededed"
      },
      headerTitle: <ScreenTitle heading="Photo Gallery" subheading={subheading} />,
      headerRight: <View />
    };
  };

  processList = list => {
    let groupsedList = [];
    let flag = false;
    let length = list.length;
    let i = 0;
    while (1) {
      if (i < length) {
        if (flag && i + 1 < length) {
          groupsedList.push([
            { index: i, url: list[i] },
            { index: i + 1, url: list[i + 1] }
          ]);
          i += 2;
          flag = !flag;
        } else {
          groupsedList.push([{ index: i, url: list[i] }]);
          i++;
          flag = !flag;
        }

        // list[i]["index"] = i;

        // if (flag && i + 1 < length) {
        //   list[i + 1]["index"] = i + 1;

        //   groupsedList.push([list[i], list[i + 1]]);
        //   i += 2;
        //   flag = !flag;
        // } else {
        //   groupsedList.push([list[i]]);
        //   i++;
        //   flag = !flag;
        // }
      } else {
        break;
      }
    }
    return groupsedList;
  };

  renderItem = ({ item, index }) => {
    return (
      <View key={item[0].index + "-" + index} style={{ flex: 1, flexDirection: "row" }}>
        {item.map((value, index2) => {
          let image_width = 0;
          if (item.length === 1) {
            image_width = SCREEN_WIDTH - IMG_MARGIN - IMG_MARGIN;
          } else {
            image_width = (SCREEN_WIDTH - IMG_MARGIN - IMG_MARGIN - IMG_MARGIN) / 2;
          }
          let image_height = (IMG_DEFAULT_HEIGHT / IMG_DEFAULT_WIDTH) * image_width;

          return (
            <View
              key={value.index + "-" + index2}
              style={[
                { flex: 1, flexGrow: 1 },
                {
                  paddingTop: index === 0 ? IMG_MARGIN : 0,
                  paddingLeft: index2 === 1 ? 0 : IMG_MARGIN,
                  paddingRight: IMG_MARGIN,
                  paddingBottom: IMG_MARGIN
                }
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  this.props.navigation.navigate("FullscreenGalleryScreen", {
                    selectedIndex: value.index,
                    images: this.state.galleryList
                  });
                }}
              >
                <Image
                  source={{
                    uri: this.state.galleryList.path + value.url,
                    // headers: {
                    //   Referer: Config.IMG_REFERER
                    // }
                  }}
                  resizeMode="cover"
                  style={{
                    backgroundColor: Colors.BG_LIGHT,
                    height: image_height,
                    borderRadius: 4
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={[/* GlobalStyles.safeAreaView, */ Styles.container]} forceInset={{ top: "never", bottom: "never" }}>
        <FlatList data={this.state.groupsedList} renderItem={this.renderItem} keyExtractor={item => item[0].index + "key"} />
      </SafeAreaView>
    );
  }
}
export default ScrollableGalleryScreen;
