import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

export default function PetFacilities({
    selectedFacilities,
    errorMessage,
    setSelect,
    facility,
    handleItemPress2,
}) {
    return (
        <View>
            <View>
                <Text
                    allowFontScaling={false}
                    style={{
                        color: '#686868',
                        fontWeight: '500',
                        fontFamily: FONTS.regular,
                    }}>
                    Facilities
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                {facility?.map(item => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={item.id}
                        style={[
                            styles.facilitiesContainer,
                            selectedFacilities.some(
                                facility => facility.id === item.id,
                            ) && {
                                backgroundColor: '#EAF7FF',
                                borderColor: '#98C1D9',
                            },
                        ]}
                        onPress={() => {
                            setSelect(true);
                            handleItemPress2(item);
                        }}>
                        <View>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    styles.fontFacility,
                                    selectedFacilities.some(
                                        facility => facility.id === item.id,
                                    ) && {color: '#003459'},
                                ]}>
                                {item.title}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            {errorMessage?.facilities && (
                <Text style={styles.errorMessage}>
                    {errorMessage?.facilities}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    facilitiesContainer: {
        paddingHorizontal: SIZE(9),
        paddingVertical: SIZE(8),
        marginRight: SIZE(12),
        backgroundColor: '#fff',
        borderWidth: SIZE(1),
        borderRadius: SIZE(6),
        borderColor: '#D3D3D3',
        marginTop: SIZE(12),
        fontSize: SIZE(12),
        alignItems: 'center',
    },

    fontFacility: {
        fontFamily: FONTS.regular,
        color: '#242424',
        fontWeight: '600',
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(12),
        marginTop: SIZE(5),
        textAlign: 'right',
        marginRight: SIZE(10),
    },
});
