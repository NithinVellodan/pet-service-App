import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import React, {useState} from 'react';

// packages
import Modal from 'react-native-modal';

//constants
import {SIZE} from '../../theme/theme';
import {FONTS} from '../../theme/fonts';
//component
import CardModal from '../booking/CardModal';
import RemoveCardModal from './includes/RemoveCardModal';

//images and logos
import EditIcon from '../../assets/icons/editdark.svg';
import TrashIcon from '../../assets/icons/trashdark.svg';
import EditBlueIcon from '../../assets/icons/editblue.svg';
import TrashBlueIcon from '../../assets/icons/trashlight.svg';

const CardSingle = ({
    selected,
    setSelected,
    section,
    item,
    index,
    id,
    editModal,
    setEditModal,
    state,
    handleEditItem,
    editedIndex,
    editCardAtm,
    removeCard,
    handleRemoveItem,
    pk,
    existError,
}) => {
    const [removeModal, setRemoveModal] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => {
                setSelected(item.id);
            }}
            activeOpacity={0.8}
            key={index}
            style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.leftContainer}>
                        <View
                            style={[
                                styles.selectButton,
                                {
                                    borderColor:
                                        selected == item.id
                                            ? state?.userData?.is_service
                                                ? '#003459'
                                                : '#009FD3'
                                            : '#969696',
                                },
                            ]}>
                            <View
                                style={[
                                    styles.selection,
                                    {
                                        backgroundColor:
                                            selected == item.id
                                                ? state?.userData?.is_service
                                                    ? '#003459'
                                                    : '#009FD3'
                                                : '#fff',
                                    },
                                ]}
                            />
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Text style={styles.cardText}>
                            {item.card.brand.charAt(0).toUpperCase() +
                                item.card.brand.slice(1)}{' '}
                            {`***********` + item.card.last4}
                        </Text>
                        <Text style={styles.nameText}>
                            {/* {item.cardholder_name} */}
                        </Text>
                        <Text style={styles.expiryText}>
                            {/* Expiry: {item.expiration_date} */}
                            Expiry : {item.card.exp_month + '/'}
                            {item.card.exp_year}
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        hitSlop={10}
                        onPress={() => {
                            setRemoveModal(true);
                            handleRemoveItem(item.id);
                        }}
                        activeOpacity={0.8}
                        style={styles.actionSection}>
                        <View style={styles.actionIcon}>
                            {state?.userData?.is_service ? (
                                <TrashIcon width={'100%'} height={'100%'} />
                            ) : (
                                <TrashBlueIcon width={'100%'} height={'100%'} />
                            )}
                        </View>
                        <Text
                            style={[
                                styles.actionText,
                                {
                                    color: !state?.userData?.is_service
                                        ? '#009FD3'
                                        : '#003459',
                                },
                            ]}>
                            Remove
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                isVisible={editModal}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={styles.modalContainer}
                onBackdropPress={() => Keyboard.dismiss()}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <View style={styles.modalSubContainer}>
                    <CardModal
                        creditCardNumber={editedIndex?.card_number}
                        dateExpiry={editedIndex?.expiration_date}
                        holderName={editedIndex?.cardholder_name}
                        editCard={(editCard = true)}
                        item={item}
                        editModal={editModal}
                        setEditModal={setEditModal}
                        id={id}
                        editCardApi={editCardAtm}
                        editedIndex={editedIndex}
                        existError={existError}
                    />
                </View>
            </Modal>
            <Modal
                isVisible={removeModal}
                animationInTiming={400}
                animationOutTiming={400}
                animationIn={'slideInUp'}
                backdropOpacity={0.2}
                useNativeDriver={false}
                useNativeDriverForBackdrop={true}
                style={styles.modalContainer}
                onBackdropPress={() => setRemoveModal(false)}
                propagateSwipe={true}
                avoidKeyboard={true}>
                <RemoveCardModal
                    removeCard={() => removeCard(pk)}
                    setRemoveModal={setRemoveModal}
                    state={state}
                    id={pk}
                    section={section}
                />
            </Modal>
        </TouchableOpacity>
    );
};

export default CardSingle;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        marginBottom: SIZE(16),
    },
    subContainer: {
        borderWidth: SIZE(1),
        borderColor: '#E2E2E2',
        borderRadius: SIZE(8),
        paddingHorizontal: SIZE(12),
        paddingVertical: SIZE(16),
    },
    topContainer: {
        flexDirection: 'row',
        borderBottomWidth: SIZE(1),
        borderBottomColor: '#E2E2E2',
        paddingBottom: SIZE(16),
        marginBottom: SIZE(16),
    },
    leftContainer: {},
    selectButton: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(100),
    },
    selection: {
        width: SIZE(12),
        height: SIZE(12),
        backgroundColor: 'red',
        borderRadius: SIZE(100),
    },
    rightContainer: {
        marginLeft: SIZE(12),
    },
    cardText: {
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(12),
    },
    nameText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.semiBold,
        marginBottom: SIZE(6),
    },
    expiryText: {
        color: '#969696',
        fontSize: SIZE(14),
        fontWeight: '400',
        fontFamily: FONTS.regular,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    actionSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        width: SIZE(20),
        height: SIZE(20),
        marginRight: SIZE(12),
    },
    actionText: {
        color: '#003459',
        fontSize: SIZE(14),
        fontWeight: '600',
        fontFamily: FONTS.bold,
        letterSpacing: SIZE(0.5),
        lineHeight: SIZE(22),
    },
    modalContainer: {
        screenBackgroundcolor: 'transparent',
        modalPresentationStyle: 'overCurrentContext',
        paddingHorizontal: SIZE(20),
        margin: SIZE(0),
    },
    modalSubContainer: {
        backgroundColor: '#f7f7f7',
        borderRadius: SIZE(12),
    },
});
