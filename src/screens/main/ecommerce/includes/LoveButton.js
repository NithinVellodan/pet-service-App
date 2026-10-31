import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SIZE} from '../../../../theme/theme';
// svg
import HeartIconFilled from '../../../../assets/icons/heartfilled.svg';
import HeartIconWithout from '../../../../assets/icons/ecommerce/customer/heart.svg';
import {Context} from '../../../../contexts/Store';
import {toggleWishlistPet} from '../../EcommerceCustomerApi';

const LoveButton = ({item, setUserModal, setScreen}) => {
    const {state, dispatch} = useContext(Context);

    const handlePress = async selected => {
        let user_tocken = state;
        toggleWishlistPet(selected.id, user_tocken);
        if (state.wishList?.find(obj => obj.id === selected.id)) {
            dispatch({
                type: 'ADD_TO_WISH',
                wishList: selected,
            });
        } else {
            let updatedData = {
                ...selected,
                is_in_wishlist: true,
                final_price: selected?.offer_price,
            };
            console.log('no____match');
            dispatch({
                type: 'ADD_TO_WISH',
                wishList: updatedData,
            });
        }
    };

    return (
        <View>
            <TouchableOpacity
                hitSlop={10}
                onPress={() => {
                    if (state.userData.is_login) {
                        handlePress(item);
                    } else {
                        setUserModal(true);
                        setScreen('login');
                    }
                }}
                activeOpacity={0.8}
                style={styles.wishlistIconContainer}>
                {state.wishList.find(obj => obj?.id === item.id) ? (
                    <HeartIconFilled width={'100%'} height={'100%'} />
                ) : (
                    <HeartIconWithout width={'100%'} height={'100%'} />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default LoveButton;

const styles = StyleSheet.create({
    wishlistIconContainer: {
        width: SIZE(28),
        height: SIZE(28),
        padding: SIZE(6),
        backgroundColor: '#EAF7FF',
        borderRadius: SIZE(50),
    },
});
