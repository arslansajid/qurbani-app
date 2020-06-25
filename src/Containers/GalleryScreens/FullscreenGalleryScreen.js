import React, { Component } from "react";
import { View, Text, TouchableOpacity, StatusBar, Dimensions, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Gallery from "react-native-image-gallery";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-navigation";

class ScrollableGalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.navigation.getParam("images"),
      objImages: [],
      selectedIndex: props.navigation.getParam("selectedIndex")
    };
    for (let i in this.state.images) {
      this.state.objImages.push({
        source: {
          uri: this.state.images[i],
          // headers: {
          //   Referer: Config.IMG_REFERER
          // }
        },
        dimensions: {
          height: 1300,
          width: 975
        }
      });
    }
  }
  setDescription = index => {
    if (this.captionRef && "description" in this.state.images)
      this.captionRef.setDescription(this.state.images.description[index]);
  };
  render() {
    return (
      <>
        <StatusBar hidden />
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              position: "absolute",
              zIndex: 100000,
              top: 20,
              right: 20,
              borderRadius: 25,
              width: 38,
              height: 38,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <MaterialIcon style={{ zIndex: 20 }} name={"close"} color={"#fff"} size={22} />
          </TouchableOpacity>
          <Gallery
            style={{ flex: 1, backgroundColor: "black" }}
            images={this.state.objImages}
            imageComponent={CustomImage}
            maxScale={2}
            // onPageSelected={index => {
            //   this.setDescription(index);
            // }}
            initialPage={this.state.selectedIndex}
            flatListProps={{
              windowSize: 1,
              initialNumToRender: 1,
              initialScrollIndex: this.state.selectedIndex,
              getItemLayout: (data, index) => ({
                length: Dimensions.get("screen").width,
                offset: Dimensions.get("screen").width * index,
                index
              })
            }}
          />
        </View>
      </>
    );
  }
}
export default ScrollableGalleryScreen;

function CustomImage(props) {
  return <Image PlaceholderContent={<ActivityIndicator />} placeholderStyle={{ backgroundColor: "#000" }} {...props} />;
}
