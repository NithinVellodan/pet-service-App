import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';

//packages
import {useNavigation} from '@react-navigation/native';

//constant
import {SIZE} from '../../../../theme/theme';
import {Context} from '../../../../contexts/Store';

//components
import Headers from '../../../includes/headers/Headers';
import OfferCard from '../includes/OfferCard';
import EmptyPageCustomer from '../includes/EmptyPageCustomer';
import UserLogin from '../../../booking/includes/UserLogin';
import ModalScreen from '../../../Profile-related/ModalScreen';

//svg
import WishListNull from '../../../../assets/icons/empty-page/wishlist-null.svg';

const WishlistCustomer = () => {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();
    //search
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishListItems, setWishListItems] = useState(state?.wishList);
    const [refresh, setRefresh] = useState(false);
    const [isType, setType] = useState('mail');
    const [userModal, setUserModal] = useState(false);

    useEffect(() => {
        setWishListItems(state?.wishList);
    }, [state?.wishList]);

    const filteredWishListItems = wishListItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    // console.log(state.cart, 'cart');
    // console.log(state?.wishList, 'wishList');

    return (
        <View>
            <Headers
                cartPress={() => {
                    navigation.navigate('CartCustomer');
                }}
                icon={true}
                searchCommerce={true}
                cart={true}
                headText={'Wishlist'}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                setSearchQueryCustomer={setSearchQuery}
            />

            <ScrollView
                contentContainerStyle={styles.ScrollViewContainer}
                bounces={false}>
                {filteredWishListItems.length === 0 ? (
                    <View
                        style={{
                            marginTop: SIZE(100),
                        }}>
                        <EmptyPageCustomer
                            heading={'Empty Wishlist'}
                            description={'Your Wishlist is Currently Empty.'}
                            button={'Shop now'}
                            image={<WishListNull />}
                        />
                    </View>
                ) : (
                    filteredWishListItems.map((item, index) => (
                        <OfferCard
                            wishListData={true}
                            key={index}
                            item={item}
                            orderSummaryData={true}
                            setRefresh={setRefresh}
                            refresh={refresh}
                            setUserModal={setUserModal}
                            userModal={userModal}
                        />
                    ))
                )}
            </ScrollView>
            <ModalScreen
                isVisible={userModal}
                setVisible={setUserModal}
                inner={<UserLogin isType={isType} close={setUserModal} />}
            />
        </View>
    );
};

export default WishlistCustomer;

const styles = StyleSheet.create({
    ScrollViewContainer: {
        paddingBottom: SIZE(90),
    },
});
