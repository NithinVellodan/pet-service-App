import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import React, {useContext, useState} from 'react';

// Packages
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import {Context} from '../../contexts/Store';
import moment from 'moment';

// Components
import NoReview from './NoReview';
import {CustomerAllReview} from '../main/ApiSection';
import {usersConfigCustomer} from '../../../axiosConfig';
// Icons
import Star from '../../assets/icons/star.svg';
import StarLight from '../../assets/icons/starlight.svg';
import Edit from '../../assets/icons/profile-icons/edit-2.svg';
import Trash from '../../assets/icons/profile-icons/trash.svg';
import {ActivityIndicator} from 'react-native';

export const CustomerSinglePageReviews = () => {
    return <Text>test</Text>;
};

const CustomerReviews1 = ({route}) => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [reviewList, setReviewList] = useState([]);
    const [rating, setRating] = useState(1);
    const [ratings, setRatings] = useState({});

    const [selectedFilter, setSelectedFilter] = useState({
        id: 1,
        type: 'Place to Stay',
        page_type: 'place-to-stay',
    });

    const [selectedValue, setSelectedValue] = useState({
        id: 1,
        name: 'Contribute',
        section: 'contribute',
    });

    const ratingCompleted = (reviewId, newRating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [reviewId]: newRating,
        }));
    };

    CustomerAllReview(
        selectedFilter.page_type,
        selectedValue.section,
        isLoading,
        setReviewList,
        setRefreshing,
    );

    useFocusEffect(
        React.useCallback(() => {
            setIsLoading(prev => !prev);
            setRatings({});
            return () => {
                // console.log('Screen is unfocused');
            };
        }, []),
    );
    const FilterBox = [
        {
            id: 1,
            type: 'Place to Stay',
            page_type: 'place-to-stay',
        },
        {
            id: 2,
            type: 'Borrow a Pet',
            page_type: 'borrow-pet',
        },
        {
            id: 3,
            type: 'Trainer',
            page_type: 'trainer',
        },
    ];

    const filterItems = [
        {
            id: 1,
            name: 'Contribute',
            section: 'contribute',
        },
        {
            id: 2,
            name: 'Your Reviews',
            section: 'reviews',
        },
    ];

    const totalStars = 5;

    // remove review function
    const removeReview = async (pk, page_type) => {
        const token = state.userData.accessToken;
        try {
            const response = await usersConfigCustomer.post(
                `${page_type}-delete-review/${pk}/`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setIsLoading(prev => !prev);
        } catch (error) {
            setIsLoading(prev => !prev);
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
            <View style={styles.filterBox}>
                {FilterBox.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.filterItem,
                            {
                                borderColor:
                                    selectedFilter.id === item.id
                                        ? '#98C1D9'
                                        : '#E2E2E2',
                                backgroundColor:
                                    selectedFilter.id === item.id
                                        ? '#EAF7FF'
                                        : '#FFFFFF',
                            },
                        ]}
                        activeOpacity={0.8}
                        onPress={() => {
                            setSelectedFilter(item);
                            setIsLoading(prev => !prev);
                        }}>
                        <Text
                            style={[
                                styles.filterItemText,
                                {
                                    color:
                                        selectedFilter.id === item.id
                                            ? '#009FD3'
                                            : '#242424',
                                },
                            ]}
                            allowFontScaling={false}>
                            {item.type}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.filterContainer}>
                <View style={styles.topButtons}>
                    {filterItems.map(item => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={item.id}
                            style={{
                                ...styles.selectItem,
                                backgroundColor:
                                    selectedValue.id === item.id
                                        ? '#009FD3'
                                        : '#FFFFFF',
                            }}
                            onPress={() => {
                                setSelectedValue(item);
                                setIsLoading(prev => !prev);
                            }}>
                            <Text
                                style={{
                                    ...styles.filterText,
                                    color:
                                        selectedValue.id === item.id
                                            ? '#FFFFFF'
                                            : '#242424',
                                }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {refreshing ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(300),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    size="large"
                    color={'#007EA7'}
                />
            ) : (
                <FlatList
                    bounces={false}
                    style={{paddingHorizontal: SIZE(16)}}
                    data={reviewList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => {
                        const currentRating = ratings[item.id] || 1; // Default to 1 if no rating exists

                        return selectedValue.id === 1 ? (
                            <View key={item.id} style={styles.reviewSection}>
                                <View style={styles.centerContainer}>
                                    <View style={styles.replyImage}>
                                        {item?.image && (
                                            <Image
                                                style={styles.ImagePet}
                                                source={{uri: item?.image}}
                                            />
                                        )}
                                    </View>
                                    <View style={styles.rightBox}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.text}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.textName}>
                                                {selectedFilter.id === 1
                                                    ? item?.stay_name
                                                    : selectedFilter.id === 2
                                                    ? item?.breed_name
                                                    : selectedFilter.id === 3
                                                    ? item?.trainer_name
                                                    : null}{' '}
                                            </Text>
                                            {selectedFilter.id === 3
                                                ? item?.trainer_description
                                                : item?.description}
                                        </Text>
                                        <View style={styles.replyStar}>
                                            {/* <Rating
                                                type="custom"
                                                ratingBackgroundColor="#E2E2E2"
                                                ratingColor="#FABC57"
                                                ratingCount={5}
                                                imageSize={21}
                                                onFinishRating={newRating =>
                                                    ratingCompleted(
                                                        item.id,
                                                        newRating,
                                                    )
                                                }
                                                startingValue={currentRating}
                                            /> */}
                                            <StarRating
                                                rating={currentRating}
                                                onRatingChange={newRating =>
                                                    ratingCompleted(
                                                        item.id,
                                                        newRating,
                                                    )
                                                }
                                                size={22}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('AddReview', {
                                            item,
                                            page_type: selectedFilter.page_type,
                                            pk: item.id,
                                            rating: currentRating,
                                        });
                                    }}
                                    activeOpacity={0.8}
                                    style={styles.addReviewButton}>
                                    <Text
                                        allowFontScaling={false}
                                        style={styles.addReviewText}>
                                        Add Review
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View
                                key={item.id}
                                style={styles.reviewEditSection}>
                                <View style={styles.centerEditContainer}>
                                    <View style={styles.replyEditImage}>
                                        <Image
                                            style={styles.ImageEditPet}
                                            source={{
                                                uri:
                                                    selectedFilter.id === 1
                                                        ? item?.stay_image
                                                        : selectedFilter.id ===
                                                          2
                                                        ? item?.breed_image
                                                        : selectedFilter.id ===
                                                          3
                                                        ? item?.trainer_image
                                                        : null,
                                            }}
                                        />
                                    </View>
                                    <View style={styles.rightEditBox}>
                                        <Text
                                            allowFontScaling={false}
                                            style={styles.textEdit}>
                                            <Text
                                                allowFontScaling={false}
                                                style={styles.textNameEdit}>
                                                {selectedFilter.id === 1
                                                    ? item?.stay_name
                                                    : selectedFilter.id === 2
                                                    ? item?.breed_name
                                                    : selectedFilter.id === 3
                                                    ? item?.trainer_name
                                                    : null}{' '}
                                            </Text>
                                            {item?.review}
                                        </Text>
                                        {item?.rating && (
                                            <View style={styles.starContainer}>
                                                <View
                                                    style={
                                                        styles.replyEditStar
                                                    }>
                                                    {[
                                                        ...Array(item?.rating),
                                                    ].map((_, index) => (
                                                        <Star
                                                            key={index}
                                                            width={SIZE(22)}
                                                            height={SIZE(22)}
                                                        />
                                                    ))}
                                                    {[
                                                        ...Array(
                                                            totalStars -
                                                                item?.rating,
                                                        ),
                                                    ].map((_, index) => (
                                                        <StarLight
                                                            key={index}
                                                            width={SIZE(22)}
                                                            height={SIZE(22)}
                                                        />
                                                    ))}
                                                </View>
                                                <Text style={styles.dateText}>
                                                    {moment(
                                                        item.date_added,
                                                    ).format('DD MMM YYYY')}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View style={styles.editSection}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('EditReview', {
                                                item,
                                                page_type:
                                                    selectedFilter.page_type,
                                                pk: item.id,
                                            });
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.editButton}>
                                        <Edit
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
                                        <Text style={styles.EditButtonText}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            removeReview(
                                                item.id,
                                                selectedFilter.page_type,
                                            );
                                        }}
                                        activeOpacity={0.8}
                                        style={styles.removeButton}>
                                        <Trash
                                            width={SIZE(20)}
                                            height={SIZE(20)}
                                        />
                                        <Text style={styles.removeButtonText}>
                                            Remove
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }}
                    ListEmptyComponent={<NoReview />}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default CustomerReviews1;

const styles = StyleSheet.create({
    container: {flex: 1},
    filterBox: {
        paddingHorizontal: SIZE(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SIZE(24),
    },
    filterItem: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(16),
        borderWidth: SIZE(1),
        borderRadius: SIZE(20),
        width: SIZE(124),
    },
    filterItemText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(18),
        fontFamily: FONTS.semiBold,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(18),
        marginBottom: SIZE(18),
    },
    topButtons: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderRadius: SIZE(8),
        padding: SIZE(4),
        borderColor: '#E2E2E2',
        backgroundColor: '#FFFFFF',
    },
    selectItem: {
        paddingVertical: SIZE(10),
        paddingHorizontal: SIZE(8),

        borderRadius: SIZE(8),
        width: SIZE(180),
        alignItems: 'center',
    },
    filterText: {
        fontSize: SIZE(16),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(20),
    },
    reviewContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(225),
    },
    reviewSection: {
        marginBottom: SIZE(16),
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(8),
    },
    centerContainer: {
        flexDirection: 'row',
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
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
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
    addReviewButton: {
        alignSelf: 'flex-end',
        marginTop: SIZE(15),
    },
    addReviewText: {
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        color: '#009FD3',
        letterSpacing: SIZE(0.5),
    },
    // your review
    reviewEditSection: {
        marginBottom: SIZE(16),
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderRadius: SIZE(8),
    },
    centerEditContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        paddingBottom: SIZE(12),
    },
    replyEditImage: {
        width: SIZE(100),
        height: SIZE(100),
        overflow: 'hidden',
        borderRadius: SIZE(8),
        marginRight: SIZE(16),
    },
    ImageEditPet: {
        width: '100%',
        height: '100%',
    },
    rightEditBox: {
        flex: 1,
    },
    textNameEdit: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(17),
        color: '#242424',
        textAlign: 'justify',
    },
    textEdit: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#757575',
        marginBottom: SIZE(8),
    },
    starContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    replyEditStar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        color: '#757575',
        fontSize: SIZE(12),
        fontFamily: FONTS.regular,
        fontWeight: '400',
    },
    editSection: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: SIZE(16),
        alignItems: 'center',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZE(32),
    },
    EditButtonText: {
        marginLeft: SIZE(16),
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    removeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeButtonText: {
        marginLeft: SIZE(16),
        color: '#009FD3',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
