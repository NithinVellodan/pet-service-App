import {
    StyleSheet,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Context} from '../../../contexts/Store';
import {SIZE} from '../../../theme/theme';
FONTS;
//packages
import {useNavigation} from '@react-navigation/native';

//constants
import {FONTS} from '../../../theme/fonts';

//images and logos
import StarRate from '../../../assets/icons/star-rate.svg';
import StarUnSelect from '../../../assets/icons/star-unselect.svg';
import CloseIcon from '../../../assets/icons/close-icon-blue.svg';

const CustomStarRating = ({
    rating,
    onRatingChange,
    maxStars = 5,
    size = 35,
}) => {
    return (
        <View style={styles.starContainer}>
            {Array.from({length: maxStars}, (_, index) => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    key={index}
                    onPress={() => onRatingChange(index + 1)}
                    style={styles.starWrapper}>
                    {index < rating ? (
                        <StarRate height={SIZE(44)} width={SIZE(44)} />
                    ) : (
                        <StarUnSelect height={SIZE(44)} width={SIZE(44)} />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const RatingExample = ({setReviewModal}) => {
    const [rating, setRating] = useState(3);
    const {state, dispatch} = useContext(Context);
    const [inputText, setInputText] = useState('');

    const ratingCompleted = newRating => {
        setRating(newRating);
    };

    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_MODAL_SECTION',
            commonModal: {
                ...state.commonModal,
                ratingSubmitted: true,
                appRatingModal: false,
            },
        });
    };
    const updateUserDataTwo = () => {
        dispatch({
            type: 'UPDATE_MODAL_SECTION',
            commonModal: {
                ...state.commonModal,
                appRatingModal: false,
            },
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonIcon}
                onPress={() => {
                    setReviewModal(false);
                    updateUserDataTwo();
                }}>
                <CloseIcon width={'100%'} height={'100%'} />
            </TouchableOpacity>
            <View style={{marginBottom: SIZE(15)}}>
                <Text style={styles.textHed}>How was your experience</Text>
                <Text style={styles.textSub}>
                    Your review help as improve the overall experience.
                </Text>
            </View>
            <CustomStarRating
                rating={rating}
                onRatingChange={ratingCompleted}
            />
            <View style={styles.inputContaner}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="Write additional comments here..."
                    placeholderTextColor="#8E8E8E"
                    onChangeText={text => setInputText(text)}
                    value={inputText}
                />
            </View>
            <TouchableOpacity
                style={styles.postButton}
                activeOpacity={0.8}
                onPress={() => {
                    setInputText('');
                    updateUserData();
                }}>
                <Text allowFontScaling={false} style={styles.postButtonText}>
                    Send Review
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.postButton,
                    {
                        backgroundColor: '#fff',
                        borderWidth: SIZE(1),
                        borderColor: '#003459',
                    },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                    setInputText('');
                    updateUserDataTwo();
                }}>
                <Text
                    allowFontScaling={false}
                    style={[
                        styles.postButtonText,
                        {
                            color: '#003459',
                        },
                    ]}>
                    I’ll do it Later{' '}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        // width: '100%',
        width: '95%',
        // height: '66%',
        borderRadius: SIZE(12),
        padding: SIZE(30),
        alignItems: 'center',
    },
    textHed: {
        textAlign: 'center',
        color: '#242424',
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
    },
    textSub: {
        fontSize: SIZE(16),
        color: '#969696',
        textAlign: 'center',
        fontFamily: FONTS.medium,
        marginTop: SIZE(16),
        fontWeight: '500',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#EDEDED',
        padding: SIZE(16),
        borderRadius: SIZE(8),
        marginTop: SIZE(5),
        marginBottom: SIZE(5),
        width: '100%',
    },
    starWrapper: {
        // marginHorizontal: SIZE(5),
    },

    reviewContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(160),
    },
    reviewSection: {
        marginBottom: SIZE(16),
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(8),
        marginTop: SIZE(28),
    },
    centerContainer: {
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    replyImage: {
        width: SIZE(100),
        height: SIZE(100),
        overflow: 'hidden',
        borderRadius: SIZE(8),
        marginRight: SIZE(16),
    },
    ImagePet: {
        width: SIZE(100),
        height: SIZE(100),
    },
    rightBox: {
        flex: 1,
    },
    textName: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(17),
        color: '#242424',
        textAlign: 'justify',
    },
    text: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#757575',
        marginBottom: SIZE(8),
    },

    inputContaner: {
        backgroundColor: '#F7F7F7',
        borderWidth: SIZE(1),
        borderColor: '#D3D3D3',
        paddingVertical: SIZE(12),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        height: SIZE(110),
        marginTop: SIZE(12),
        width: '100%',
    },
    input: {
        padding: 0,
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        height: '100%',
        textAlignVertical: 'top',
    },
    postButton: {
        marginTop: SIZE(24),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        alignItems: 'center',
        width: '100%',
        height: SIZE(42),
        justifyContent: 'center',
    },
    postButtonText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

export default RatingExample;
