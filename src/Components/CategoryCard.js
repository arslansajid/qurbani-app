
import * as React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { totalSize, width, height } from "react-native-dimension"
import colors from '../Themes/Colors';
import {Icon} from 'react-native-elements';
import {setCategory} from '../redux/actions/CandidateFiltersActions';
  import {connect} from 'react-redux';

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
            style={{ width: '100%', zIndex: 1, marginBottom: height(1)}}>
            <Card.Cover resizeMode={"cover"} style={{ height: totalSize(15), zIndex: 1 }} source={image} />
            <Card.Content style={{paddingBottom: 0, paddingHorizontal: 0}}>
                {/* <Title style={{textAlign: 'center'}}>{title}</Title> */}
                <Text style={{textAlign: 'center'}}>{title}</Text>
            </Card.Content>
        </TouchableOpacity>
        </>
    )
};

export default connect(null)(CategoryCard);
