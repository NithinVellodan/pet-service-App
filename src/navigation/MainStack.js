import {StyleSheet, Text, View, Platform, Linking} from 'react-native';
import React, {useContext, useEffect} from 'react';

// packages
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import notifee from '@notifee/react-native';

// constants
import {FONTS} from '../theme/fonts';
import {usersConfigGeneral} from '../../axiosConfig';
import {SIZE} from '../theme/theme';
import {Context} from '../contexts/Store';

//images and logos
import ProfileEnable from '../assets/icons/profile-enable.svg';
import ProfileDisable from '../assets/icons/profile-disable.svg';
import HomeEnabled from '../assets/icons/HomeEnabled.svg';
import HomeDisabled from '../assets/icons/HomeDisabled.svg';
import InventoryEnabled from '../assets/icons/InventoryEnabled.svg';
import InventoryDisabled from '../assets/icons/InventoryDisabled.svg';
import OrderEnabled from '../assets/icons/OrderEnabled.svg';
import OrderDisabled from '../assets/icons/OrderDisabled.svg';
import BookingEnabled from '../assets/icons/BookingEnabled.svg';
import BookingDisabled from '../assets/icons/BookingDisabled.svg';
import ChatEnabled from '../assets/icons/ChatEnabled.svg';
import ChatDisabled from '../assets/icons/ChatDisabled.svg';
import WalletEnabled from '../assets/icons/WalletEnabled.svg';
import WalletDisabled from '../assets/icons/WalletDisabled.svg';
import WishlistDisabled from '../assets/icons/WishlistDisabled.svg';
import WishlistEnabled from '../assets/icons/WishlistEnabled.svg';
import ProfilePage from '../screens/Profile-related/ProfilePage';

import DrawerContent from './DrawerContent';
import Upcoming from '../screens/main/Upcoming';

// pages
import DetailsPet from '../screens/detail/DetailsPet';
import MainHome from '../screens/main/MainHome';
import Bookings from '../screens/Home/Bookings';
import Chat from '../screens/Home/Chat';
import Wallet from '../screens/Home/Wallet';
import Wishlist from '../screens/Home/Wishlist';
import SearchPage from '../screens/main/SearchPage';
import ModalList from '../screens/main/ModalList';
import FilterListPage from '../screens/homeScreens/FilterListPage';
import ServiceProviderSinglePage from '../screens/homeScreens/ServiceProviderSinglePage';

//components

