import React, { Component, useState, useEffect } from 'react';
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
    Button,
} from 'react-native';
import commonStyles from '../Styles/commonStyles';
import images from '../../Themes/Images';
import { height, width, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import colors from '../../Themes/Colors';
import {signInWithEmail, signInWithPhoneNumber} from '../../Backend/Services/authService';
import { getUserByEmail } from '../../Backend/Services/usersService';

import {firebase} from "../../Backend/firebase"
import { connect } from 'react-redux';
import {userLogin} from '../../redux/actions/LoginActions';

import { useForm } from 'react-hook-form';
import { RHFInput } from 'react-hook-form-input';

const SignIn = (props) => {
    const { register, setValue, handleSubmit, errors } = useForm();
    const navigate = props.navigation.navigate;
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    // useEffect(async() => {
    //     await firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           // User is signed in.
    //           props.dispatch(userLogin(user));
    //         }
    //     })
    // }, [])

    const onSubmit = async data => {
        setLoading(true);
        console.log("FORM SUBMITTED", data);
        const isEmail = data.email.includes("@")

        if(isEmail) {
            // signInWithEmail(data.email, data.password)
            // .then((res) => {
            //     console.log("######## res", res)
            //     // navigate('App');
            //     setLoading(false);
            // })
            // .catch((err) => {
            //     console.log("######## err", err)
            //     setErrorMessage("Invalid email or password")
            //     setLoading(false);
            // })

            const signInResult =  await signInWithEmail(data.email.toLowerCase(), data.password)
              
            if(!!signInResult) {
                navigate('App');
                setErrorMessage('');
                setLoading(false);
            } else {
                setErrorMessage("Invalid email or password")
                setLoading(false);
            }
        } else {
            // signInWithPhoneNumber(data.email, data.password)
            // .then((res) => {
            //     console.log("######## res", res)
            //     // navigate('App');
            //     setLoading(false);
            // })
            // .catch((err) => {
            //     console.log("######## err", err)
            //     setErrorMessage("Invalid phone number or password")
            //     setLoading(false);
            // })

            const signInResult =  await signInWithPhoneNumber(data.email, data.password)
            console.log("signInWithPhoneNumber", signInResult)

            if(!!signInResult) {
                navigate('App');
                setErrorMessage('');
                setLoading(false);
            } else {
                setErrorMessage("Invalid email or password")
                setLoading(false);
            }
        }
    }

    const onChange = args => ({
        value: args[0].nativeEvent.text,
      });

    return (
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
                    errors.email ? commonStyles.inputErrorContainer : commonStyles.inputContainer,
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
                            placeholder="Email"
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    // onChangeEvent={args => setEmail(args[0].nativeEvent.text)}
                    onChangeEvent={onChange}
                    name="email"
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
                            placeholder="Password"
                            secureTextEntry
                            placeholderTextColor="#000000"
                            style={commonStyles.inputStyle}
                        />
                    }
                    // onChangeEvent={args => setPassword(args[1].nativeEvent.text)}
                    onChangeEvent={onChange}
                    name="password"
                    rules={{ required: true }}
                />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[commonStyles.buttonColored]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={[commonStyles.textButton, {}]}>Sign In</Text>
                    {loading ? (
                        <View style={commonStyles.btnLoader}>
                            <ActivityIndicator color="white" size="small" />
                        </View>
                    ) : null}
                </TouchableOpacity>
                <Text
                    style={[commonStyles.h5, { marginVertical: height(2.5) }]}>
                    OR
                    </Text>
                <TouchableOpacity
                    style={[commonStyles.buttonBordered, {}]}
                    onPress={() => navigate('SignUp')}>
                    <Text
                        style={[
                            commonStyles.textButton,
                            { color: colors.appColor1 },
                        ]}>
                        Sign Up
                      </Text>
                </TouchableOpacity>
            </View>
            {errorMessage.length ? (
                <Text style={{color: 'red'}}>
                    {errorMessage}
                </Text>
            )
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff80',
        justifyContent: 'center',
    },
    buttonsContainer: {
        marginTop: height(5),
        marginBottom: height(3),
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

export default connect(null)(SignIn);