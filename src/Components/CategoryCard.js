
import * as React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { totalSize, width, height } from "react-native-dimension"
import colors from '../Themes/Colors';
import {Icon} from 'react-native-elements';
import {setCategory} from '../redux/actions/CandidateFiltersActions';
import {connect} from 'react-redux';
import commonStyles from '../Containers/Styles/commonStyles';
import Styles from '../Containers/GalleryScreens/styles/GalleryScreenStyles';

const CategoryCard = (props) => {
    const { title, image, navigation, parent, onSelect, selected, index } = props;
    const navigate = navigation.navigate;

    const onCardSelect = (value) => {
        console.log("########### seleted value", value)
        props.dispatch(setCategory(value));
        navigate('SearchResultsScreen');
    }
    return (
        <>
        {
            selected && (
                <View style={{padding: totalSize(0.75), display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, zIndex: 10, backgroundColor: colors.appColor1}}>
                    <Icon
                        name={'check'}
                        type="font-awesome"
                        color={colors.white}
                        size={totalSize(2)}
                        iconStyle={{zIndex: 10}}
                    />
                </View>
            )
        }
        <TouchableOpacity
            onPress={() => parent === "upload" ? onSelect(title) : onCardSelect(title) }
            style={styles.cardContainer}>
            <Card.Cover resizeMode={"cover"} style={{ height: parent === "upload" ? totalSize(12) : totalSize(15), zIndex: 1 }} source={image} />
            <Card.Content style={{paddingBottom: 0, paddingHorizontal: 0}}>
                {/* <Title style={{textAlign: 'center'}}>{title}</Title> */}
                <Text style={[{textAlign: 'center', marginVertical: 3}, commonStyles.h4, commonStyles.bold]}>{title}</Text>
            </Card.Content>
        </TouchableOpacity>
        </>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        zIndex: 1,
        marginBottom: height(1),
        // borderWidth: 1,
        // elevation: 2,
        // shadowOffset: {width: 1, height: 1},
        // shadowColor: "#ededed",
        // shadowOpacity: 0.1,
        // borderWidth: 1,
        // borderColor: colors.steel,
        // borderRadius: 5,
        // overflow: 'hidden'
    }
})


export default connect(null)(CategoryCard);
