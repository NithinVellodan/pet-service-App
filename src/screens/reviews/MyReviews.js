import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import Headers from '../includes/headers/Headers';
import {SIZE, SIZES} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
import Reply from '../includes/commonlist/Reply';
import NoData from '../../assets/icons/nodataarrivals.svg';
import {
    ReplyServiceProvider,
    serviceProviderReview,
} from '../main/ApiSectionServiceProvider';
import {Context} from '../../contexts/Store';
import {useToast} from 'react-native-toast-notifications';

const MyReviews = ({route}) => {
    const toast = useToast();
    const {state} = useContext(Context);
    const [selectedValue, setSelectedValue] = useState(
        route?.params?.params?.selectedValue
            ? route.params.params.selectedValue
            : {
                  id: 1,
                  name: 'Place to Stay',
                  page_type: 'place-to-stay',
              },
    );
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [replyStayText, setReplyStayText] = useState('');
    const [replyPetText, setReplyPetText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const filterItems = [
        {
            id: 1,
            name: 'Place to Stay',
            page_type: 'place-to-stay',
        },
        {
            id: 2,
            name: 'Borrow a Pet',
            page_type: 'borrow-pet',
        },
        {
            id: 3,
            name: 'Trainer',
            page_type: 'trainer',
        },
    ];

    serviceProviderReview(
        setReviews,
        selectedValue.page_type,
        refreshing,
        setIsLoading,
    );
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    console.log(reviews, 'reviews');

    return (
        <View style={styles.container}>
            <Headers headText={'My Reviews'} />
            <View style={styles.filterContainer}>
                {filterItems.map(item => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={item.id}
                        style={{
                            ...styles.selectItem,
                            borderColor:
                                selectedValue.id === item.id
                                    ? '#003459'
                                    : '#E2E2E2',
                            backgroundColor:
                                selectedValue.id === item.id
                                    ? '#EAF7FF'
                                    : '#FFFFFF',
                        }}
                        onPress={() => {
                            setSelectedValue({
                                id: item.id,
                                name: item.name,
                                page_type: item.page_type,
                            });
                        }}>
                        <Text
                            style={{
                                ...styles.filterText,
                                color:
                                    selectedValue.id === item.id
                                        ? '#003459'
                                        : '#242424',
                            }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {isLoading ? (
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
                <ScrollView
                    bounces={false}
                    refreshControl={
                        <RefreshControl
                            colors={['#003459']}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.reviewContainer}>
                        {selectedValue.id === 1 ? (
                            <>
                                {reviews.length === 0 ? (
                                    <View
                                        style={{
                                            height: SIZES.height - SIZE(300),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <NoData
                                            width={SIZE(300)}
                                            height={SIZE(300)}
                                        />
                                        <Text style={styles.noreview}>
                                            No Reviews
                                        </Text>
                                    </View>
                                ) : (
                                    reviews.map((item, index) => (
                                        <Reply
                                            key={index}
                                            item={item}
                                            username={
                                                item.customer_details?.name
                                            }
                                            date_updated={item.date_updated}
                                            type_name={item.stay_name}
                                            type_image={item.stay_image}
                                            review={item.review}
                                            rating={item.rating}
                                            userImage={
                                                item.customer_details?.image
                                            }
                                            commentText={replyStayText}
                                            setCommentText={setReplyStayText}
                                            comment={item.reply_details?.reply}
                                            replayDate={
                                                item.reply_details?.date_added
                                            }
                                            reply_name={
                                                item.reply_details?.user_name
                                            }
                                            onPress={() => {
                                                if (replyStayText === '') {
                                                    setErrorMessage(
                                                        'Please enter reply',
                                                    );
                                                } else {
                                                    ReplyServiceProvider(
                                                        item.id,
                                                        replyStayText,
                                                        state,
                                                        setRefreshing,
                                                    );
                                                }
                                            }}
                                        />
                                    ))
                                )}
                            </>
                        ) : selectedValue.id === 2 ? (
                            <>
                                {reviews.length === 0 ? (
                                    <View
                                        style={{
                                            height: SIZES.height - SIZE(300),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <NoData
                                            width={SIZE(300)}
                                            height={SIZE(300)}
                                        />
                                        <Text style={styles.noreview}>
                                            No Reviews
                                        </Text>
                                    </View>
                                ) : (
                                    reviews.map((item, index) => (
                                        <Reply
                                            key={index}
                                            item={item}
                                            username={
                                                item.customer_details?.name
                                            }
                                            date_updated={item.date_updated}
                                            type_name={item.pet_breed}
                                            type_image={item.pet_image}
                                            review={item.review}
                                            userImage={
                                                item.customer_details?.image
                                            }
                                            rating={item.rating}
                                            comment={item.reply_details?.reply}
                                            replayDate={
                                                item.reply_details?.date_added
                                            }
                                            reply_name={
                                                item.reply_details?.user_name
                                            }
                                            commentText={replyPetText}
                                            setCommentText={setReplyPetText}
                                            onPress={() => {
                                                if (replyPetText === '') {
                                                    setErrorMessage(
                                                        'Please enter reply',
                                                    );
                                                } else {
                                                    ReplyServiceProvider(
                                                        item.id,
                                                        replyPetText,
                                                        state,
                                                        setRefreshing,
                                                    );
                                                }
                                            }}
                                        />
                                    ))
                                )}
                            </>
                        ) : selectedValue.id === 3 ? (
                            <>
                                {reviews.length === 0 ? (
                                    <View
                                        style={{
                                            height: SIZES.height - SIZE(300),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <NoData
                                            width={SIZE(300)}
                                            height={SIZE(300)}
                                        />
                                        <Text style={styles.noreview}>
                                            No Reviews
                                        </Text>
                                    </View>
                                ) : (
                                    reviews.map((item, index) => (
                                        <Reply
                                            key={index}
                                            item={item}
                                            username={
                                                item.customer_details?.name
                                            }
                                            date_updated={item.date_updated}
                                            type_name={item.pet_breed}
                                            type_image={item.pet_image}
                                            review={item.review}
                                            userImage={
                                                item.customer_details?.image
                                            }
                                            rating={item.rating}
                                            comment={item.reply_details?.reply}
                                            replayDate={
                                                item.reply_details?.date_added
                                            }
                                            reply_name={
                                                item.reply_details?.user_name
                                            }
                                            commentText={replyPetText}
                                            setCommentText={setReplyPetText}
                                            onPress={() => {
                                                if (replyPetText === '') {
                                                    toast.show(
                                                        'Please enter reply',
                                                        {
                                                            type: 'warning',
                                                        },
                                                    );
                                                } else {
                                                    ReplyServiceProvider(
                                                        item.id,
                                                        replyPetText,
                                                        state,
                                                        setRefreshing,
                                                    );
                                                }
                                            }}
                                        />
                                    ))
                                )}
                            </>
                        ) : (
                            <View
                                style={{
                                    height: SIZES.height - SIZE(300),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <NoData width={SIZE(300)} height={SIZE(300)} />
                                <Text style={styles.noreview}>No Reviews</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default MyReviews;

const styles = StyleSheet.create({
    container: {},
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZE(16),
        paddingTop: SIZE(18),
        marginBottom: SIZE(18),
    },
    selectItem: {
        paddingVertical: SIZE(8),
        paddingHorizontal: SIZE(8),
        borderWidth: 1,
        borderRadius: SIZE(40),
        marginRight: SIZE(12),
        width: SIZE(122),
        alignItems: 'center',
    },
    filterText: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        lineHeight: SIZE(17),
    },
    reviewContainer: {
        paddingHorizontal: SIZE(16),
        paddingBottom: SIZE(150),
    },
    noreview: {
        fontSize: SIZE(18),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(17),
        color: '#000',
        marginTop: SIZE(20),
    },
});
