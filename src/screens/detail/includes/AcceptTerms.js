import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import CheckBoxCommon from '../../common/CheckBox';

//svg
import InfoCircle from '../../../assets/icons/info-circle.svg';

export default function AcceptTerms({
    isChecked2,
    errorMessage,
    setChecked2,
    handlePress,
}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: SIZE(20),
                marginBottom:
                    !isChecked2 && errorMessage?.isChecked2 ? 0 : SIZE(20),
                flex: 1,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <CheckBoxCommon setState={setChecked2} />
                <View>
                    <Text
                        allowFontScaling={false}
                        style={{
                            color: '#686868',
                            fontFamily: FONTS.medium,
                        }}>
                        Accept the Terms & Condition
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                hitSlop={0.7}
                style={{width: SIZE(20), height: SIZE(20)}}>
                <InfoCircle
                    width={'100%'}
                    height={'100%'}
                    onPress={() => {
                        handlePress();
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});
