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
//components
import Headers from '../includes/headers/Headers';
import {ecommerceApiCustomers, usersConfigCustomer} from '../../../axiosConfig';
//constants
import {Context} from '../../contexts/Store';
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//packages
import {useNavigation} from '@react-navigation/native';
//images and logos
import Star from '../../assets/icons/star.svg';
import StarLight from '../../assets/icons/starlight.svg';

const AddReview = ({route}) => {
    const navigation = useNavigation();
    const {state} = useContext(Context);
    const [inputText, setInputText] = useState('');
    const review = route?.params?.item;
    const pk = route?.params?.pk;
    const page_type = route?.params?.page_type;
    const [rating, setRating] = useState(route?.params?.rating);
    const [ratings, setRatings] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const ratingCompleted = newRating => {
        setRating(newRating);
    };

    // edit review function
    const addReviewApi = async () => {
        if (inputText === '') {
            setErrorMessage('Please write a review');
            return;
        }
        const token = state.userData.accessToken;
        const formData = new FormData();

        formData.append('review', inputText);
        formData.append('rating', rating);

        try {
            await usersConfigCustomer
                .post(`/${page_type}-add-review/${pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    navigation.navigate('CustomerReviews');
                    console.log('response => ', response.data);
                })
                .catch(error => {
                    console.log('error try => ', error);
                });
        } catch (error) {
            console.log('error => ', error);
        }
    };

    const addReviewAp2 = async () => {
        const token = state.userData.accessToken;
        const formData = new FormData();
        formData.append('review', inputText);
        formData.append('rating', rating);

        console.log('formData', formData);
        try {
            await ecommerceApiCustomers
                .post(`add-product-review/${review.pk}/`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    navigation.navigate('OrderCustomer');
                })
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
            <Headers headText={'Add Review'} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <View style={styles.reviewContainer}>
                    <View style={styles.reviewSection}>
                        <View style={styles.centerContainer}>
                            <View style={styles.replyImage}>
                                <Image
                                    style={styles.ImagePet}
                                    source={{uri: review?.image}}
                                />
                            </View>
                            <View style={styles.rightBox}>
                                <Text
                                    numberOfLines={5}
                                    allowFontScaling={false}
                                    style={styles.text}>
                                    <Text
                                        // numberOfLines={3}
                                        allowFontScaling={false}
                                        style={styles.textName}>
                                        {review?.stay_name ||
                                            review?.trainer_name ||
                                            review?.breed_name}{' '}
                                    </Text>
                                    {review?.description ||
                                        review?.trainer_description}
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
                                    onChangeText={text => {
                                        setInputText(text);
                                        setErrorMessage('');
                                    }}
                                    value={inputText}
                                />
                            </View>
                            <Text
                                allowFontScaling={false}
                                style={styles.errorMessage}>
                                {errorMessage}
                            </Text>
                            <TouchableOpacity
                                style={styles.postButton}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setInputText('');
                                    if (route.params.page_is === 'order_item') {
                                        addReviewAp2();
                                    } else {
                                        addReviewApi();
                                    }
                                }}>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.postButtonText}>
                                    Post your Review
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default AddReview;

const styles = StyleSheet.create({
    container: {},
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
    mediaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZE(12),
    },
    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: SIZE(6),
        borderWidth: 1,
        borderColor: '#009FD3',
        padding: SIZE(12),
        width: SIZE(173),
        justifyContent: 'center',
        backgroundColor: '#EAF7FF',
    },
    photoButtonText: {
        marginLeft: SIZE(8),
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#009FD3',
    },
    videoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: SIZE(6),
        borderWidth: 1,
        borderColor: '#009FD3',
        padding: SIZE(12),
        width: SIZE(173),
        justifyContent: 'center',
        backgroundColor: '#EAF7FF',
    },
    videoButtonText: {
        marginLeft: SIZE(8),
        marginLeft: SIZE(8),
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#009FD3',
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
    postButton: {
        marginTop: SIZE(32),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        padding: SIZE(16),
        alignItems: 'center',
    },
    postButtonText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    errorMessage: {
        color: 'red',
        fontFamily: FONTS.regular,
        fontSize: SIZE(13),
        marginTop: SIZE(5),
        textAlign: 'right',
    },
});
