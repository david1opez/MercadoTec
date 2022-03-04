import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import * as Network from 'expo-network';
import { vs, s } from 'react-native-size-matters';

import { colors, templates } from '../StyleVariables';

// COMPONENTS
import Icon from '../assets/icons';

// TYPES
type NoConnectionComponentProps = {
    onConnectionStatusChange: (status: boolean) => void
}


const NoConnectionComponent = ({onConnectionStatusChange}: NoConnectionComponentProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setInterval(() => {
          Network.getNetworkStateAsync().then(async (state) => {
            if(state.isConnected) {
                onConnectionStatusChange(true);
            } else {
                onConnectionStatusChange(false);
            }
          });
        }, 1000);
    }, [])

    return (
        <View style={styles.noWificontainer}>

            <View style={templates.logoContainer}>

            <Icon name="logo" width={vs(24)} height={vs(24)} color={colors.primary}/>
            
            <View style={templates.logoTextContainer}>
                <Text style={templates.upperLogoText}>Mercado</Text>
                <Text style={templates.bottomLogoText}>Tec</Text>
            </View>

            </View>

            <Text style={styles.title}>No hay conexión a internet :(</Text>

            <TouchableOpacity
                onPress={async () => {
                    setIsLoading(true);
                    const connection: any = await Network.getNetworkStateAsync().then(() => setIsLoading(false));
                    onConnectionStatusChange(connection.isConnected);
                }}
                style={styles.retryButton}
            >
            {
                isLoading ? (
                <ActivityIndicator size="small" color={"#FFF"} />
                ) : (
                <Text style={styles.retryButtonText}>Reintentar</Text>
                )
            }
            </TouchableOpacity>
        </View>
    )
}

export default NoConnectionComponent

const styles = StyleSheet.create({
    noWificontainer: {
        backgroundColor: "#FFF",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: "GorditaRegular",
        fontSize: s(14),
        marginBottom: vs(20),
        color: 'rgba(0,0,0,0.5)',
    },
    retryButton: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: s(20),
        paddingVertical: vs(3),
        borderRadius: 3,
    },
    retryButtonText: {
        color: '#FFF',
        fontFamily: "GorditaMedium",
        fontSize: s(12),
    },
})