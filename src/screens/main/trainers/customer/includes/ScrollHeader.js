import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React from 'react';

//constants
import {SIZE, SIZES} from '../../../../../theme/theme';

//images and logos
import ArrowLeft from '../../../../../assets/icons/arrow-left.svg';
import Edit from '../../../../../assets/icons/edit.svg';
import ShareIcon from '../../../../../assets/icons/share.svg';

const ScrollHeader = ({
    scrollY,
    navigation,
    setModalVisible,
    setEdit,
    ShareUrl,
}) => {
    return (
        <View
            style={[
                styles.commonButtonContainer,
                {
                    backgroundColor:
                        scrollY >= Dimensions.get('window').height * 0.35
                            ? '#F7F7F7'
                            : 'transparent',
                    borderBottomWidth:
                        scrollY >= Dimensions.get('window').height * 0.35
                            ? SIZE(1)
                            : 0,
                    borderColor: '#d3d3d3',
                },
            ]}>
            <View style={styles.topButtonLeft}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    activeOpacity={0.8}
                    style={styles.commonButtonMain}>
                    <View style={styles.commonTopButtons}>
                        <ArrowLeft width={'100%'} height={'100%'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.topButtonRight}>
                <TouchableOpacity
                    onPress={() => {
                        ShareUrl();
                    }}
                    activeOpacity={0.8}
                    style={[styles.commonButtonMain, {marginRight: SIZE(16)}]}>
                    <View style={styles.commonTopButtons}>
                        <ShareIcon width={'100%'} height={'100%'} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setEdit(true);
                        setModalVisible(true);
                    }}
                    activeOpacity={0.8}
                    style={styles.commonButtonMain}>
                    <View style={styles.commonTopButtons}>
                        <Edit width={'100%'} height={'100%'} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ScrollHeader;

const styles = StyleSheet.create({
    commonButtonContainer: {
        position: 'absolute',
        zIndex: 1000,
        padding: SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SIZES.width,
        // paddingHorizontal: SIZE(16),
        // paddingVertical: SIZE(22),
    },
    topButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    commonButtonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZE(40),
        height: SIZE(40),
        padding: SIZE(8),
        backgroundColor: '#FFF',
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(40),
    },
    commonTopButtons: {
        width: SIZE(24),
        height: SIZE(24),
    },
    topButtonRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
