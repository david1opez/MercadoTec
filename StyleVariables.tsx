import {s, vs} from 'react-native-size-matters';
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#C92744',
    yellow: "#F2A102"
};

export const templates = StyleSheet.create({
    logoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: vs(35),
        left: s(15),
    },
    logoTextContainer: {
        marginLeft: s(7),
    },
    upperLogoText: {
        fontFamily: "GorditaBold",
        fontSize: vs(10),
        marginBottom: vs(-4),
    },
    bottomLogoText: {
        fontFamily: "GorditaBold",
        fontSize: vs(10),
    },
    returnIcon: {
        width: vs(26),
        height: vs(26),
        position: 'absolute',
        top: vs(35),
        right: s(15),
        zIndex: 1,
    },
    inputLabel: {
        fontSize: vs(9),
        fontFamily: "GorditaMedium",
        color: "#FFF",
    },
});