import PetSingle from '../screens/main/PetSingle';
import BorrowPetSingle from '../screens/homeScreens/BorrowPetSingle';
import BookingItem from '../screens/booking/BookingItem';
import PlaceToStay from '../screens/homeScreens/PlaceToStay';
import PlaceToStaySingle from '../screens/homeScreens/BorrowPetSingle';
import BottomSheet from '../screens/goolgle-map/BottomSheet';
import BookingSummary from '../screens/booking/BookingSummary';
import BookingSummaryBorrowPet from '../screens/booking/BookingSummaryBorrowPet';
import MainFilter from '../screens/filter/MainFilter';
import PaymentSuccess from '../screens/successScreen/PaymentSuccess';
import SavedCards from '../screens/Profile-related/SavedCards';
import MyReviews from '../screens/reviews/MyReviews';
import BorrowBookingSinge from '../screens/booking/BorrowBookingSingle';
import MyPets from '../screens/Profile-related/MyPets';
import MyPlaces from '../screens/Profile-related/MyPlaces';
import PrivacyPolicy from '../screens/Privacy Policy/PrivacyPolicy';
import TermsAndCondition from '../screens/Terms And Condition/TermsAndCondition';
import AboutUs from '../screens/Terms And Condition/AboutUs';
import NotificationPage from '../screens/includes/notification/NotificationPage';
import CustomerReviews from '../screens/reviews/CustomerReviews';
import AddReview from '../screens/reviews/AddReview';
import EditReview from '../screens/reviews/EditReview';
import ChatInner from '../screens/Home/ChatInner';
import NewArrival from '../screens/homeScreens/NewArrival';
import WalletCardSection from '../screens/Home/includes/WalletCardSection';
import MyPetsCustomer from '../screens/Profile-related/MyPetsCustomer';
import MyPetsSingleCustomer from '../screens/Profile-related/MyPetsSingleCustomer';
import CustomerAddresses from '../screens/Profile-related/CustomerAddresses';
import PaymentFailed from '../screens/successScreen/PaymentFailed';
import CustomerBookingPlace from '../screens/booking/includes/CustomerBookingPlace';
import ShopProvider from '../screens/main/ecommerce/provoider/ShopProvider';
import ShopCustomer from '../screens/main/ecommerce/customer/ShopCustomer';
import ShopProviderHome from '../screens/main/ecommerce/provoider/mainscreens/ShopProviderHome';
import Inventory from '../screens/main/ecommerce/provoider/mainscreens/Inventory';
import OrdersStore from '../screens/main/ecommerce/provoider/mainscreens/OrdersStore';
import WishlistCustomer from '../screens/main/ecommerce/customer/WishlistCustomer';
import Shops from '../screens/main/ecommerce/customer/Shops';
import OrderCustomer from '../screens/main/ecommerce/customer/OrderCustomer';
import OfferProduct from '../screens/main/ecommerce/customer/OfferProduct';
import ShopDetail from '../screens/main/ecommerce/includes/ShopDetail';
import ProductDetail from '../screens/main/ecommerce/customer/ProductDetail';
import BillingAddress from '../screens/booking/includes/BillingAddress';
import OrderSummary from '../screens/main/ecommerce/customer/OrderSummary';
import CustomerPayment from '../screens/main/ecommerce/includes/CustomerPayment';
import OrderDetailCustomer from '../screens/main/ecommerce/customer/OrderDetailCustomer';
import OrderDetailConfirmed from '../screens/main/ecommerce/includes/OrderDetailConfirmed';
import OrderStatus from '../screens/main/ecommerce/includes/OrderStatus';
import CartCustomer from '../screens/main/ecommerce/customer/CartCustomer';
import FilterPageEcom from '../screens/main/ecommerce/customer/FilterPageEcom';
import OfferItem from '../screens/main/ecommerce/provoider/OfferItem';
import OfferSingle from '../screens/main/ecommerce/provoider/OfferSingle';
import OrderDetails from '../screens/main/ecommerce/provoider/OrderDetails';
import DonateSingle from '../screens/main/ecommerce/provoider/DonateSingle';
import DefaultVariant from '../screens/main/ecommerce/provoider/DefaultVariant';
import DonatedProductDetail from '../screens/main/ecommerce/customer/DonatedProductDetail';
import ProductCustomer from '../screens/main/ecommerce/customer/ProductCustomer';
import AddBankAccount from '../screens/Profile-related/AddBankAccount';
import DonateSummary from '../screens/main/ecommerce/provoider/DonateSummary';
import ProductSingle from '../screens/main/ecommerce/provoider/ProductSingle';
import EcoShippingAddress from '../screens/main/ecommerce/includes/EcoShippingAddress';
import ReviwsProviderPage from '../screens/main/ecommerce/provoider/ReviwsProviderPage';
import EcommerceChat from '../screens/main/ecommerce/ecomchat/EcommerceChat';
import EcommerceChatInner from '../screens/main/ecommerce/ecomchat/EcommerceChatInner';
import CustomerSearchSection from '../screens/main/ecommerce/customer/CustomerSearchSection';
import NoInternet from '../screens/includes/NoInternet';
import DonateCustomerSingle from '../screens/main/ecommerce/includes/DonateCustomerSingle';
import TrainerSingle from '../screens/main/trainers/customer/TrainerSingle';
import TrainerSinglePage from '../screens/homeScreens/TrainerSinglePage';
import BookingSummaryTrainerCustomer from '../screens/booking/BookingSummaryTrainerCustomer';
import TrainerProviderBooking from '../screens/main/trainers/customer/TrainerProviderBooking';
import ServiceListPage from '../screens/main/trainers/customer/ServiceListPage';
import ServiceSinglePage from '../screens/main/trainers/customer/ServiceSinglePage';
import TrainerBookingSingle from '../screens/Home/includes/TrainerBookingSingle';
import LostAndFoundListPage from '../screens/main/lost-found/LostAndFoundListPage';
import LostAndFoundSinglePage from '../screens/main/lost-found/LostAndFoundSinglePage';
import HistoryPage from '../screens/Home/includes/HistoryPage';
import FaqSection from '../screens/common/FaqSection';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MainTabNavigation() {
    const {state} = useContext(Context);

    return state.userData.is_service ? (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarHideOnKeyboard: true,

                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                    {
                        backgroundColor: '#009FD3',
                        borderTopRightRadius: SIZE(20),
                        borderTopLeftRadius: SIZE(20),
                        height: SIZE(79),
                    },
                ],

                headerShown: false,
                tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.20)',
                tabBarIcon: ({focused}) => {
                    let iconWidth = SIZE(28);
                    let iconHeight = SIZE(28);
                    if (focused) {
                        iconWidth = SIZE(30);
                        iconHeight = SIZE(30);
                    }
                    if (route.name === 'MainHomeNavigatorServiceProvider') {
                        return focused ? (
                            <HomeEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <HomeDisabled width={SIZE(28)} height={SIZE(28)} />
                        );
                    } else if (route.name === 'BookingSectionStack') {
                        return focused ? (
                            <BookingEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <View>
                                {state.readSection.un_read_booking_provider ==
                                    true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <BookingDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'Chat') {
                        return focused ? (
                            <ChatEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection.unread_chats == true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <ChatDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'WalletStackProvider') {
                        return focused ? (
                            <WalletEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <WalletDisabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    } else if (route.name === 'Wishlist') {
                        return focused ? (
                            <WishlistEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <WishlistDisabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    }
                },
                tabBarLabel: ({focused}) => {
                    let TabLabel;
                    if (route.name === 'MainHomeNavigatorServiceProvider') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank} />
                        ) : (
                            <Text style={styles.labelText}>Home</Text>
                        );
                    } else if (route.name === 'BookingSectionStack') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Booking</Text>
                        );
                    } else if (route.name === 'Chat') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Chat</Text>
                        );
                    } else if (route.name === 'WalletStackProvider') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Wallet</Text>
                        );
                    } else if (route.name === 'Wishlist') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Wishlist</Text>
                        );
                    }
                    return TabLabel;
                },
            })}>
            <Tab.Screen
                name="MainHomeNavigatorServiceProvider"
                component={MainHomeNavigatorServiceProvider}
            />
            <Tab.Screen
                name="BookingSectionStack"
                component={BookingSectionStack}
                initialParams={{isFromBottomTab: 'true'}}
            />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen
                name="WalletStackProvider"
                component={WalletStackProvider}
            />
        </Tab.Navigator>
    ) : (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarHideOnKeyboard: true,

                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                    {
                        backgroundColor: '#003459',
                        borderTopRightRadius: SIZE(20),
                        borderTopLeftRadius: SIZE(20),
                        height: SIZE(79),
                    },
                ],
                headerShown: false,

                tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.06)',
                tabBarIcon: ({focused}) => {
                    let iconWidth = SIZE(28);
                    let iconHeight = SIZE(28);
                    if (focused) {
                        iconWidth = SIZE(30);
                        iconHeight = SIZE(30);
                    }
                    if (route.name === 'MainHomeNavigatorCustomer') {
                        return focused ? (
                            <HomeEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <HomeDisabled width={SIZE(28)} height={SIZE(28)} />
                        );
                    } else if (route.name === 'BookingSectionStack') {
                        return focused ? (
                            <BookingEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <View>
                                {state.readSection.un_read_booking_customer ==
                                    true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <BookingDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'Chat') {
                        return focused ? (
                            <ChatEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection.unread_chats == true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <ChatDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'WalletStackCustomer') {
                        return focused ? (
                            <WalletEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection.un_read == true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <WalletDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'Wishlist') {
                        return focused ? (
                            <WishlistEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <WishlistDisabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    }
                },
                tabBarLabel: ({focused}) => {
                    let TabLabel;
                    if (route.name === 'MainHomeNavigatorCustomer') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank} />
                        ) : (
                            <Text style={styles.labelText}>Home</Text>
                        );
                    } else if (route.name === 'BookingSectionStack') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Booking</Text>
                        );
                    } else if (route.name === 'Chat') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Chat</Text>
                        );
                    } else if (route.name === 'WalletStackCustomer') {
                        TabLabel = focused ? (
                            <View style={[styles.labelBlank]}></View>
                        ) : (
                            <Text style={styles.labelText}>Wallet</Text>
                        );
                    } else if (route.name === 'Wishlist') {
                        TabLabel = focused ? (
                            <View style={[styles.labelBlank]}></View>
                        ) : (
                            <Text style={styles.labelText}>Wishlist</Text>
                        );
                    }
                    return TabLabel;
                },
            })}>
            <Tab.Screen
                name="MainHomeNavigatorCustomer"
                component={MainHomeNavigatorCustomer}
            />
            <Tab.Screen name="Wishlist" component={Wishlist} />
            <Tab.Screen
                name="BookingSectionStack"
                component={BookingSectionStack}
                initialParams={{isFromBottomTab: 'true'}}
            />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen
                name="WalletStackCustomer"
                component={WalletStackCustomer}
            />
        </Tab.Navigator>
    );
}

