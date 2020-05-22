import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Form, Item, Input, Button, Icon, Text } from 'native-base';

import Loading from '../../components/Loading';
import { firebaseFirestore } from '../../../config/firebase';

export default function PostOccurrence() {
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return <Loading color='blue' />
    }

    return (
        <Container style={styles.container}>
            <Content>
                <Button style={styles.buttonBack} transparent onPress={() => navigation.goBack()}>
                    <Icon style={styles.headerIcons} name='arrow-back' />
                </Button>
                <Text style={styles.title}> Conte ao povo o que acontece na sua região! </Text>
                <Form>
                    <Item>
                        <Input placeholder="Username" />
                    </Item>
                    <Item last>
                        <Input placeholder="Password" />
                    </Item>
                </Form>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonBack: {
        alignSelf: "flex-start",
    },
    headerIcons: {
        color: '#642484'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#642484',
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center'
    },
});