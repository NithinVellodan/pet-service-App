import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
//packages
import {useIsFocused} from '@react-navigation/native';

//constants
import {SIZE, SIZES} from '../../../../theme/theme';

// component
import Headers from '../../../includes/headers/Headers';
import PetShops from '../includes/PetShops';
import ModalScreen from '../../../Profile-related/ModalScreen';
import FilterPageEcom from './FilterPageEcom';
import ShopsAndDonated from '../includes/ShopsAndDonated';
import EmptyPageCustomer from '../includes/EmptyPageCustomer';

//svg

import ProductNull from '../../../../assets/icons/empty-page/product-null.svg';
import DonatedProducts from './DonatedProducts';
import {
    EcommerceApiDonatingShopList,
    EcommerceApiStoreList,
} from '../../EcommerceCustomerApi';

const Shops = () => {
    const isFocused = useIsFocused();
    const scrollViewRef = useRef(null);

    const [modalFilter, setModalFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('shops');
    const [filterItemSelected, setFilterItemSelected] = useState(0);
    const [isFilter, setIsFilter] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [storeList, setStoreList] = useState([]);
    const [donateStoreList, setDonateStoreList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //shopList api
    EcommerceApiStoreList({
        setStoreList,
        searchQuery,
        setIsLoading,
    });
    //donated shopList api
    EcommerceApiDonatingShopList({
        setDonateStoreList,
        searchQuery,
        setIsLoading,
    });

    const filterModal = () => {
        setIsFilter(!isFilter);
    };

    const renderPetShop = ({item}) => <PetShops shopCard={item} item={item} />;
    const renderDonatedShop = ({item}) => (
        <DonatedProducts DonateCard={donateStoreList} item={item} />
    );
    const scrollToBottom = () => {
        scrollViewRef?.current?.scrollToOffset({offset: 0, animated: true});
    };
    useEffect(() => {
        if (isFocused) {
            scrollToBottom();
        }
    }, [isFocused]);

    return (
        <View style={{minHeight: '100%'}}>
            <Headers
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                headText={'Shops'}
                icon={true}
                searchCommerce={true}
                onPressFilter={() => {
                    setModalFilter(true);
                }}
                reverse={true}
                filterItemSelected={filterItemSelected}
                setFilterItemSelected={setFilterItemSelected}
                filterModal={filterModal}
                setSearchQueryCustomer={setSearchQuery}
            />

            <View
                style={{
                    paddingTop: SIZE(30),
                    paddingBottom: SIZE(15),
                    paddingHorizontal: SIZE(16),
                }}>
                <ShopsAndDonated
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </View>
            {isLoading ? (
                <ActivityIndicator
                    style={{
                        height: SIZES.height - SIZE(200),
                    }}
                    size={'large'}
                    color={'#009fd3'}
                />
            ) : (
                <FlatList
                    bounces={false}
                    ref={scrollViewRef}
                    style={{
                        flex: 1,
                        minHeight: 'auto',
                    }}
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        paddingHorizontal: SIZE(6),
                        paddingBottom: SIZE(50),
                    }}
                    showsVerticalScrollIndicator={false}
                    data={
                        selectedCategory === 'shops'
                            ? storeList
                            : donateStoreList
                    }
                    keyExtractor={item => item.id.toString()}
                    renderItem={
                        selectedCategory === 'shops'
                            ? renderPetShop
                            : renderDonatedShop
                    }
                    numColumns={2}
                    ListEmptyComponent={
                        selectedCategory === 'shops' ? (
                            <EmptyPageCustomer
                                heading={'Empty Products'}
                                image={<ProductNull />}
                                button={'Shop now'}
                                description={'Products are Currently Empty.'}
                            />
                        ) : (
                            <EmptyPageCustomer
                                heading={'Empty Products'}
                                image={<ProductNull />}
                                button={'Shop now'}
                                description={
                                    ' Donated Products are Currently Empty.'
                                }
                            />
                        )
                    }
                />
            )}
            <ModalScreen
                isVisible={isFilter}
                setVisible={setIsFilter}
                size={true}
                inner={<FilterPageEcom close={setIsFilter} />}
            />
        </View>
    );
};

export default Shops;

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingTop: SIZE(28),
    },
});
