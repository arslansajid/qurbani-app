
import * as React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { totalSize, width, height } from "react-native-dimension"
import colors from '../Themes/Colors';
import {Icon} from 'react-native-elements';

const CategoryCard = (props) => {
    const { title, image, navigation, parent } = props;
    const navigate = navigation.navigate;
    const [selected, setSelected] = React.useState(false);

    const selectCard = () => {
        setSelected(!selected);
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
            onPress={() => parent === "upload" ? selectCard() : navigate('SearchResultsScreen')}
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

export default CategoryCard;