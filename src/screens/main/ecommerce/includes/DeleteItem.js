import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZE} from '../../../../theme/theme';
import DoubleColorHeading from '../../../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../../../components/headings/DescriptionHeading';
import TwoButton from './TwoButton';
import CloseIcon from '../../../../assets/icons/closedark.svg';
import TrashIcon from '../../../../assets/icons/trashl.svg';
import DisableIcon from '../../../../assets/icons/battery-disable.svg';

const DeleteItem = ({close, enable_disable, disable, deleted}) => {
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
                    secondTitle={disable ? 'Disable Item' : 'Delete Item'}
                    isCenter={true}
                />
                <View style={{alignSelf: 'center', marginTop: SIZE(24)}}>
                    {disable ? (
                        <DisableIcon width={SIZE(100)} height={SIZE(100)} />
                    ) : (
                        <TrashIcon width={SIZE(100)} height={SIZE(100)} />
                    )}
                </View>
                <DescriptionHeading
                    text={
                        disable
                            ? 'Are you sure you want to disable?'
                            : 'Are you sure you want to delete?'
                    }
                    isCenter={true}
                />
                <View style={{marginTop: SIZE(24)}}>
                    <TwoButton
                        leftText={'Cancel'}
                        onPressL={() => {
                            close(false);
                        }}
                        rightText={disable ? 'Disable' : 'Delete'}
                        onPressR={() => {
                            if (disable) {
                                enable_disable && enable_disable();
                            } else {
                                deleted && deleted();
                            }
                            close(false);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default DeleteItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZE(40),
        paddingHorizontal: SIZE(32),
        width: SIZE(347),
    },
});
