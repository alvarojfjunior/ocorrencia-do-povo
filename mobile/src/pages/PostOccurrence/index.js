import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Spinner, Container, Header, Content, Form, Item, Input, Button, Icon, Text } from 'native-base';

import { firebaseFirestore } from '../../../config/firebase';

export default function PostOccurrence() {
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return <Spinner color='blue' />
    }

    return (
        <Container style={styles.container}>
            <Header>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name='arrow-back' />
                </Button>
            </Header>
            <Content>
                <Form>
                    <Item>
                        <Input placeholder="Username" />
                    </Item>
                    <Item last>
                        <Input placeholder="Password" />
                    </Item>
                </Form>
            </Content>
        </Container >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonBack: {

    }
});