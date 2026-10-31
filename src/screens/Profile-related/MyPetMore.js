import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import DoubleColorHeading from '../../components/headings/DoubleColorHeading';
import DescriptionHeading from '../../components/headings/DescriptionHeading';
import NormalForm from '../../components/forms/NormalForm';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native';

const MyPetMore = ({
    fromList,
    setModalContent,
    isEdit,
    respondData,
    setRespondData,
    setHabitsData,
    setLikesData,
    habitsData,
    likesData,
    nameAs,
    fromMain,
    editPet,
    submitLoading,
}) => {
    const [errorMessage, setErrorMessage] = useState({
        respond_is: false,
        likes_is: false,
        habits_is: false,
    });

    const HandleChoose = item => {
        setErrorMessage(prevState => {
            const updatedState = {
                ...prevState,
                respond_is: respondData == '',
                likes_is: likesData == '',
                habits_is: habitsData == '',
            };

            if (
                !updatedState.respond_is &&
                !updatedState.likes_is &&
                !updatedState.habits_is
            ) {
                if (fromList) {
                    setModalContent('ConfirmationPageTwo');
                } else if (fromMain) {
                    setModalContent('ConfirmationTwo');
                } else if (isEdit) {
                    editPet();
                }
            }

            return updatedState;
        });
    };
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    bounces={false}
                    scrollEnabled={fromMain ? true : false}
                    keyboardShouldPersistTaps="handled"
                    data={[1]}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View>
                            <DoubleColorHeading
                                firstTitle={isEdit ? 'Edit' : 'Add'}
                                secondTitle="More Details"
                                isCenter={true}
                            />
                            <DescriptionHeading text="Please Enter Your Pet Details" />
                            <View style={{zIndex: -10}}>
                                <NormalForm
                                    label={`${nameAs} Responds to`}
                                    type="Text"
                                    placeholder="Enter Details"
                                    pricePerDay={respondData}
                                    setPricePerDay={setRespondData}
                                    marginTop={25}
                                    setErrorMessage={setErrorMessage}
                                />
                                {errorMessage.respond_is && (
                                    <Text style={styles.errorMessage}>
                                        Please enter Details
                                    </Text>
                                )}
                            </View>
                            <View style={styles.formContainer}>
                                <NormalForm
                                    label={`${nameAs}'s Likes`}
                                    type="Text"
                                    placeholder="Enter Details"
                                    multiline={true}
                                    numberOfLines={3}
                                    descriptionForm={true}
                                    description={likesData}
                                    setDescription={setLikesData}
                                    marginTop={25}
                                    setErrorMessage={setErrorMessage}
                                />
                                {errorMessage.likes_is && (
                                    <Text style={styles.errorMessage}>
                                        Please enter Details
                                    </Text>
                                )}
                            </View>
                            <View style={styles.formContainer}>
                                <NormalForm
                                    label={`${nameAs}'s Worst Habits`}
                                    type="Text"
                                    placeholder="Enter Details"
                                    multiline={true}
                                    numberOfLines={3}
                                    descriptionForm={true}
                                    description={habitsData}
                                    setDescription={setHabitsData}
                                    marginTop={25}
                                    setErrorMessage={setErrorMessage}
                                />
                                {errorMessage.habits_is && (
                                    <Text style={styles.errorMessage}>
                                        Please enter Details
                                    </Text>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={submitLoading}
                    onPress={() => {
                        if (fromList) {
                            setModalContent('addPetModal');
                        } else if (fromMain) {
                            setModalContent('AddYourPetDetails');
                        } else {
                            setModalContent('add-pet');
                        }
                    }}
                    style={styles.skipContainer}>
                    <Text allowFontScaling={false} style={styles.skipText}>
                        Previous
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={submitLoading}
                    onPress={() => {
                        HandleChoose();
                    }}
                    style={styles.nextContainer}>
                    {submitLoading ? (
                        <ActivityIndicator size={'small'} color={'#fff'} />
                    ) : (
                        <Text allowFontScaling={false} style={styles.nextText}>
                            Save
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </>
    );
};

export default MyPetMore;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        paddingHorizontal: SIZE(24),
        paddingTop: SIZE(50),
        flex: 1,
        borderTopRightRadius: SIZE(32),
        borderTopLeftRadius: SIZE(32),
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        paddingVertical: SIZE(20),
        paddingHorizontal: SIZE(24),
    },
    skipContainer: {
        backgroundColor: '#f7f7f7',
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        borderWidth: SIZE(1),
        borderColor: '#009FD3',
        width: SIZE(174),
    },
    skipText: {
        color: '#009FD3',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
    },
    nextContainer: {
        alignItems: 'center',
        paddingVertical: SIZE(14),
        borderRadius: SIZE(8),
        width: SIZE(174),
        backgroundColor: '#003459',
    },
    nextText: {
        color: '#fff',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(16),
        textAlign: 'center',
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
