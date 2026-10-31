import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import Headers from '../../../includes/headers/Headers';
import EmptyShop from '../../../../assets/icons/ecommerce/emptyshop.svg';
import {SIZE} from '../../../../theme/theme';
import {FONTS} from '../../../../theme/fonts';
import ModalScreen from '../../../Profile-related/ModalScreen';
import AddStore from './AddStore';
import {useNavigation} from '@react-navigation/native';
import {Context} from '../../../../contexts/Store';
import {ecommerceApiServiceProvider} from '../../../../../axiosConfig';
import ConfirmationStore from '../../../detail/ConfirmationStore';

const ShopProvider = () => {
    const {state, dispatch} = useContext(Context);
    const navigation = useNavigation();
    const toastRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilter, setIsFilter] = useState(false);
    const [filterItemSelected, setFilterItemSelected] = useState(0);
    const [loading, setLoading] = useState(false);
    // addstore
    const [storeScreen, setStoreScreen] = useState('addStore');
    const [storeTitle, setStoreTitle] = useState('');
    const [shopImage, setShopImage] = useState([]);
    const [geoAddressTextStore, setGeoAddressTextStore] = useState();
    const [addressTextStore, setAddressTextStore] = useState();
    const [errorMessage, setErrorMessage] = useState({});
    const [exactLocationStore, setExactLocationStore] = useState({
        latitude: '',
        longitude: '',
    });
    const finalLocationStore = geoAddressTextStore
        ? geoAddressTextStore
        : addressTextStore;

    const filterModal = () => {
        setIsFilter(!isFilter);
    };
    const updateUserDate = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };

    const addStore = async () => {
        setLoading(true);
        const token = state.userData.accessToken;
        const formData = new FormData();
        shopImage.forEach((image, index) => {
            formData.append('image', {
                uri: image.path,
                type: image.mime,
                name: image.name,
            });
        });
        formData.append('name', storeTitle);
        formData.append('latitude', exactLocationStore.latitude);
        formData.append('location', finalLocationStore);
        formData.append('longitude', exactLocationStore.longitude);
        try {
            await ecommerceApiServiceProvider

                .post('add-store/', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    const {StatusCode} = response.data;
                    if (StatusCode == 6000) {
                        navigation.navigate('EcommerceTab');
                        updateUserDate({
                            ...state.userData,
                            store_add: true,
                            store_name: storeTitle,
                        });
                        setShowModal(false);
                    }

                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    console.log('error response addstore', error.response.data);
                });
        } catch (error) {
            console.log('error => ', error);
            setLoading(false);
        }
    };
    const clearStore = () => {
        setStoreTitle('');
        setShopImage([]);
        setGeoAddressTextStore('');
        setAddressTextStore();
        setExactLocationStore({
            latitude: '',
            longitude: '',
        });
        setErrorMessage('');
    };

    return (
        <View style={{flex: 1}}>
            <Headers
                icon={state.userData.store_add ? true : false}
                filter={state.userData.store_add ? true : false}
                searchCommerce={true}
                headText={'Shop for pet'}
                isSearch={isSearch}
                setIsSearch={setIsSearch}
                onPressSearch={() => {
                    setIsSearch(true);
                }}
                setSearchQuery={setSearchQuery}
                onPressFilter={() => {
                    console.log('filterPress');
                }}
                filterItemSelected={filterItemSelected}
                setFilterItemSelected={setFilterItemSelected}
                filterModal={filterModal}
            />
            <View style={styles.emptyContainer}>
                <View>
                    <EmptyShop height={SIZE(280)} width={SIZE(300)} />
                </View>
                <View style={styles.bottomBox}>
                    <Text allowFontScaling={false} style={styles.addStore}>
                        Add Store
                    </Text>
                    <Text
                        allowFontScaling={false}
                        style={styles.addStoreProduct}>
                        Add Store to add products
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.addStoreButton}
                        onPress={() => {
                            setShowModal(true);
                        }}>
                        <Text
                            allowFontScaling={false}
                            style={styles.addStoreButtonText}>
                            + Add Store
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ModalScreen
                isVisible={showModal}
                setVisible={setShowModal}
                toastRef={toastRef}
                inner={
                    storeScreen === 'addStore' ? (
                        <AddStore
                            storeTitle={storeTitle}
                            setStoreTitle={setStoreTitle}
                            shopImage={shopImage}
                            setShopImage={setShopImage}
                            geoAddressText={geoAddressTextStore}
                            setGeoAddressText={setGeoAddressTextStore}
                            addressText={addressTextStore}
                            setAddressText={setAddressTextStore}
                            exactLocation={exactLocationStore}
                            setExactLocation={setExactLocationStore}
                            finalLocation={finalLocationStore}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                            close={setShowModal}
                            setDetailScreens={setStoreScreen}
                            clearStore={clearStore}
                            toastRef={toastRef}
                        />
                    ) : (
                        storeScreen === 'confiromStore' && (
                            <ConfirmationStore
                                setDetailScreens={setStoreScreen}
                                setOpen={setShowModal}
                                addStore={addStore}
                                clearStore={clearStore}
                                buttonLoader={loading}
                            />
                        )
                    )
                }
            />
        </View>
    );
};

export default ShopProvider;

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBox: {
        alignItems: 'center',
    },
    addStore: {
        color: '#000000',
        fontSize: SIZE(20),
        fontFamily: FONTS.semiBold,
        fontWeight: '600',
        lineHeight: SIZE(25),
    },
    addStoreProduct: {
        marginTop: SIZE(12),
        marginBottom: SIZE(24),
        color: '#686868',
        fontSize: SIZE(16),
        fontFamily: FONTS.regular,
        fontWeight: '400',
        lineHeight: SIZE(20),
    },
    addStoreButton: {
        padding: SIZE(10),
        backgroundColor: '#003459',
        width: SIZE(145),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE(6),
    },
    addStoreButtonText: {
        color: '#FFF',
        fontSize: SIZE(14),
        fontFamily: FONTS.bold,
        fontWeight: '700',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
});
