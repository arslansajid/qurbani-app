
import * as React from 'react';
import {View} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { totalSize, width, height } from "react-native-dimension"
import colors from '../Themes/Colors';
import {Icon} from 'react-native-elements';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CategoryCard = (props) => {
    const { title, image } = props;
    const [selected, setSelected] = React.useState(false);

    const selectCard = () => {
        setSelected(!selected);
    }
      
    return (
        <>
        {/* {
            selected && (
                <View style={{padding: totalSize(0.5), display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, zIndex: 10, backgroundColor: colors.appColor1}}>
                    <Icon
                        name={'check'}
                        type="font-awesome"
                        color={colors.white}
                        size={totalSize(2)}
                    />
                </View>
            )
        } */}
        <Card onPress={() => selectCard()} style={{ width: '100%'}}>
            <Card.Cover resizeMode={"cover"} style={{ height: totalSize(10) }} source={{ uri: image }} />
            <Card.Content style={{paddingBottom: 0, paddingHorizontal: 0}}>
                <Title style={{textAlign: 'center'}}>{title}</Title>
                {/* <Paragraph>Card content</Paragraph> */}
            </Card.Content>
        </Card>
        </>
    )
};

export default CategoryCard;