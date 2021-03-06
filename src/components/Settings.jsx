import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableHighlight } from 'react-native'
import { Icons, Img } from '../constants/Image'
import { Actions, } from "react-native-router-flux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// redux
import { connect } from "react-redux"

class Settings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ["Full Name", "phone", "Age"],
            titleImg: [Icons.Login.UserOn, Icons.Login.Phone,],
            phone: "",

            isAge: false,
            isUpdate: false,
            hasBorder: false,
            isSuccefullyUpdated: false,

            inputColor: "rgba(000,000,000,0.3)",
            isFullNameOn: false,
            isPhoneOn: false,
            isEmailOn: false,

            textFieldValues: {
                fullName: "",
                phone: "",
                email: ""
            },
            isTextField: false,
        }
    }

    handleCamelize = (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '')
    }


    handleUpdateOnPress = () => {
        this.setState({
            isTextField: false,
            isUpdate: true,
            isInputEditable: true,
            isSuccefullyUpdated: true,
            hasBorder: false
        })

        setTimeout(() => {
            this.setState({
                isSuccefullyUpdated: false
            })
        }, 2000)
    }

    handdleOnPressArrow = () => {
        Actions.reset("_Profile")
    }

    handleFullNameOnChange = (value) => {
        this.setState({
            isFullNameOn: value.length > 1 ? true : false,
            textFieldValues: {
                fullName: value
            }
        })
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleEmailOnChange = (value) => {
        this.setState({
            isEmailOn: this.validateEmail(value) ? true : false,
            // isEmailOn: value.length > 5 ? true : false,
            textFieldValues: {
                email: value
            }
        })
    }

    handlePhoneOnChange = (value) => {
        this.setState({
            
            textFieldValues: {
                phone: value
            },
            phone: value
        })
    }

    handleEdit = () => {
        this.setState({
            isTextField: true,
            hasBorder: true
        })
    }

    render() {
        const { isFullNameOn, isPhoneOn, isEmailOn, isTextField, hasBorder, isSuccefullyUpdated } = this.state
        return (
            <View style={styles.Settings}>
                <View style={styles.SettingsHeaderContainer}>
                    <TouchableHighlight underlayColor="white" style={styles.TouchableArrow} onPress={this.handdleOnPressArrow}>
                        <Image style={styles.Arrow} source={Icons.Arrow} />
                    </TouchableHighlight>
                    <View underlayColor="white" style={[styles.TouchableArrow, { width: 200 }]} onPress={this.handdleOnPressArrow}>
                        <Text style={{ color: "rgba(000, 000, 000, 0.7)", fontSize: 18, fontFamily: "Inter-Regular" }}>Hello, Brayhan</Text>
                    </View>
                    <TouchableHighlight underlayColor="white" style={styles.TouchableArrow}>
                        <View style={[styles.SettingsHeaderContainerImgBox]}>
                            <Image style={[styles.Arrow, { width: 18, height: 18 }]} source={Icons.Gift} />
                        </View>
                    </TouchableHighlight>
                </View>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }} contentContainerStyle={styles.Scroll}>
                    <View style={styles.SettingsPictureContainer}>
                        <View style={styles.SettingsPictureImgBox}>
                            <Image style={styles.SettingsPicture} source={Img.Avatar} />
                        </View>
                    </View>
                    <View style={styles.Form}>
                        <TouchableHighlight ref={this.myRefs} underlayColor="white">
                            <View style={[styles.InputContainerBox, { borderWidth: hasBorder ? 1 : 0, borderColor: isFullNameOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}>
                                <Image style={styles.InputImage} source={isFullNameOn ? Icons.Login.UserOn : Icons.Login.User} />
                                {isTextField ?
                                    <TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" style={styles.Input} placeholder="Full Name" onChangeText={(value) => this.handleFullNameOnChange(value)} />
                                    :
                                    <Text style={{ color: "rgba(000,000,000,0.6)", fontFamily: "Inter-Regular", paddingLeft: 15 }}>{"Brayhan De Aza"}</Text>
                                }
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight ref={this.myRefs} underlayColor="white">
                            <View style={[styles.InputContainerBox, { borderWidth: hasBorder ? 1 : 0, borderColor: isEmailOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}>
                                <Image style={styles.InputImage} source={isEmailOn ? Icons.Login.EmailOn : Icons.Login.Email} />
                                {isTextField ?
                                    <TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" style={styles.Input} placeholder="Email" onChangeText={(value) => this.handleEmailOnChange(value)} />
                                    :
                                    <Text style={{ color: "rgba(000,000,000,0.6)", fontFamily: "Inter-Regular", paddingLeft: 15 }}>{"brayhandeaza@email.com"}</Text>
                                }
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight ref={this.myRefs} underlayColor="white">
                            <View style={[styles.InputContainerBox, { borderWidth: hasBorder ? 1 : 0, borderColor: isPhoneOn ? "#54b77c" : "rgba(000,000,000,0.1)" }]}>
                                <Image style={styles.InputImage} source={isPhoneOn ? Icons.Login.PhoneOn : Icons.Login.Phone} />
                                {isTextField ?
                                    <TextInput placeholderTextColor="#747374" textContentType="oneTimeCode" keyboardType="number-pad" maxLength={14} style={styles.Input} placeholder="Phone" value={this.state.phone.replace(/^(\d{3})(\d{3})(\d)+$/, "($1) $2-$3")} onChangeText={(value) => this.handlePhoneOnChange(value)} />
                                    :
                                    <Text style={{ color: "rgba(000,000,000,0.6)", fontFamily: "Inter-Regular", paddingLeft: 15 }}>{"(646) 982-73-56"}</Text>
                                }
                            </View>
                        </TouchableHighlight>
                    </View>
                    {
                        isTextField ?
                            <TouchableHighlight style={styles.Touchable} underlayColor="#f6f6f6" onPress={(res) => this.handleUpdateOnPress("_Alretation", "isAlteration")}>
                                <Text style={[styles.IconsOptionText, { color: "rgb(112,112,112)", fontSize: 25, fontWeight: "600" }]}>{"Update"}</Text>
                            </TouchableHighlight>
                            :
                            <TouchableHighlight onPress={this.handleEdit}>
                                <Text style={{ color: "rgba(43, 169, 123, 1)", fontSize: 18, textTransform: "capitalize", textDecorationLine: "underline" }}>{!isSuccefullyUpdated ? "Update Value" : ""}</Text>
                            </TouchableHighlight>
                    }
                    <Text style={{ color: "green", fontSize: 15 }}>{isSuccefullyUpdated ? "Succefully updated" : ""}</Text>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Settings: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    SettingsHeaderContainer: {
        width: "100%",
        height: 100,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    SettingsHeaderContainerImgBox: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(84,183,124,0.15)",
        borderRadius: 50,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    Scroll: {
        paddingBottom: 85,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    SettingsHeaderContainerGift: {
        width: 20,
        height: 20,
    },
    SettingsHeaderText: {
        fontSize: 24,
        fontWeight: "600"
    },
    SettingsPictureContainer: {
        width: "100%",
        height: 200,
        paddingTop: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    SettingsPicture: {
        width: 135,
        height: 135,
        borderRadius: 100,
    },
    SettingsPictureImgBox: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: "rgba(43, 169, 123, 0.14)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    SettingsHeaderText: {
        fontSize: 18,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600"
    },
    Form: {
        width: "100%",
        marginTop: 30,
        paddingLeft: 10,
        paddingRight: 20,
    },
    Input: {
        width: "100%",
        height: 50,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "red"
    },
    InputBox: {
        width: "90%",
        height: 75,
        paddingTop: 15,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    },
    ProfileHeaderText: {
        fontSize: 18,
        color: "rgba(000,000,000, 0.6)",
        fontWeight: "600"
    },
    ProfileTitlesBox: {
        width: "100%",
        height: 75,
        borderBottomWidth: 0.6,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    Touchable: {
        width: 300,
        height: 60,
        borderRadius: 10,
        // marginTop: 5,
        marginBottom: 20,
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgba(112,112,112,0.3)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ItemsImage: {
        width: 40,
        height: 40,
        marginBottom: 10,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

    },
    ItemsOption: {
        width: "100%",
        height: 70,

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    IconsOptionText: {
        paddingBottom: 5

    },
    TouchableArrow: {
        width: 75,
        height: 100,
        paddingBottom: 10,

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    Arrow: {
        width: 25,
        height: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    InputContainerBox: {
        height: 60,
        paddingLeft: 25,
        marginBottom: 20,
        borderRadius: 5,

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    InputImage: {
        width: 25,
        height: 25
    },
    Input: {
        width: "70%",
        height: 50,
        paddingLeft: 10,
        marginLeft: 5,
        borderRadius: 5,

        borderColor: "rgba(000,000,000,0.3)",
    },
})

const mapStateToProps = (state) => {
    return {
        state,
    }
}

export default connect(mapStateToProps)(Settings)