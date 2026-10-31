import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// theme
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';

// components
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
export default function ConfirmationPage({
    setDetailScreens,
    fromList,
    addPBreed,
    setEditModalVisible,
    setModalContent,
    clearAll,
    submitLoading,
}) {
    // Animate
    const [animation] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
        }).start();
    }, []);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0],
    });
    // Animate

    return (
        <ScrollView bounces={false} style={styles.container}>
            <Animated.View style={{transform: [{translateX}]}}>
                <DoubleColorHeading
                    secondTitle={'Confirmation'}
                    isCenter={true}
                />
                <DescriptionHeading
                    isCenter={'center'}
                    text={
                        'It has come to our attention that there may have been some confusion regarding the total cost calculation. In order to clarify this matter, we would like to draw your attention to our terms and conditions as displayed on our platform.'
                    }
                />
                <DescriptionHeading
                    isCenter={'center'}
                    text={
                        'Please be aware that a fixed service charge will be added to the total cost of the services rendered. This service charge is in accordance with our policies. We greatly appreciate your trust in us and understand that transparency is vital in maintaining a strong relationship with our valued customers.'
                    }
                />
                <DescriptionHeading
                    isCenter={'center'}
                    text={
                        'We greatly appreciate your trust in us and understand that transparency is vital in maintaining a strong relationship with our valued customers.'
                    }
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        disabled={submitLoading}
                        onPress={() => {
                            if (fromList === true) {
                                setEditModalVisible(false);
                                setModalContent('PlaceDetail');
                                clearAll();
                            } else {
                                setDetailScreens('addPet');
                            }
                        }}
                        activeOpacity={0.8}
                        style={styles.skipContainer}>
                        <Text style={styles.skipText}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={submitLoading}
                        onPress={() => {
                            if (fromList === true) {
                                // setEditModalVisible(false);
                                // setModalContent('PlaceDetail');
                                addPBreed();
                            } else {
                                addPBreed();
                            }
                        }}
                        activeOpacity={0.8}
                        style={styles.nextContainer}>
                        {submitLoading ? (
                            <ActivityIndicator size={'small'} color={'#fff'} />
                        ) : (
                            <Text style={styles.nextText}>Accept</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(32),
        paddingVertical: SIZE(32),
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SIZE(30),
    },
    skipContainer: {
        backgroundColor: '#F7F7F7',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: 1,
        borderColor: '#009FD3',
        paddingHorizontal: SIZE(32),
        width: '48%',
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    nextContainer: {
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(32),
        backgroundColor: '#003459',
        width: '48%',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
});
