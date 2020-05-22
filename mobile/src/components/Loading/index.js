import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Spinner, Text } from 'native-base';

export default function Loading() {
    return (
        <Container style={styles.container}>
            <Content style={styles.content} >
                <Text style={styles.text}>Ocorrência do Povo</Text>
                <Text style={styles.text}>Carredando ...</Text>
            </Content>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#642484'
    },
    content: {
        alignSelf: 'center',
        top: '40%'
    },
    text: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 25
    }
});