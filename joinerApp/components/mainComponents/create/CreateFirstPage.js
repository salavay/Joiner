import React, {useContext} from 'react';
import {
    ActionSheetIOS,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {commonStyle} from "../../../assets/style/common"
import CustomButton from "../../elements/button/CustomButton";
import CustomInput from "../../elements/input/CustomInput";
import RNDateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import {MeetFormContext} from "./MeetFormContext";
import {meetSegments, meetStyles} from "../../elements/meets/MeetConstants";
import CheckBox from "expo-checkbox";
import {theme} from "../../../context/ThemeContext";


function CreateFirstPage({navigation}) {
    const {meetForm, setMeetForm, onChangeHandler} = useContext(MeetFormContext);


    const androidDatePickers = (name) => (<View style={styles.datePickersWrapper}>
        <Pressable style={styles.androidDatePressable} onPress={() => DateTimePickerAndroid.open({
            value: meetForm[name], mode: "date", onChange: (e, date) => {
                const result = meetForm[name];
                result.setDate(date.getDate());
                result.setYear(date.getFullYear());
                result.setMonth(date.getMonth());
                onChangeHandler(name, result);
            }
        })}>
            <Text
                style={styles.androidDateText}>{Moment(meetForm[name]).format('DD.MM.YYYY')}</Text>
        </Pressable>
        <Pressable style={styles.androidDatePressable} onPress={() => DateTimePickerAndroid.open({
            value: meetForm[name], mode: "time", onChange: (e, date) => {
                const result = meetForm[name];
                result.setMinutes(date.getMinutes());
                result.setHours(date.getHours());
                onChangeHandler(name, result);
            }
        })}>
            <Text
                style={styles.androidDateText}>{Moment(meetForm[name]).format('HH:mm')}</Text>
        </Pressable>
    </View>)

    const androidSegmentPicker = (<View style={styles.androidSegmentPicker}>
        <Picker selectedValue={meetForm.segment}
                onValueChange={(value, index) => onChangeHandler('segment', meetSegments[index].value)}
        >
            {meetSegments.map(segment => (<Picker.Item key={segment.value}
                                                       label={segment.name}
                                                       value={segment.value}/>))}
        </Picker>
    </View>)

    const iosDatePickers = (name) => (<View style={styles.datePickersWrapper}>
        <RNDateTimePicker
            value={meetForm[name]} mode={'datetime'}
            style={{flex: 1}}
            onChange={(e, date) => onChangeHandler(name, date)}
        />
    </View>)

    const iosSegmentPicker = (<Pressable
        onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions({
                options: meetSegments.map(segment => segment.name)
            }, buttonIndex => {
                onChangeHandler('segment', meetSegments[buttonIndex].value);
            })
        }}>
        <View style={styles.iosSegmentPickerWrapper}>
            <Text>{meetSegments.find(segment => segment.value === meetForm.segment).name}</Text>
        </View>
    </Pressable>)

    return (<View style={commonStyle.paddedContainer}>
        <KeyboardAvoidingView style={{flex: 1}}
                              behavior={'position'} enabled keyboardVerticalOffset={-60}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                fadingEdgeLength={100}
            >
                <View style={{flex: 1}}>
                    <View style={styles.titlesWrapper}>
                        <Text style={styles.title}>Event Creation</Text>
                        <Text style={styles.titleAdditional}>Please enter event details</Text>
                    </View>
                    <View style={styles.section}>
                        <CustomInput name={'name'} placeholder={'Event name'}
                                     onChange={onChangeHandler}></CustomInput>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Start date</Text>
                        {Platform.OS === 'ios' ? iosDatePickers('date') : androidDatePickers('date')}
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>End date</Text>
                        {Platform.OS === 'ios' ? iosDatePickers('endDate') : androidDatePickers('endDate')}
                    </View>
                    <View style={[styles.section, styles.multiSection]}>
                        <View style={styles.multiSectionItem}>
                            {Platform.OS === 'ios' ? iosSegmentPicker : androidSegmentPicker}
                        </View>
                        <Pressable style={[styles.multiSectionItem, {
                            alignItems: 'center',
                            flexDirection: 'row'
                        }]}
                                   onPress={() => onChangeHandler('isOffline', !meetForm.isOffline)}
                        >
                            <CheckBox value={meetForm.isOffline}
                                      color={meetForm.isOffline ? theme.colors.palette.violet : undefined}
                                      onValueChange={value => onChangeHandler('isOffline', value)}/>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 18,
                                fontFamily: 'Raleway_400Regular'
                            }}>Is Offline</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.section, styles.multiSection]}>
                        <View style={styles.multiSectionItem}>
                            <Text style={styles.label}>Capacity</Text>
                            <CustomInput placeholder={'10'}
                                         keyboardType={'numeric'}
                                         name={'capacity'}
                                         onChange={onChangeHandler}
                            />
                        </View>
                        <View style={styles.multiSectionItem}>
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
        </KeyboardAvoidingView>
        <View style={meetStyles.bottomButtonsWrapper}>
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
    </View>);
}

export default CreateFirstPage;

const styles = StyleSheet.create({
    titlesWrapper: {
        flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 30, marginTop: 20
    }, title: {
        fontSize: 35, fontFamily: 'Raleway_700Bold', marginBottom: 10
    }, titleAdditional: {
        fontSize: 18, fontFamily: 'Raleway_300Light', color: '#7A7A7A'
    }, label: {
        fontFamily: "Raleway_400Regular", fontSize: 20, marginBottom: 10
    }, section: {
        marginBottom: 20,
    }, datePickersWrapper: {
        flexDirection: "row",
    }, androidDatePressable: {
        marginRight: 20, alignItems: "center", justifyContent: "center",
    }, androidDateText: {
        fontFamily: "Raleway_400Regular", justifyContent: "center", fontSize: 18,
    }, iosSegmentPickerWrapper: {
        borderRadius: 16,
        height: 50,
        width: '100%',
        backgroundColor: '#dadada',
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5
    }, androidSegmentPicker: {
        borderRadius: 16,
        height: 50,
        width: '100%',
        backgroundColor: '#dadada',
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 5
    }, multiSection: {
        flexDirection: "row", justifyContent: "space-between"
    }, multiSectionItem: {
        width: '48%'
    }
})