const EcommerceTab = () => {
    const {state, dispatch} = useContext(Context);

    return state.userData.is_service ? (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                    {
                        backgroundColor: '#009FD3',
                        borderTopRightRadius: SIZE(20),
                        borderTopLeftRadius: SIZE(20),
                        height: SIZE(79),
                    },
                ],
                headerShown: false,
                tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.20)',
                tabBarIcon: ({focused}) => {
                    let iconWidth = SIZE(28);
                    let iconHeight = SIZE(28);
                    if (focused) {
                        iconWidth = SIZE(30);
                        iconHeight = SIZE(30);
                    }
                    if (route.name === 'ShopProviderHome') {
                        return focused ? (
                            <HomeEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <HomeDisabled width={SIZE(28)} height={SIZE(28)} />
                        );
                    } else if (route.name === 'Inventory') {
                        return focused ? (
                            <InventoryEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <InventoryDisabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    } else if (route.name === 'EcommerceChat') {
                        return focused ? (
                            <ChatEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection.unread_chats_ecom ==
                                    true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <ChatDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'WalletStackProvider') {
                        return focused ? (
                            <WalletEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <WalletDisabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    } else if (route.name === 'OrdersStore') {
                        return focused ? (
                            <OrderEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection
                                    .un_read_booking_ecom_provider == true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <OrderDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    }
                },
                tabBarLabel: ({focused}) => {
                    let TabLabel;
                    if (route.name === 'ShopProviderHome') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank} />
                        ) : (
                            <Text style={styles.labelText}>Home</Text>
                        );
                    } else if (route.name === 'Inventory') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Inventory</Text>
                        );
                    } else if (route.name === 'EcommerceChat') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Chat</Text>
                        );
                    } else if (route.name === 'WalletStackProvider') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Wallet</Text>
                        );
                    } else if (route.name === 'OrdersStore') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Orders</Text>
                        );
                    }
                    return TabLabel;
                },
            })}>
            <Tab.Screen name="ShopProviderHome" component={ShopProviderHome} />
            <Tab.Screen name="Inventory" component={Inventory} />
            <Tab.Screen name="OrdersStore" component={OrdersStore} />
            <Tab.Screen name="EcommerceChat" component={EcommerceChat} />
            <Tab.Screen
                name="WalletStackProvider"
                component={WalletStackProvider}
            />
        </Tab.Navigator>
    ) : (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarHideOnKeyboard: true,

                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                    {
                        backgroundColor: '#003459',
                        borderTopRightRadius: SIZE(20),
                        borderTopLeftRadius: SIZE(20),
                        height: SIZE(79),
                    },
                ],
                headerShown: false,

                tabBarActiveBackgroundColor: 'rgba(255, 255, 255, 0.06)',
                tabBarIcon: ({focused}) => {
                    let iconWidth = SIZE(28);
                    let iconHeight = SIZE(28);
                    if (focused) {
                        iconWidth = SIZE(30);
                        iconHeight = SIZE(30);
                    }
                    if (route.name === 'ShopCustomer') {
                        return focused ? (
                            <HomeEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <HomeDisabled width={SIZE(28)} height={SIZE(28)} />
                        );
                    } else if (route.name === 'BookingSectionStack') {
                        return focused ? (
                            <BookingEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <View>
                                {state.readSection.un_read_booking_customer ==
                                    true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: 10,
                                            height: 10,
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            top: SIZE(0),
                                            left: SIZE(1),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <BookingDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'Shops') {
                        return focused ? (
                            <InventoryEnabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        ) : (
                            <InventoryDisabled
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    } else if (route.name === 'OrderCustomer') {
                        return focused ? (
                            <OrderEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection
                                    .un_read_booking_ecom_customer == true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <OrderDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'EcommerceChat') {
                        return focused ? (
                            <ChatEnabled width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <View>
                                {state.readSection.unread_chats_ecom ==
                                    true && (
                                    <View
                                        style={{
                                            backgroundColor: 'red',
                                            width: SIZE(10),
                                            height: SIZE(10),
                                            borderRadius: SIZE(100),
                                            position: 'absolute',
                                            bottom: SIZE(20),
                                            left: SIZE(20),
                                            zIndex: 10,
                                        }}
                                    />
                                )}
                                <ChatDisabled
                                    width={SIZE(28)}
                                    height={SIZE(28)}
                                />
                            </View>
                        );
                    } else if (route.name === 'ProfilePage') {
                        return focused ? (
                            <ProfileEnable width={SIZE(28)} height={SIZE(28)} />
                        ) : (
                            <ProfileDisable
                                width={SIZE(28)}
                                height={SIZE(28)}
                            />
                        );
                    }
                },
                tabBarLabel: ({focused}) => {
                    let TabLabel;
                    if (route.name === 'ShopCustomer') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank} />
                        ) : (
                            <Text style={styles.labelText}>Home</Text>
                        );
                    } else if (route.name === 'ProfilePage') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Profile</Text>
                        );
                    } else if (route.name === 'Shops') {
                        TabLabel = focused ? (
                            <View style={styles.labelBlank}></View>
                        ) : (
                            <Text style={styles.labelText}>Shops</Text>
                        );
                    } else if (route.name === 'OrderCustomer') {
                        TabLabel = focused ? (
                            <View style={[styles.labelBlank]}></View>
                        ) : (
                            <Text style={styles.labelText}>Orders</Text>
                        );
                    } else if (route.name === 'EcommerceChat') {
                        TabLabel = focused ? (
                            <View style={[styles.labelBlank]}></View>
                        ) : (
                            <Text style={styles.labelText}>Chat</Text>
                        );
                    }
                    return TabLabel;
                },
            })}>
            <Tab.Screen name="ShopCustomer" component={ShopCustomer} />
            <Tab.Screen name="Shops" component={Shops} />
            <Tab.Screen name="OrderCustomer" component={OrderCustomer} />
            <Tab.Screen name="EcommerceChat" component={EcommerceChat} />
            <Tab.Screen name="ProfilePage" component={ProfilePage} />
        </Tab.Navigator>
    );
};

