import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import CloseIcon from '../../../../assets/icons/close-icon-blue.svg';
import TrashIcon from '../../../../assets/icons/trash1.svg';
import TwoColorButtonDark from './TwoColorButtonDark';
import {Context} from '../../../../contexts/Store';
Context;

const DeleteCustomerModal = ({
    close,
    rmsPost,
    handleWishItem,
    itemStat,
    handlePress,
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    close(false);
                }}
                hitSlop={SIZE(5)}
                style={{position: 'absolute', top: SIZE(20), right: SIZE(20)}}>
                <CloseIcon width={SIZE(10)} height={SIZE(10)} />
            </TouchableOpacity>
            <View>
                <DoubleColorHeading
                    secondTitle={'Remove Items'}
                    isCenter={true}
                />
                <View style={{alignSelf: 'center', marginTop: SIZE(24)}}>
                    <TrashIcon width={SIZE(100)} height={SIZE(100)} />
                </View>
                <DescriptionHeading
                    text={'Are you Sure you want to Remove? '}
                    isCenter={true}
                />
                {itemStat.is_in_wishlist ? (
                    <View style={{marginTop: SIZE(24)}}>
                        <TwoColorButtonDark
                            leftText={'Cancel'}
                            onPressL={() => {
                                console.log('left');
                                close(false);
                            }}
                            rightText={'Remove'}
                            onPressR={() => {
                                console.log('right');
                                rmsPost('is cart remove');
                                close(false);
                                handlePress(itemStat);
                            }}
                        />
                    </View>
                ) : (
                    <View style={{marginTop: SIZE(24)}}>
                        <TwoColorButtonDark
                            leftText={'Remove'}
                            onPressL={() => {
                                rmsPost('is cart remove');
                                close(false);
                                handlePress(itemStat);
                            }}
                            rightText={'Move to Wishlist'}
                            onPressR={() => {
                                console.log('right');
                                handleWishItem();
                                rmsPost();
                                close(false);
                                handlePress(itemStat);
                            }}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default DeleteCustomerModal;

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(32),
        width: SIZE(347),
    },
});
