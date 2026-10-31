import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
//constants
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
//images and logos
import TickMark from '../../../../assets/icons/tick-circle 2.svg';

export default function ClaimNowButton({
    provider_details,
    setUserModal,
    state,
    userIdFromEmail,
    userId,
    claimed,
    pk,
    productName,
    productImage,
    productSubTitle,
    setScreen,
}) {
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                disabled={
                    claimed || userIdFromEmail === null
                        ? true
                        : false || userId === null
                        ? true
                        : false
                }
                onPress={() => {
                    if (state.userData.is_login) {
                        const chatType = 'donate';
                        navigation.navigate('EcommerceChatInner', {
                            item: {
                                otherUser: {
                                    id: userIdFromEmail,
                                    name: provider_details?.name,
                                },
                            },
                            userId: userId,
                            chatType: chatType,
                            profile: provider_details?.image,
                            pk: pk,
                            productName: productName,
                            productImage: productImage,
                            productSubTitle: productSubTitle,
                        });
                    } else {
                        setUserModal(true);
                        setScreen('login');
                    }
                }}
                activeOpacity={0.8}
                style={styles.subContainer}>
                {claimed ? (
                    <View style={styles.iconStyle}>
                        <TickMark width={SIZE(20)} height={SIZE(20)} />
                        <Text
                            style={[styles.claimText, {marginLeft: SIZE(16)}]}>
                            Claimed
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.claimText}>Chat & Claim</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: SIZE(33),
        paddingHorizontal: SIZE(16),
        backgroundColor: 'transparent',
        borderColor: '#E2E2E2',
    },
    subContainer: {
        alignItems: 'center',
        backgroundColor: '#009FD3',
        paddingVertical: SIZE(16),
        borderRadius: SIZE(8),
    },
    claimText: {fontFamily: FONTS.bold, fontSize: SIZE(16), color: '#FFFFFF'},
    iconStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
