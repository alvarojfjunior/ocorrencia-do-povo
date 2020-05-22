import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input } from 'native-base';
import { AppLoading } from 'expo';
import Moment from 'moment';

import { firebaseFirestore } from '../../../config/firebase';

export default function Occurrence() {
    const [isReady, setIsReady] = useState(true);

    useEffect(() => {
    }, []);
    
    return (
        <Container>
            <Header />
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
        </Container>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});