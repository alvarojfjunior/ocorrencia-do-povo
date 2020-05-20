import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base'
import { AppLoading } from 'expo';
import Moment from 'moment';

import { firebaseFirestore } from '../../config/firebase';

export default function Main() {
    const [occurrences, setOccurrences] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        loadOccurrences();
    }, []);

    const loadOccurrences = async () => {
        const querySnapshot = await firebaseFirestore.collection("occorrence").orderBy("date", "desc").get()
        var tempOccurrences = [];
        querySnapshot.forEach(function (docs) {
            tempOccurrences = [...tempOccurrences, { ...docs.data(), id: docs.id }];
        });
        setOccurrences(tempOccurrences);
        setIsReady(true);
    }

    const handleLike = () => {
        alert('Opa!');
    }

    if (!isReady) {
        return <AppLoading />;
    }
    return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <Left>
                    <Text>Ocorrência do Povo</Text>
                </Left>
            </Header>
            <Content>
                {occurrences.map(occurrence => (
                    <Card key={occurrence.id} style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.thispersondoesnotexist.com/image' }} />
                                <Body>
                                    <Text>{occurrence.userName}</Text>
                                    <Text note>{Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image source={{ uri: occurrence.image1 }} style={{ height: 200, width: '100%', flex: 1 }} />
                                <Text>
                                    {occurrence.title}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button onPress={() => handleLike()} transparent textStyle={{ color: '#87838B' }}>
                                    <Icon name="logo-github" />
                                    <Text>{occurrence.countLikes} Likes</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                ))}
            </Content>
        </Container >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
    }
});