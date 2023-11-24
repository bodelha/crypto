import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    paragraph: {
        textAlign: 'center',
        marginBottom: 16,
    },
    cryptoCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cryptoDiv: {
        flexDirection: 'row',
        width: '30%',
    },
    cryptoName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        width: '50%',
        left: 25,
    },
    cryptoSymbol: {
        fontSize: 18,
        marginLeft: 8,
    },
    cryptoIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginLeft: 8,
    },
    polygonLogo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: 'auto',
    },
    DropDownPicker: {
        width: '30%',
        maxHeight: 300,
    },

    DropDownPickerOpen: {
        zIndex: 1000,
    },
});

export default styles;
