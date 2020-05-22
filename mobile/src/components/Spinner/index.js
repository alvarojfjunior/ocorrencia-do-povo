import React from 'react';
import { StyleSheet } from 'react-native';
import { Container } from 'native-base';

export default function Spinner() {
    return (
        <Container style={styles.container} >
            <Spinner color='blue' style={styles.spinner} />
        </Container >
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
    },
    spinner: {
        fontSize: 100
    }
});