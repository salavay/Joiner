import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, Pressable, Image, Platform, ActionSheetIOS} from 'react-native';
import {commonStyle} from "../../../assets/style/common"
import CustomButton from "../../elements/button/CustomButton";
import CustomInput from "../../elements/input/CustomInput";
import RNDateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';


function CreateFirstPage({navigation}) {

    const initState = {
        name: '',
        date: new Date(),
        segment: {name: 'Default', value: 'default'},
        capacity: '',
        price: ''
    }
    const [state, setState] = useState(initState);
    const onChangeHandler = (name, value) => {
        console.log('Name = ', name, "Value = ", value);
        setState({...state, [name]: value});
    }

    const androidDatePickers = (
        <View style={styles.datePickersWrapper}>
            <Pressable style={styles.androidDatePressable} onPress={() => DateTimePickerAndroid.open({
                value: new Date(),
                mode: "time",
                onChange: (e, date) => {
                    const result = state.date;
                    result.setDay(date.getDay());
                    result.setYear(date.getFullYear());
                    result.setMonth(date.getMonth());
                    setState({...state, date: result})
                }
            })}>
                <Text
                    style={styles.androidDateText}>{state.date ? Moment(state.date).format('DD.MM.YYYY') : 'Pick a date'}</Text>
            </Pressable>
            <Pressable style={styles.androidDatePressable} onPress={() => DateTimePickerAndroid.open({
                value: new Date(),
                mode: "time",
                onChange: (e, date) => {
                    const result = state.date;
                    result.setMinutes(date.getMinutes());
                    result.setHours(date.getHours());
                    setState({...state, date: result})
                }
            })}>
                <Text
                    style={styles.androidDateText}>{state.date ? Moment(state.date).format('HH:mm') : 'Pick a time'}</Text>
            </Pressable>
        </View>
    )

    const iosDatePickers = (
        <View style={styles.datePickersWrapper}>
            <RNDateTimePicker
                value={state.date} mode={'datetime'}
                style={{flex: 1}}
                onChange={(e, date) => onChangeHandler('date', date)}
            />
        </View>
    )

    return (
        <View style={commonStyle.paddedContainer}>
            <View style={styles.section}>
                <Text style={styles.label}>Name</Text>
                <CustomInput name={'name'} placeholder={'Event name'} onChange={onChangeHandler}></CustomInput>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Date</Text>
                {Platform.OS === 'ios' ? iosDatePickers : androidDatePickers}
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Segment</Text>
                {Platform.OS === 'ios' ?
                    <Pressable onPress={() => {
                        ActionSheetIOS.showActionSheetWithOptions(
                            {
                                options: segments.map(segment => segment.name)
                            },
                            buttonIndex => {
                                onChangeHandler('segment', segments[buttonIndex]);
                            })
                    }
                    }>
                        <View style={styles.iosSegmentPickerWrapper}>
                            <Text>{state.segment.name}</Text>
                        </View>
                    </Pressable>
                    :
                    <Picker onValueChange={(value, index) => onChangeHandler('segment', segments[index])}>
                        {segments.map(segment =>
                            (<Picker.Item key={segment.value} label={segment.name} value={segment.value}/>)
                        )}
                    </Picker>
                }
            </View>
            <View style={styles.section}>
                <View>
                    <View>
                        <Text style={styles.label}>Capacity</Text>
                        <CustomInput placeholder={'10'}
                                     keyboardType={'numeric'}
                                     name={'capacity'}
                                     onChange={onChangeHandler}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Price</Text>
                        <CustomInput placeholder={'Free'}
                                     keyboardType={'numeric'}
                                     name={'price'}
                                     onChange={onChangeHandler}
                        />
                    </View>
                </View>
            </View>

            <CustomButton backgroundColor={'#000000'}
                          text={'NEXT'}
                          color={'#FFFFFF'}
                          onPress={() => navigation.navigate('CreateSecondPage')}
                          activeOpacity={0.8}
            />
        </View>
    );
}

export default CreateFirstPage;

const styles = StyleSheet.create({
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
        padding: 5,
        justifyContent: "center",
        fontSize: 20,
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
    priceAndCapacityWrapper: {
        flexDirection: "row"
    },
    priceOrCapacity: {
        flex: 1
    }
})

const segments = [
    {value: 'sport', name: 'Sports'},
    {value: 'standup', name: 'Stand-Up'},
    {value: 'hike', name: 'Hike'},
    {value: 'party', name: 'Party'},
]