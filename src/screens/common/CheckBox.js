import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import CheckBoxIcon from '../../assets/icons/Checkbox.svg';

// theme
import {SIZE} from '../../theme/theme';

const CheckBox = ({state, setState, checkId, checkBoxId, setCheckBoxId}) => {
    const [isChecked, setChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState({terms: ''});

    const handleCheckboxToggle = () => {
        setChecked(!isChecked);
        setState(prev => !prev);
        if (!isChecked) {
            setErrorMessage({...errorMessage, terms: ''});
        } else {
            setErrorMessage(errorMessage);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.checkboxContainer,
                isChecked ? styles.checked : styles.unchecked,
            ]}
            onPress={() => {
                handleCheckboxToggle();
                if (checkId) {
                    setCheckBoxId(checkId);
                } else {
                }
            }}>
            {isChecked ? (
                <CheckBoxIcon width={SIZE(20)} height={SIZE(20)} fill="#fff" />
            ) : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        width: SIZE(20),
        height: SIZE(20),
        borderWidth: SIZE(1),
        borderColor: '#969696',
        marginRight: SIZE(6),
        borderRadius: SIZE(6),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

    unchecked: {
        backgroundColor: '#F7F7F7',
    },

    checked: {
        backgroundColor: '#E2E2E2',
    },
});

export default CheckBox;
