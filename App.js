/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';

import {StyleSheet, useColorScheme} from 'react-native';

// packages
import {ToastProvider} from 'react-native-toast-notifications';
import BootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import {StripeProvider} from '@stripe/stripe-react-native';

// pages
import Navigation from './src/navigation/Navigation';
import Store from './src/contexts/Store';

//constants
import {SIZE} from './src/theme/theme';
import {FONTS} from './src/theme/fonts';
import CustomToast from './src/components/toast/CustomToast';
import {ChatProvider} from './src/contexts/ChatContext';

const App = () => {
    const isDarkMode = useColorScheme() === 'day';
    const [isConnected, setIsConnected] = useState(true);
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    //fot splash screen
    useEffect(() => {
        BootSplash.hide();
    }, []);

    return (
        <Store>
            <ToastProvider
                renderToast={toastOptions => {
                    return <CustomToast toastOptions={toastOptions} />;
                }}
                successColor="#009FD3"
                warningColor="orange"
                duration={2000}
                offsetBottom={SIZE(100)}>
                <ChatProvider>
                    <StripeProvider
                        publishableKey="pk_test_51PY2ZhRsF1vbTFPZ24yUXey082npZQBc8bYJCzCerStma3GBcsk542vh59U03apJaopS8xc0fYf7bvxS8DlcELD00067ToE18T"
                        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
                        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
                    >
                        <Navigation isConnected={isConnected} />
                    </StripeProvider>
                </ChatProvider>
            </ToastProvider>
        </Store>
    );
};

const styles = StyleSheet.create({});

export default App;
