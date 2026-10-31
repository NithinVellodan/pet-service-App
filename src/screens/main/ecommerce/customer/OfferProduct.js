import {StyleSheet, View, ScrollView} from 'react-native';
import {React, useState} from 'react';
// component
import Headers from '../../../includes/headers/Headers';
import SearchCustomer from '../includes/SearchCustomer';
import ModalScreen from '../../../Profile-related/ModalScreen';
import FilterPageEcom from './FilterPageEcom';
//svg
import AvatarOne from '../../../../assets/icons/ecommerce/customer/avatar-one.svg';
import AvatarTwo from '../../../../assets/icons/ecommerce/customer/avatar-two.svg';
//constants
import OfferCard from '../includes/OfferCard';

const OfferProduct = ({}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalFilter, setModalFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');

    const FilterItem = [
        {
            id: 1,
            type: 'Food',
        },
        {
            id: 2,
            type: 'Cages',
        },
        {
            id: 3,
            type: 'Toys',
        },
        {
            id: 4,
            type: 'Vessels',
        },
        {
            id: 5,
            type: 'Shampoo',
        },
        {
            id: 6,
            type: 'Biscuit',
        },
        {
            id: 7,
            type: 'Toys',
        },
    ];

    const data = [
        {
            id: 1,
            image: require('../../../../assets/images/ecommerce/customer/food1.png'),
            title: 'All Cats',
            description: 'Mollis et et adipiscing...',
            price: 60,
            offer: 30,
            rate: 49,
            avatar: <AvatarOne width={'100%'} height={'100%'} />,
            name: 'Carter Geidt',
            rating: 4.5,
        },
        {
            id: 2,
            image: require('../../../../assets/images/ecommerce/customer/food2.png'),
            title: 'Pedigree',
            description: 'Mollis et et adipiscing...',
            price: 60,
            offer: 35,
            rate: 50,
            avatar: <AvatarTwo width={'100%'} height={'100%'} />,
            name: 'Robert',
            rating: 3.5,
        },
    ];

    return (
        <View>
            <Headers headText={'Offer Products'} icon={true} shareIcon={true} />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <SearchCustomer
                    FilterItem={FilterItem}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    setSearchQuery={setSearchQuery}
                    onPressFilter={() => {
                        setModalFilter(true);
                    }}
                    filter={true}
                    reverse={true}
                    onPressItem={() => {
                        console.log('selectedFilterItem');
                    }}
                />
                <View>
                    {data.map((item, index) => (
                        <OfferCard OfferData={true} key={index} item={item} />
                    ))}
                </View>
            </ScrollView>
            <ModalScreen
                isVisible={modalFilter}
                setVisible={setModalFilter}
                size={true}
                inner={<FilterPageEcom close={setModalFilter} />}
            />
        </View>
    );
};

export default OfferProduct;

const styles = StyleSheet.create({});
