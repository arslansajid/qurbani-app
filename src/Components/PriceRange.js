import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Colors from "../Themes/Colors";

class PriceRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: [0,999]
    };
  }

  render() {
    let { width } = Dimensions.get("window");
    return (
      <View style={{ flex: 1, margin: 20 }}>
        {/* <Text style={styles.heading}>Price Range</Text>
        <Text
          style={{ paddingHorizontal: 20, paddingVertical: 10, marginBottom: -5, fontFamily: "Roboto-Medium", color: "#404040" }}
        >
          PKR {this.state.range[0]} - PKR {this.state.range[1]}
        </Text> */}
        <View style={styles.container}>
          <MultiSlider
            values={this.state.range}
            touchDimensions={{ height: 70, width: 70, borderRadius: 20, slipDisplacement: 200 }}
            markerStyle={styles.marker}
            selectedStyle={styles.selectedTrack}
            unselectedStyle={styles.unselectedTrack}
            pressedMarkerStyle={[styles.marker, { width: 28, height: 28, elevation: 8 }]}
            onValuesChange={range => {
              this.setState({ range });
            }}
            onValuesChangeFinish={range => {
              if (range != null && range.length === 2) {
                this.setState({ range }, () => {
                // this.props.dispatch(setPriceRange(this.state.range));
                });
              }
            }}
            /*onValuesChange={range => {
              this.setState({ range });
            }}*/
            min={0}
            max={999}
            sliderLength={width - 60}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    fontSize: 18,
    color: Colors.appTextColor1,
    fontWeight: "bold",
    paddingBottom: 5
  },
  unselectedTrack: {
    borderColor: "#ededed",
    borderWidth: 4
  },
  selectedTrack: {
    backgroundColor: Colors.appColor1,
    borderColor: "transparent",
    borderWidth: 4
  },
  marker: {
    backgroundColor: "white",
    borderRadius: 25,
    height: 24,
    width: 24,
    elevation: 4,
    marginTop: 5
  }
});

PriceRange.propTypes = {
  priceRange: PropTypes.array
};

function mapStateToProps(state) {
  return {
    priceRange: state.priceRange
  };
}

export default connect(mapStateToProps)(PriceRange);
