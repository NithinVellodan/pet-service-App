import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, {useContext} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

//constants
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';

//images and logos
import UpcomingLogo from '../../assets/logos/upcoming.svg';

const Upcoming = () => {
    const navigation = useNavigation();
    const {state, dispatch} = useContext(Context);

    const toast = useToast();

    const updateUserData = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    const upcomingArray = [
        {
            id: 1,
            description:
                'Pellentesque lobortis at ut cras risus ornare eu lorem in. ',
        },
        {
            id: 2,
            description:
                'Pharetra aliquam massa sed eget turpis porttitor pharetra sed amet. ',
        },
        {
            id: 3,
            description:
                'Imperdiet turpis bibendum id morbi id. Vitae sed nunc vitae purus enim fermentum odio lacus. ',
        },
        {
            id: 4,
            description:
                'Enim aliquet vitae odio imperdiet natoque cras mauris ultrices ac.  ',
        },
        {
            id: 5,
            description:
                'Placerat id lectus viverra placerat quam fermentum nullam condimentum. ',
        },
    ];
    return (
        <View style={styles.mainContainer}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.subContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.imageContainer}>
                        <UpcomingLogo width={'100%'} height={'100%'} />
                    </View>
                    <View style={styles.upcomingTextContainer}>
                        <Text
                            allowFontScaling={false}
                            style={styles.upcomingText}>
                            Upcoming Features...
                        </Text>
                    </View>
                </View>
                <View style={styles.middleContainer}>
                    <View style={styles.topTextContainer}>
                        <Text allowFontScaling={false} style={styles.topText}>
                            Pellentesque lobortis at ut cras risus ornare eu
                            lorem in. Pharetra aliquam massa sed eget turpis
                            porttitor pharetra sed amet. Imperdiet turpis
                            bibendum id morbi id.
                        </Text>
                    </View>
                    <View style={styles.middleTextContainer}>
                        {upcomingArray.map((item, index) => {
                            return (
                                <View
                                    style={[
                                        styles.middleSub,
                                        index === upcomingArray.length - 1 && {
                                            marginBottom: SIZE(-10),
                                        },
                                    ]}
                                    key={item.id}>
                                    <View style={styles.dot}></View>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.middleText}>
                                        {/* {'\u2022'}{' '} */}
                                        <Text>{item.description}</Text>
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.bottomTextContainer}>
                        <Text allowFontScaling={false} style={styles.topText}>
                            Vitae sed nunc vitae purus enim fermentum odio
                            lacus. Enim aliquet vitae odio imperdiet natoque
                            cras mauris ultrices ac. Placerat id lectus viverra
                            placerat quam fermentum nullam condimentum.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            {!state.userData.notified ? (
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        activeOpacity={0.8}
                        style={styles.leftButton}>
                        <Text allowFontScaling={false} style={styles.leftText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (!state.userData.notified) {
                                updateUserData({
                                    ...state.userData,
                                    notified: true,
                                });
                            }
                            navigation.goBack();
                            toast.show(
                                'You Will Be Notified When New Feature Available',
                                {
                                    type: 'success',
                                },
                            );
                        }}
                        activeOpacity={0.8}
                        style={styles.rightButton}>
                        <Text allowFontScaling={false} style={styles.rightText}>
                            Notify Me
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

export default Upcoming;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    subContainer: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(120),
    },
    topContainer: {
        alignItems: 'center',
        marginBottom: SIZE(24),
    },
    imageContainer: {
        width: SIZE(198),
        height: SIZE(146),
        marginBottom: SIZE(32),
    },
    upcomingText: {
        color: '#242424',
        fontSize: SIZE(24),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },
    topText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.medium,
    },
    middleTextContainer: {
        marginVertical: SIZE(20),
    },
    middleSub: {
        flexDirection: 'row',
    },
    dot: {
        backgroundColor: '#757575',
        height: SIZE(4),
        width: SIZE(4),
        borderRadius: SIZE(4),
        // alignSelf: 'center',
        marginTop: SIZE(10),
        marginRight: SIZE(10),
    },
    middleText: {
        color: '#757575',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(10),
        width: '95%',
    },
    bottomTextContainer: {},
    bottomContainer: {
        backgroundColor: '#F7F7F7',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(60),
        position: 'absolute',
        paddingHorizontal: SIZE(32),
        bottom: 0,
        paddingVertical: SIZE(24),
    },
    leftButton: {
        paddingHorizontal: SIZE(30),
        paddingVertical: SIZE(12),
        alignItems: 'center',
        borderWidth: SIZE(1),
        borderColor: '#003459',
        borderRadius: SIZE(8),
        flex: 1,
        marginRight: SIZE(24),
        backgroundColor: '#F7F7F7',
    },
    leftText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    rightButton: {
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(14),
        alignItems: 'center',
        borderRadius: SIZE(8),
        backgroundColor: '#009FD3',
        flex: 1,
    },
    rightText: {
        color: '#FFF',
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
