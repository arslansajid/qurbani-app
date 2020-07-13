import React, { Component, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import commonStyles from '../Styles/commonStyles';
import images from '../../Themes/Images';
import { height, width, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import colors from '../../Themes/Colors';
import type from '../../Themes/Fonts';
import {signUp} from '../../Backend/Services/authService';
import {addUser} from '../../Backend/Services/usersService';
import { connect } from 'react-redux';

import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

const SignUp = (props) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const navigate = props.navigation.navigate;
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const onSubmit = data => {
        setLoading(true);
        console.log("FORM SUBMITTED", data);

        signUp(data.email.toLowerCase(), data.password)
            .then((res) => {
                addUser(data)
                .then(() => {
                    console.log("######## res", res)
                    navigate('SignIn');
                    setErrorMessage('');
                    setLoading(false);
                })
                .catch(() => {
                    setErrorMessage('Error Adding User');
                    setLoading(false);
                })
            })
            .catch((err) => {
                console.log("######## err", err)
                setErrorMessage(err)
                setLoading(false);
            })
    
        //   setTimeout(() => {
        //     navigate('SignIn');
        //   }, 1000);
    }

    const onChange = args => ({
        value: args[0].nativeEvent.text,
      });

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.mainContainer, styles.container]}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={{ marginVertical: height(3) }}>
                <Image
                    source={images.goatLogoBlack}
                    resizeMode="contain"
                    style={commonStyles.smallLogoStyle}
                />
            </View>

            <View
                style={[
                    errors.name ? commonStyles.inputErrorContainer : commonStyles.inputContainer,
                ]}>
                <Icon
                  name="person"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="Full Name *"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="name"
                    rules={{ required: true }}
                />
            </View>

            <View
                style={[
                    errors.email ? commonStyles.inputErrorContainer : commonStyles.inputContainer,
                    { marginTop: height(2.5) },
                ]}>
                <Icon
                    name="email"
                    color={colors.appColor1}
                    size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="Email *"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="email"
                    rules={{ required: true }}
                />
            </View>

            <View
                style={[
                    errors.phone ? commonStyles.inputErrorContainer : commonStyles.inputContainer,
                    { marginTop: height(2.5) },
                ]}>
                <Icon
                    name="phone"
                    color={colors.appColor1}
                    size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="Phone *"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="phone"
                    rules={{ required: true }}
                />
            </View>

            <View
                style={[
                    errors.password ? commonStyles.inputErrorContainer : commonStyles.inputContainer,
                    { marginTop: height(2.5) },
                ]}>
                <Icon
                    name="lock"
                    color={colors.appColor1}
                    size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="Password *"
                            secureTextEntry
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="password"
                    rules={{ required: true }}
                />
            </View>

            <View
                style={[
                    errors.city ? commonStyles.inputErrorContainer : commonStyles.inputContainer,
                    { marginTop: height(2.5) },
                ]}>
                <Icon
                  name="location-on"
                  type="material"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="City *"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="city"
                    rules={{ required: true }}
                />
            </View>

            <View
                style={[
                    commonStyles.inputContainer,
                    { marginTop: height(2.5) },
                ]}>
                <Icon
                  name="location-on"
                  type="material"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="Address"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="address"
                    rules={{}}
                />
            </View>

            <View
                style={[
                    commonStyles.inputContainer,
                    { marginTop: height(2.5) },
                ]}>
                <Icon
                  name="cash"
                  type="material-community"
                  color={colors.appColor1}
                  size={totalSize(2.5)}
                />
                <RHFInput
                    register={register}
                    setValue={setValue}
                    as={
                        <TextInput
                            placeholder="Your Qurbani Budget"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    onChangeEvent={onChange}
                    name="budget"
                    rules={{}}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[commonStyles.buttonColored]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={[commonStyles.textButton, {}]}>Sign Up</Text>
                    {loading ? (
                        <View style={commonStyles.btnLoader}>
                            <ActivityIndicator color="white" size="small" />
                        </View>
                    ) : null}
                </TouchableOpacity>
            </View>

            {errorMessage.length ? (
                <Text style={{color: 'red', marginVertical: height(2)}}>
                    {errorMessage}
                </Text>
            )
                :
                null
            }

            <View style={{ marginBottom: height(5) }}>
                <Text style={commonStyles.h4}>
                  Already have an account?{' '}
                  <Text
                    style={{
                      color: colors.appColor1,
                      fontFamily: type.appTextMedium,
                    }}
                    onPress={() => navigate('SignIn')}>
                    Signin
                  </Text>
                </Text>
              </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff80',
        justifyContent: 'center',
    },
    buttonsContainer: {
        marginTop: height(5),
        marginBottom: height(2),
        alignItems: 'center',
    },
    userButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
    },
    userSelectionButton: {
        width: width(30),
        borderRadius: 5,
        marginBottom: height(5),
    },
    userSelectionButtonText: {
        fontSize: totalSize(2),
        color: '#000000',
    },
    center: {
        alignItems: 'center',
    },
});

export default SignUp;