const MainHomeNavigatorCustomer = () => {
    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            initialRouteName="MainHome"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MainHome"
                component={MainHome}
            />
        </Stack.Navigator>
    );
};

const MainHomeNavigatorServiceProvider = () => {
    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            initialRouteName="MainHome"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MainHome"
                component={MainHome}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="PlaceToStay"
                component={PlaceToStay}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Bookings"
                component={Bookings}
            />
        </Stack.Navigator>
    );
};

const WalletStackCustomer = () => {
    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            initialRouteName="Wallet"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Wallet"
                component={Wallet}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="WalletCardSection"
                component={WalletCardSection}
            />
        </Stack.Navigator>
    );
};

const WalletStackProvider = () => {
    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            initialRouteName="Wallet"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Wallet"
                component={Wallet}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="WalletCardSection"
                component={WalletCardSection}
            />
        </Stack.Navigator>
    );
};

const BookingSectionStack = () => {
    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            initialParams={{isFromBottomTab: 'true'}}
            initialRouteName="Bookings"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Bookings"
                component={Bookings}
            />
        </Stack.Navigator>
    );
};

const MainStackReturn = ({route, notificationData}) => {
    const {state, dispatch} = useContext(Context);

    const markAsRead = async id => {
        try {
            const response = await usersConfigGeneral.post(
                `mark-as-read/`,
                {notification_id: id},
                {
                    headers: {
                        Authorization: `Bearer ${state.userData.accessToken}`,
                    },
                },
            );
        } catch (error) {
            console.log(error.message);
        }
    };
    const clearNotifications = async channel => {
        try {
            const displayedNotifications =
                await notifee.getDisplayedNotifications();
            const notificationsToCancel = displayedNotifications.filter(
                displayedNotification =>
                    displayedNotification.notification.data.channel === channel,
            );

            for (const notificationToCancel of notificationsToCancel) {
                await notifee.cancelNotification(notificationToCancel.id);
            }
        } catch (error) {
            console.log('Error canceling notifications:', error);
        }
    };

    const updateUserData = data => {
        dispatch({
            type: 'UPDATE_USER_DATA',
            userData: data,
        });
    };
    const forFade = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    const navigation = useNavigation();

    /////////////////////////deeplink hndling////////////////////////

    const handleDeepLink = event => {
        const {url} = event;
        if (url.includes('place-to-stay/')) {
            const segments = url.split('/');
            const pk = segments[segments.length - 2];
            navigation.navigate('PetSingle', {pk: pk});
        } else if (url.includes('borrow-pet/')) {
            const segments = url.split('/');
            const pk = segments[segments.length - 2];
            navigation.navigate('BorrowPetSingle', {pk: pk});
        } else if (url.includes('trainer/')) {
            const segments = url.split('/');
            const pk = segments[segments.length - 2];
            navigation.navigate('TrainerSinglePage', {pk: pk});
        } else if (url.includes('/product/')) {
            const segments = url.split('/');
            const pk = segments[segments.length - 2];
            navigation.navigate('ProductDetail', {id: pk});
        } else if (url.includes('/donated-product/')) {
            const segments = url.split('/');
            const pk = segments[segments.length - 2];
            navigation.navigate('DonatedProductDetail', {item: {id: pk}});
        } else if (url.includes('/shop/')) {
            const segments = url.split('/');
            const pk = segments[segments.length - 2];
            navigation.navigate('ShopDetail', {id: pk});
        }
    };

    useEffect(() => {
        const getAsyncURL = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                handleDeepLink({url: initialUrl});
            }
        };
        getAsyncURL();
    }, []);

    useEffect(() => {
        const subscription = Linking.addListener('url', handleDeepLink);
        return () => {
            subscription.remove();
        };
    }, []);

    /////////////////////////deeplink hndling////////////////////////

    /////////////////////////notification hndling////////////////////////

    const notification = notificationData?.notification?.data;
    useEffect(() => {
        const handleNotification = async () => {
            if (state.userData.is_login) {
                if (notification) {
                    if (notification?.section === '20') {
                        markAsRead(notification?.notification_id);
                        if (!state.userData.is_service) {
                            updateUserData({
                                ...state.userData,
                                is_service: true,
                            });
                        }
                        if (
                            notification?.notification_type ===
                            'place_to_stay_booking'
                        ) {
                            navigation.navigate('BookingItem', {
                                item_id: notification?.redirect_pk,
                            });
                        } else if (
                            notification?.notification_type === 'trainer'
                        ) {
                            navigation.navigate('TrainerProviderBooking', {
                                item: notification,
                                type: 'notification',
                            });
                        } else {
                            navigation.navigate('BorrowBookingSinge', {
                                item_id: notification?.redirect_pk,
                            });
                        }
                    } else if (notification?.section === '10') {
                        markAsRead(notification?.notification_id);
                        if (state.userData.is_service) {
                            updateUserData({
                                ...state.userData,
                                is_service: false,
                            });
                        }
                        if (
                            notification?.notification_type ===
                            'place_to_stay_booking'
                        ) {
                            navigation.navigate('CustomerBookingPlace', {
                                item: notification,
                                type: 'notification',
                            });
                        } else if (
                            notification?.notification_type === 'trainer'
                        ) {
                            navigation.navigate('TrainerBookingSingle', {
                                item: notification,
                                type: 'notification',
                            });
                        } else {
                            navigation.navigate('BookingSectionStack', {
                                screen: 'Bookings',
                                params: {
                                    selectedFilter: {
                                        id: 2,
                                        type: 'Borrow a Pet',
                                        page_type: 'borrow-pet',
                                    },
                                    item: notification,
                                    type: 'notification',
                                },
                            });
                        }
                    } else if (notification?.section === '40') {
                        markAsRead(notification?.notification_id);
                        if (!state.userData.is_service) {
                            updateUserData({
                                ...state.userData,
                                is_service: true,
                            });
                        }

                        if (
                            notification?.notification_type ===
                            'ecommerce_order'
                        ) {
                            navigation.navigate('OrderDetails', {
                                order: notification?.redirect_pk,
                            });
                        } else if (
                            notification?.notification_type === 'donated_order'
                        ) {
                            navigation.navigate('DonateSummary', {
                                donate: notification?.redirect_pk,
                            });
                        }
                    } else if (notification?.section === '30') {
                        markAsRead(notification?.notification_id);
                        if (state.userData.is_service) {
                            updateUserData({
                                ...state.userData,
                                is_service: false,
                            });
                        }

                        if (
                            notification?.notification_type ===
                            'ecommerce_order'
                        ) {
                            navigation.navigate('OrderDetailConfirmed', {
                                order_id: notification?.redirect_pk,
                                notification: true,
                            });
                        } else if (
                            notification?.notification_type === 'donated_order'
                        ) {
                            navigation.navigate('DonateCustomerSingle', {
                                order_id: notification?.redirect_pk,
                                notification: true,
                            });
                        }
                    } else if (
                        notification?.section === 'place_to_stay' ||
                        notification?.section === 'borrow_a_pet' ||
                        notification?.section === 'trainer'
                    ) {
                        navigation.navigate('ChatInner', {
                            item: {
                                otherUser: {
                                    id: notification?.sender,
                                    name: notification?.name,
                                },
                            },
                            userId: state?.userData?.firebaseUid,
                            chatType: notification?.section,
                            profile: notification?.profileImage,
                        });
                    } else if (notification?.section === 'donate') {
                        navigation.navigate('EcommerceChatInner', {
                            item: {
                                otherUser: {
                                    id: notification?.sender,
                                    name: notification?.name,
                                },
                            },
                            userId: state?.userData?.firebaseUid,
                            chatType: notification?.section,
                            profile: notification?.profileImage,
                        });
                    }
                    await clearNotifications(
                        notificationData.notification.android.groupId,
                    );
                }
            } else {
                return;
            }
        };

        handleNotification();
    }, [notificationData?.notification?.data]);

    /////////////////////////notification hndling////////////////////////
    return (
        <Stack.Navigator
            initialRouteName={'MainDrawer'}
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: forFade,
            }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MainDrawer"
                component={MainDrawer}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BottomSheet"
                component={BottomSheet}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="PetSingle"
                component={PetSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BorrowPetSingle"
                component={BorrowPetSingle}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BookingSummaryBorrowPet"
                component={BookingSummaryBorrowPet}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BookingSummaryTrainerCustomer"
                component={BookingSummaryTrainerCustomer}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BookingSummary"
                component={BookingSummary}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="PlaceToStaySingle"
                component={PlaceToStaySingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="TrainerBookingSingle"
                component={TrainerBookingSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ProfilePage"
                component={ProfilePage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DetailsPet"
                component={DetailsPet}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="PaymentSuccess"
                component={PaymentSuccess}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="PaymentFailed"
                component={PaymentFailed}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ModalList"
                component={ModalList}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="SearchPage"
                component={SearchPage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="CustomerSearchSection"
                component={CustomerSearchSection}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="NotificationsPage"
                component={NotificationPage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="SavedCards"
                component={SavedCards}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MainFilter"
                component={MainFilter}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MyReviews"
                component={MyReviews}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="FilterListPage"
                component={FilterListPage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MyPets"
                component={MyPets}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MyPlaces"
                component={MyPlaces}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Privacy Policy"
                component={PrivacyPolicy}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Terms & Condition"
                component={TermsAndCondition}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="AboutUs"
                component={AboutUs}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="CustomerReviews"
                component={CustomerReviews}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ChatInner"
                component={ChatInner}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="AddReview"
                component={AddReview}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="EditReview"
                component={EditReview}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="NewArrival"
                component={NewArrival}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Upcoming"
                component={Upcoming}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BookingItem"
                component={BookingItem}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ServiceProviderSinglePage"
                component={ServiceProviderSinglePage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MyPetsCustomer"
                component={MyPetsCustomer}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="MyPetsSingleCustomer"
                component={MyPetsSingleCustomer}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="CustomerAddresses"
                component={CustomerAddresses}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="CustomerBookingPlace"
                component={CustomerBookingPlace}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BorrowBookingSinge"
                component={BorrowBookingSinge}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ShopProvider"
                component={ShopProvider}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="EcommerceTab"
                component={EcommerceTab}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OfferProduct"
                component={OfferProduct}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ShopDetail"
                component={ShopDetail}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ProductDetail"
                component={ProductDetail}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ProductCustomer"
                component={ProductCustomer}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BillingAddress"
                component={BillingAddress}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OrderSummary"
                component={OrderSummary}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="CustomerPayment"
                component={CustomerPayment}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OrderDetailCustomer"
                component={OrderDetailCustomer}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OrderDetailConfirmed"
                component={OrderDetailConfirmed}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OrderStatus"
                component={OrderStatus}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="CartCustomer"
                component={CartCustomer}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="FilterPageEcom"
                component={FilterPageEcom}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OrderDetails"
                component={OrderDetails}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DonateSingle"
                component={DonateSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DonatedProductDetail"
                component={DonatedProductDetail}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DefaultVariant"
                component={DefaultVariant}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OfferSingle"
                component={OfferSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="OfferItem"
                component={OfferItem}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="AddBankAccount"
                component={AddBankAccount}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DonateSummary"
                component={DonateSummary}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ProductSingle"
                component={ProductSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="EcoShippingAddress"
                component={EcoShippingAddress}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ReviwsProviderPage"
                component={ReviwsProviderPage}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="EcommerceChatInner"
                component={EcommerceChatInner}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="WishlistCustomer"
                component={WishlistCustomer}
            />

            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="DonateCustomerSingle"
                component={DonateCustomerSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="NoInternet"
                component={NoInternet}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="TrainerSingle"
                component={TrainerSingle}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="TrainerSinglePage"
                component={TrainerSinglePage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="TrainerProviderBooking"
                component={TrainerProviderBooking}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ServiceListPage"
                component={ServiceListPage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ServiceSinglePage"
                component={ServiceSinglePage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="LostAndFoundListPage"
                component={LostAndFoundListPage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="LostAndFoundSinglePage"
                component={LostAndFoundSinglePage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="HistoryPage"
                component={HistoryPage}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="FaqSection"
                component={FaqSection}
            />
        </Stack.Navigator>
    );
};

const MainDrawer = () => {
    const {state, dispatch} = useContext(Context);
    const getDrawerScreenOptions = ({route}) => {
        return {
            headerShown: false,
        };
    };

    return (
        <Drawer.Navigator
            initialRouteName="MainTabNavigation"
            drawerHideStatusBarOnOpen={true}
            screenOptions={{
                drawerType: 'front',
                drawerStyle: {backgroundColor: 'transparent', width: SIZE(270)},
            }}
            options={{
                headerShown: true,
            }}
            drawerContent={props => (
                <DrawerContent
                    drawerStyle={{
                        flex: 1,
                        backgroundColor: 'red',
                    }}
                    style={{backgroundColor: 'red'}}
                    {...props}
                />
            )}>
            <Drawer.Screen
                options={getDrawerScreenOptions}
                name="MainTabNavigation"
                component={MainTabNavigation}
            />
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
                name="PaymentSuccess"
                component={PaymentSuccess}
            />
            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
                name="MainStackReturn"
                component={MainStackReturn}
            />
        </Drawer.Navigator>
    );
};

export default MainStackReturn;

const styles = StyleSheet.create({
    labelBlank: {
        height: SIZE(5),
        width: SIZE(5),
        backgroundColor: '#fff',
        borderRadius: SIZE(2.5),
        marginBottom: SIZE(22),
    },
    labelText: {
        fontSize: SIZE(12),
        color: '#fff',
        marginBottom: SIZE(13),
        ...Platform.select({
            android: {
                fontFamily: FONTS.medium,
            },
            ios: {
                fontFamily: FONTS.regular,
                fontWeight: '600',
            },
        }),
    },
});
