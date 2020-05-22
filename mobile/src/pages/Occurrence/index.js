import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Button, Icon, Text } from 'native-base';
import Moment from 'moment';

import Loading from '../../components/Loading';
import { firebaseFirestore } from '../../../config/firebase';

export default function Occurrence() {
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) {
        return <Loading />
    }

    return (
        <Container>
            <Content>
                <Button style={styles.buttonBack} transparent onPress={() => navigation.goBack()}>
                    <Icon style={styles.headerIcons} name='arrow-back' />
                </Button>
                <Text> Occurrence Title and more here ... </Text>
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
    }
});