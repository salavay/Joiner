import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Platform, ActionSheetIOS, ScrollView} from 'react-native';
import {commonStyle} from "../../../assets/style/common"
import CustomButton from "../../elements/button/CustomButton";
import CustomInput from "../../elements/input/CustomInput";
import RNDateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {MeetFormContext} from "./MeetFormContext";
import {meetSegments} from "../../elements/meets/MeetConstants";


function CreateFirstPage({navigation}) {
    const {meetForm, setMeetForm, onChangeHandler} = useContext(MeetFormContext);


    const androidDatePickers = (
        <View style={styles.datePickersWrapper}>
            <Pressable style={styles.androidDatePressable} onPress={() => DateTimePickerAndroid.open({
                value: meetForm.date,
                mode: "date",
                onChange: (e, date) => {
                    const result = meetForm.date;
                    result.setDate(date.getDate());
                    result.setYear(date.getFullYear());
                    result.setMonth(date.getMonth());
                    onChangeHandler('date', result);
                }
            })}>
                <Text
                    style={styles.androidDateText}>{meetForm.date ? Moment(meetForm.date).format('DD.MM.YYYY') : 'Pick a date'}</Text>
            </Pressable>
            <Pressable style={styles.androidDatePressable} onPress={() => DateTimePickerAndroid.open({
                value: meetForm.date,
                mode: "time",
                onChange: (e, date) => {
                    const result = meetForm.date;
                    result.setMinutes(date.getMinutes());
                    result.setHours(date.getHours());
                    onChangeHandler('date', result);
                }
            })}>
                <Text
                    style={styles.androidDateText}>{meetForm.date ? Moment(meetForm.date).format('HH:mm') : 'Pick a time'}</Text>
            </Pressable>
        </View>
    )

    const iosDatePickers = (
        <View style={styles.datePickersWrapper}>
            <RNDateTimePicker
                value={meetForm.date} mode={'datetime'}
                style={{flex: 1}}
                onChange={(e, date) => onChangeHandler('date', date)}
            />
        </View>
    )

    return (
        <View style={commonStyle.paddedContainer}>
            <ScrollView style={{flex: 1}}
                        showsVerticalScrollIndicator={false}>
                <View style={styles.titlesWrapper}>
                    <Text style={styles.title}>Event Creation</Text>
                    <Text style={styles.titleAdditional}>Please enter event details</Text>
                </View>
                <View style={styles.section}>
                    <CustomInput name={'name'} placeholder={'Event name'} onChange={onChangeHandler}></CustomInput>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Date</Text>
                    {Platform.OS === 'ios' ? iosDatePickers : androidDatePickers}
                </View>
                <View style={styles.section}>
                    {Platform.OS === 'ios' ?
                        <Pressable onPress={() => {
                            ActionSheetIOS.showActionSheetWithOptions(
                                {
                                    options: meetSegments.map(segment => segment.name)
                                },
                                buttonIndex => {
                                    onChangeHandler('segment', meetSegments[buttonIndex]);
                                })
                        }
                        }>
                            <View style={styles.iosSegmentPickerWrapper}>
                                <Text>{meetForm.segment.name}</Text>
                            </View>
                        </Pressable>
                        :
                        <View style={styles.androidSegmentPicker}>
                            <Picker selectedValue={meetForm.segment.value}
                                    onValueChange={(value, index) => onChangeHandler('segment', meetSegments[index])}
                            >
                                {meetSegments.map(segment =>
                                    (<Picker.Item key={segment.value} label={segment.name} value={segment.value}/>)
                                )}
                            </Picker>
                        </View>
                    }
                </View>
                <View style={styles.section}>
                    <View style={styles.priceAndCapacityWrapper}>
                        <View style={styles.priceOrCapacity}>
                            <Text style={styles.label}>Capacity</Text>
                            <CustomInput placeholder={'10'}
                                         keyboardType={'numeric'}
                                         name={'capacity'}
                                         onChange={onChangeHandler}
                            />
                        </View>
                        <View style={styles.priceOrCapacity}>
                            <Text style={styles.label}>Price</Text>
                            <CustomInput placeholder={'Free'}
                                         keyboardType={'numeric'}
                                         name={'price'}
                                         onChange={onChangeHandler}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomButtonsWrapper}>
                <CustomButton backgroundColor={'#000000'}
                              text={'Cancel'}
                              color={'#F2F2F2'}
                              onPress={() => navigation.navigate('Home')}
                              activeOpacity={0.8}
                />
                <CustomButton backgroundColor={'#AF9CFF'}
                              text={'Next'}
                              color={'#000'}
                              onPress={() => navigation.navigate('CreateSecondPage')}
                              activeOpacity={0.8}
                />
            </View>


        </View>
    );
}

export default CreateFirstPage;

const styles = StyleSheet.create({
    titlesWrapper: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 20
    },
    title: {
        fontSize: 35,
        fontFamily: 'Raleway_700Bold',
        marginBottom: 10
    },
    titleAdditional: {
        fontSize: 18,
        fontFamily: 'Raleway_300Light',
        color: '#7A7A7A'
    },
    label: {
        fontFamily: "Raleway_400Regular",
        fontSize: 20,
        marginBottom: 10
    },
    section: {
        marginBottom: 20,
    },
    datePickersWrapper: {
        flexDirection: "row",
    },
    androidDatePressable: {
        marginRight: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    androidDateText: {
        fontFamily: "Raleway_400Regular",
        justifyContent: "center",
        fontSize: 18,
    },
    iosSegmentPickerWrapper: {
        borderRadius: 16,
        height: 50,
        width: '100%',
        backgroundColor: '#dadada',
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    androidSegmentPicker: {
        borderRadius: 16,
        height: 50,
        width: '100%',
        backgroundColor: '#dadada',
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    priceAndCapacityWrapper: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    priceOrCapacity: {
        width: '48%'
    },
    bottomButtonsWrapper: {
        marginTop: 'auto',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    }
})

