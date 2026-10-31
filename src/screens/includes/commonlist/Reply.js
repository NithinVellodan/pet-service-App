import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';

import Avatar from '../../../assets/icons/avatar-new.svg';
import Star from '../../../assets/icons/star.svg';
import StarLight from '../../../assets/icons/starlight.svg';

const Reply = ({
    username,
    userImage,
    date_updated,
    type_name,
    type_image,
    review,
    rating,
    comment,
    onPress,
    replayDate,
    reply_name,
    setCommentText,
}) => {
    const [replybutton, setReplybutton] = useState(false);
    const totalStars = 5;

    const formatDate = originalDate => {
        let date = new Date(
            originalDate ? originalDate : '2024-01-24T07:19:21.438543Z',
        );
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.LeftBox}>
                    <View style={styles.replyHeadImage}>
                        {userImage ? (
                            <Image
                                style={{width: '100%', height: '100%'}}
                                source={{uri: userImage}}
                            />
                        ) : (
                            // <Image
                            //     source={require('../../../assets/images/profile.png')}
                            // />
                            <Avatar />
                        )}
                    </View>
                    <Text style={styles.NameText}>{username}</Text>
                </View>
                <Text style={styles.dateText}>{formatDate(date_updated)}</Text>
            </View>
            <View style={styles.centerContainer}>
                <View style={styles.replyImage}>
                    {type_image ? (
                        <Image
                            style={styles.ImagePet}
                            source={{uri: type_image}}
                        />
                    ) : (
                        ''
                    )}
                </View>
                <View style={styles.rightBox}>
                    <Text style={styles.text}>
                        <Text style={styles.textName}>{type_name}</Text>{' '}
                        {review}
                    </Text>
                    <View style={styles.replyStar}>
                        {Array.from({length: rating}, (_, index) => (
                            <Star
                                key={index}
                                width={SIZE(22)}
                                height={SIZE(22)}
                            />
                        ))}
                        {Array.from(
                            {length: totalStars - rating},
                            (_, index) => (
                                <StarLight
                                    key={index}
                                    width={SIZE(22)}
                                    height={SIZE(22)}
                                />
                            ),
                        )}
                    </View>
                </View>
            </View>
            {/* 1 */}

            <>
                {comment ? (
                    <View>
                        <View style={styles.replied}>
                            <Text style={styles.repliedText}>Replied</Text>
                            <Text style={styles.repliedDate}>
                                {formatDate(replayDate)}
                            </Text>
                        </View>
                        <Text style={styles.repliedName}>{reply_name}</Text>
                        <Text style={styles.repliedComment}>{comment}</Text>
                    </View>
                ) : (
                    <>
                        {!replybutton ? (
                            <TouchableOpacity
                                style={styles.replyButton}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setReplybutton(true);
                                    setCommentText('');
                                }}>
                                <Text style={styles.replyText}>Reply</Text>
                            </TouchableOpacity>
                        ) : (
                            <View>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={3}
                                    style={styles.enterReply}
                                    placeholder="Enter Reply"
                                    placeholderTextColor="#A2A2A2"
                                    onChangeText={text => {
                                        setCommentText(text);
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        onPress();
                                        setReplybutton(false);
                                    }}
                                    style={styles.submitButton}
                                    activeOpacity={0.8}>
                                    <Text style={styles.submitText}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                )}
            </>
        </View>
    );
};

export default Reply;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: SIZE(16),
        borderWidth: 1,
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        marginBottom: SIZE(16),
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: SIZE(16),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
    },
    LeftBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyHeadImage: {
        width: SIZE(40),
        height: SIZE(40),
        marginRight: SIZE(12),
        borderRadius: SIZE(20),
        overflow: 'hidden',
    },
    NameText: {
        fontWeight: '600',
        fontSize: SIZE(16),
        lineHeight: SIZE(20),
        fontFamily: FONTS.semiBold,
        color: '#242424',
    },
    dateText: {
        fontWeight: '400',
        fontSize: SIZE(12),
        lineHeight: SIZE(15),
        fontFamily: FONTS.regular,
        color: '#757575',
    },
    centerContainer: {
        marginTop: SIZE(16),
        flexDirection: 'row',
        paddingBottom: SIZE(15),
        borderBottomWidth: 1,
        borderColor: '#E2E2E2',
        marginBottom: SIZE(16),
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
    replyButton: {
        borderWidth: 1,
        borderColor: '#009FD3',
        paddingVertical: SIZE(10),
        borderRadius: SIZE(6),
        alignItems: 'center',
    },
    replyText: {
        color: '#009FD3',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(22),
    },
    enterReply: {
        borderWidth: 1,
        borderColor: '#E2E2E2',
        backgroundColor: '#F7F7F7',
        padding: 0,
        padding: SIZE(16),
        color: '#242424',
        borderRadius: SIZE(8),
        fontWeight: '600',
        fontSize: SIZE(14),
        lineHeight: SIZE(17),
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(22),
        textAlignVertical: 'top',
        height: SIZE(100),
    },
    submitButton: {
        backgroundColor: '#003459',
        paddingVertical: SIZE(10),
        borderRadius: SIZE(6),
        alignItems: 'center',
    },
    submitText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: SIZE(14),
        lineHeight: SIZE(22),
        fontFamily: FONTS.bold,
    },
    replied: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZE(16),
    },
    repliedText: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#757575',
    },
    repliedDate: {
        fontSize: SIZE(12),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(15),
        color: '#757575',
    },
    repliedName: {
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        lineHeight: SIZE(17),
        color: '#242424',
    },
    repliedComment: {
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        lineHeight: SIZE(17),
        color: '#757575',
    },
});
