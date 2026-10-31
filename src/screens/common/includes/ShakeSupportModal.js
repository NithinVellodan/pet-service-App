import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';

//packages
import DocumentPicker from 'react-native-document-picker';

//constants
import {SIZE} from '../../../theme/theme';
import {FONTS} from '../../../theme/fonts';
import {Context} from '../../../contexts/Store';

//images and logos
import CloseIcon from '../../../assets/icons/close-icon-blue.svg';
import UploadICon from '../../../assets/icons/upload-customer.svg';
import CloseRound from '../../../assets/icons/close-circle.svg';

const ShakeSupportModal = ({setShakeSupportModal}) => {
    const {state, dispatch} = useContext(Context);
    const [inputText, setInputText] = useState('');
    const [attachments, setAttachments] = useState();

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                allowMultiSelection: true,
                type: [DocumentPicker.types.allFiles],
            });
            if (response.length > 2) {
                alert('You can only select up to 2 files.');
                return;
            }

            setAttachments(response);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }, []);

    const updateUserData = () => {
        dispatch({
            type: 'UPDATE_MODAL_SECTION',
            commonModal: {
                ...state.commonModal,
                shakeSupportModal: true,
            },
        });
    };

    handleRemoveDocument = index => {
        const filtered = attachments.filter((_, i) => i !== index);
        setAttachments(filtered);
    };
    const renderDocuments = (item, index) => {
        return (
            <View key={index} style={styles.uploadedDocument}>
                <Text numberOfLines={1} style={styles.textDoc}>
                    {item.name}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        handleRemoveDocument(index);
                    }}>
                    <CloseRound width={SIZE(20)} height={SIZE(20)} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonIcon}
                onPress={() => {
                    setShakeSupportModal(false);
                }}>
                <CloseIcon width={'100%'} height={'100%'} />
            </TouchableOpacity>
            <View style={{marginBottom: SIZE(15)}}>
                <Text style={styles.textHed}>Report a Problem</Text>
            </View>
            <View style={styles.inputContaner}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    placeholder="Description"
                    placeholderTextColor="#8E8E8E"
                    onChangeText={text => setInputText(text)}
                    value={inputText}
                />
            </View>
            {attachments &&
                attachments.map((item, index) => renderDocuments(item, index))}
            <TouchableOpacity
                onPress={async () => {
                    await handleDocumentSelection();
                }}
                activeOpacity={0.8}
                style={styles.imageMainContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.uploadContainer}>
                        <UploadICon width={'100%'} height={'100%'} />
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <View>
                            <Text style={styles.uploadText}>
                                Upload Attachments
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.uploadTextTwo}> +Upload</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.postButton}
                activeOpacity={0.8}
                onPress={async () => {
                    await handleDocumentSelection();
                }}>
                <Text allowFontScaling={false} style={styles.postButtonText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShakeSupportModal;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        width: '95%',
        borderRadius: SIZE(12),
        padding: SIZE(30),
        alignItems: 'center',
    },
    textHed: {
        textAlign: 'center',
        color: '#242424',
        textAlign: 'center',
        fontFamily: FONTS.semiBold,
        fontSize: SIZE(20),
        fontWeight: '600',
    },
    inputContaner: {
        backgroundColor: '#F7F7F7',
        borderWidth: SIZE(1),
        borderColor: '#D3D3D3',
        paddingVertical: SIZE(12),
        paddingHorizontal: SIZE(16),
        borderRadius: SIZE(8),
        height: SIZE(90),
        marginTop: SIZE(12),
        width: '100%',
    },
    input: {
        padding: 0,
        color: '#242424',
        fontSize: SIZE(14),
        fontWeight: '400',
        lineHeight: SIZE(17),
        fontFamily: FONTS.regular,
        height: '100%',
        textAlignVertical: 'top',
    },
    postButton: {
        marginTop: SIZE(24),
        backgroundColor: '#009FD3',
        borderRadius: SIZE(8),
        alignItems: 'center',
        width: '100%',
        height: SIZE(42),
        justifyContent: 'center',
    },
    postButtonText: {
        color: '#FFFFFF',
        fontSize: SIZE(16),
        fontFamily: FONTS.bold,
        fontWeight: '600',
        lineHeight: SIZE(22),
        letterSpacing: SIZE(0.5),
    },
    buttonIcon: {
        width: SIZE(15),
        height: SIZE(15),
        marginTop: SIZE(20),
        marginRight: SIZE(20),
        position: 'absolute',
        right: 0,
        top: 0,
    },
    uploadedDocument: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SIZE(10),
        borderStyle: 'dashed',
        padding: SIZE(10),
        borderWidth: SIZE(1),
        borderRadius: SIZE(8),
        borderColor: '#003459',
        width: '100%',
    },
    textDoc: {
        fontSize: SIZE(14),
        fontFamily: FONTS.regular,
        color: '#686868',
        width: '80%',
    },
    imageMainContainer: {
        marginTop: SIZE(10),
        width: '100%',
    },
    imageContainer: {
        backgroundColor: '#EAF7FF',
        borderWidth: SIZE(1),
        borderRadius: SIZE(12),
        paddingHorizontal: SIZE(16),
        paddingVertical: SIZE(32),
        borderStyle: 'dashed',
        alignItems: 'center',
        borderColor: '#009FD3',
    },

    uploadContainer: {
        width: SIZE(24),
        height: SIZE(24),
        fontFamily: FONTS.bold,
    },
    uploadText: {
        fontSize: SIZE(13),
        fontWeight: '400',
        fontFamily: FONTS.regular,
        color: '#009FD3',
    },
    uploadTextTwo: {
        fontWeight: '700',
        fontFamily: FONTS.bold,
        fontSize: SIZE(12),
        color: '#009FD3',
    },
});
