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
import Headers from '../includes/headers/Headers';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
// package
import {useNavigation} from '@react-navigation/native';

// constants
import {usersConfigCustomer} from '../../../axiosConfig';
import {Context} from '../../contexts/Store';
//images and logos
import Star from '../../assets/icons/star.svg';
import StarLight from '../../assets/icons/starlight.svg';

const EditReview = ({route}) => {
    const navigation = useNavigation();
    const {state} = useContext(Context);
    const editReview = route.params.item;
    const [inputText, setInputText] = useState(
        editReview.review ? editReview.review : '',
    );
    const pk = route?.params?.pk;
    const page_type = route?.params?.page_type;
    const [rating, setRating] = useState(editReview?.rating);
    const [ratings, setRatings] = useState({});

    const ratingCompleted = newRating => {
        setRating(newRating);
    };

    // edit review function
    const editReviewApi = async () => {
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('review', inputText);
        formData.append('rating', rating);

        try {
            await usersConfigCustomer
                .put(`/${page_type}-edit-review/${pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {})
                .catch(error => {
                    console.log('error try => ', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const StarRating = ({
        rating,
        onRatingChange,
        size = SIZE(22),
        editable = true,
    }) => {
        const totalStars = 5;

        return (
            <View style={{flexDirection: 'row'}}>
                {[...Array(totalStars)].map((_, index) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={index}
                        onPress={() => editable && onRatingChange(index + 1)}
                        disabled={!editable}>
                        {index < rating ? (
                            <Star width={size} height={size} />
                        ) : (
                            <StarLight width={size} height={size} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Headers headText={'Edit Review'} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.reviewContainer}>
                    <View style={styles.reviewSection}>
                        <View style={styles.centerContainer}>
                            <View style={styles.replyImage}>
                                <Image
                                    style={styles.ImagePet}
                                    source={require('../../assets/images/list1.png')}
                                />
                            </View>
                            <View style={styles.rightBox}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.text}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.textName}>
                                        {editReview.stay_name}{' '}
                                    </Text>
                                    {editReview.review}
                                </Text>
                                <View style={styles.replyStar}>
                                    {/* <Rating
                                        type="custom"
                                        ratingBackgroundColor="#E2E2E2"
                                        ratingColor="#FABC57"
                                        ratingCount={5}
                                        imageSize={20}
                                        onFinishRating={ratingCompleted}
                                        startingValue={rating}
                                    /> */}
                                    <StarRating
                                        rating={rating}
                                        onRatingChange={newRating =>
                                            ratingCompleted(newRating)
                                        }
                                        size={22}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.addFile}>
                            <Text
                                allowFontScaling={false}
                                style={styles.addFileText}>
                                Write a Review
                            </Text>
                            <View style={styles.inputContaner}>
                                <TextInput
                                    style={styles.input}
                                    multiline={true}
                                    placeholder="Enter text here"
                                    placeholderTextColor="#8E8E8E"
                                    onChangeText={text => setInputText(text)}
                                    value={inputText}
                                />
                            </View>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        navigation.goBack();
                                    }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.cancelButtonText}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        navigation.navigate('CustomerReviews');
                                        setInputText('');
                                        editReviewApi();
                                    }}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.saveButtonText}>
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default EditReview;

const styles = StyleSheet.create({
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
        borderBottomWidth: 1,
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
    replyStar: {
        flexDirection: 'row',
    },
    addFile: {
        marginTop: SIZE(30),
    },
    addFileText: {
        color: '#686868',
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(17),
        fontSize: SIZE(14),
    },

    inputContaner: {
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        paddingVertical: SIZE(12),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        height: SIZE(110),
        marginTop: SIZE(12),
    },
    input: {
        padding: 0,
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
    },
    buttons: {
        marginTop: SIZE(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cancelButton: {
        borderRadius: SIZE(8),
        padding: SIZE(14),
        alignItems: 'center',
        width: SIZE(170),
        borderWidth: 1,
        borderColor: '#003459',
    },
    cancelButtonText: {
        color: '#003459',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    saveButton: {
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        padding: SIZE(14),
        alignItems: 'center',
        width: SIZE(170),
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
