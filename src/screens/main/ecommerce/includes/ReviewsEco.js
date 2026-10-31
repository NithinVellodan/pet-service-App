import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SIZE} from '../../../../theme/theme';
//images and logos
import Star from '../../../../assets/icons/star.svg';
import StarLight from '../../../../assets/icons/starlight.svg';
import AvatarImage from '../../../../assets/icons/avatar-new.svg';
import {FONTS} from '../../../../theme/fonts';
import {Context} from '../../../../contexts/Store';
import {EcoReplyServiceProvider} from '../../EcommerceApiSection';
import {ReplyServiceProvider} from '../../ApiSectionServiceProvider';

const ReviewsEco = ({item, index, setLoading, trainer}) => {
    const {state} = useContext(Context);
    const [replyID, setReplyID] = useState('');
    const [commentReply, setCommentReply] = useState('');
    const formatDate = dateString => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', {month: 'short'});
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    return (
        <View style={styles.reviewsContainer} key={index}>
            <View style={styles.reviewsHeadBox}>
                <View style={styles.reviewsHeadLeft}>
                    {item?.customer_details?.image ? (
                        <View style={styles.reviewsHeadImage}>
                            <Image
                                style={styles.image}
                                source={{uri: item.customer_details?.image}}
                            />
                        </View>
                    ) : (
                        <AvatarImage
                            style={{marginRight: SIZE(12)}}
                            width={SIZE(40)}
                            height={SIZE(40)}
                        />
                    )}

                    <View style={styles.reviewsNameSection}>
                        <Text style={styles.reviewsName}>
                            {item.customer_details.name}
                        </Text>

                        <View style={styles.reviewStar}>
                            {[...Array(item.rating)].map((_, index) => (
                                <Star
                                    key={index}
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                            ))}
                            {[...Array(5 - item.rating)].map((_, index) => (
                                <StarLight
                                    key={index}
                                    width={SIZE(16)}
                                    height={SIZE(16)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            <Text style={styles.reviewsCommetsText}>{item.review}</Text>
            <View style={styles.reviewReplyTop}>
                <Text style={styles.reviewReplyDate}>
                    {formatDate(item.date_added)}
                </Text>
                {!item.reply_details?.reply && (
                    <TouchableOpacity
                        onPress={() => {
                            if (replyID === item.id) {
                                setReplyID('');
                            } else {
                                setReplyID(item.id);
                            }
                            setCommentReply('');
                        }}
                        style={styles.reviewReply}
                        activeOpacity={0.8}>
                        <Text style={styles.reviewReplyText}>Reply</Text>
                    </TouchableOpacity>
                )}
            </View>
            {replyID === item.id ? (
                <View style={styles.reviewReplyBottom}>
                    <TextInput
                        style={styles.reviewReplyInput}
                        onChangeText={text => {
                            setCommentReply(text);
                        }}
                        value={commentReply}
                        placeholder="Enter Reply"
                        multiline={true}
                        placeholderTextColor={'#8E8E8E'}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (commentReply) {
                                if (trainer) {
                                    ReplyServiceProvider(
                                        item.id,
                                        commentReply,
                                        state,
                                        setLoading,
                                    );
                                } else {
                                    EcoReplyServiceProvider(
                                        item.id,
                                        commentReply,
                                        state,
                                    );
                                    setLoading && setLoading(prev => !prev);
                                }

                                setReplyID('');
                                setCommentReply('');
                            } else {
                                setReplyID('');
                                setCommentReply('');
                            }
                        }}
                        style={styles.replySubmit}>
                        <Text style={styles.replySubmitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
            {item.reply_details?.reply && (
                <View
                    style={{
                        marginTop: SIZE(10),
                        backgroundColor: '#F7F7F7',
                        paddingHorizontal: SIZE(10),
                        paddingVertical: SIZE(10),
                        borderRadius: SIZE(6),
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={[
                                styles.reviewsName,
                                {marginRight: SIZE(10)},
                            ]}>
                            {item.reply_details?.user_name}
                        </Text>
                        <Text style={styles.reviewReplyDate}>
                            {formatDate(item.reply_details?.date_added)}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderRadius: SIZE(5),
                        }}>
                        <Text
                            style={{
                                color: '#242424',
                                fontSize: SIZE(14),
                                fontFamily: FONTS.regular,
                                fontWeight: '400',
                                lineHeight: SIZE(18),
                            }}>
                            {item.reply_details?.reply}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ReviewsEco;

const styles = StyleSheet.create({
    reviewsSection: {
        marginTop: SIZE(32),
    },
    reviewsHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(24),
        alignItems: 'center',
    },
    reviewsText: {
        fontFamily: FONTS.semiBold,
        color: '#242424',
        fontSize: SIZE(18),
        fontWeight: '600',
        lineHeight: SIZE(24),
    },

    reviewsContainer: {
        backgroundColor: '#FFFFFF',
        padding: SIZE(16),
        borderRadius: 8,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        marginBottom: SIZE(16),
    },
    reviewsHeadBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewsHeadLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewsHeadImage: {
        width: SIZE(40),
        height: SIZE(40),
        marginRight: SIZE(12),
        overflow: 'hidden',
        borderRadius: SIZE(25),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    reviewsName: {
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(4),
        color: '#242424',
        fontSize: SIZE(16),
        fontWeight: '600',
        lineHeight: SIZE(20),
    },
    reviewStar: {
        flexDirection: 'row',
    },
    reviewsCommetsText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(18),
        marginTop: SIZE(10),
    },
    reviewReplyTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZE(8),
    },
    reviewReplyDate: {
        color: '#969696',
        fontSize: SIZE(12),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(14),
    },
    reviewReply: {},
    reviewReplyText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
    },
    reviewReplyBottom: {
        marginTop: SIZE(16),
    },
    reviewReplyBottom: {
        marginTop: SIZE(16),
    },
    reviewReplyInput: {
        backgroundColor: '#F7F7F7',
        padding: SIZE(16),
        height: SIZE(100),
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 8,
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#242424',
        textAlignVertical: 'top',
    },
    replySubmit: {
        backgroundColor: '#003459',
        paddingVertical: SIZE(10),
        borderRadius: 10,
        marginTop: SIZE(24),
    },
    replySubmitText: {
        color: '#FFFFFF',
        fontSize: SIZE(14),
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: 0.5,
        textAlign: 'center',
        fontFamily: FONTS.bold,
    },
});
