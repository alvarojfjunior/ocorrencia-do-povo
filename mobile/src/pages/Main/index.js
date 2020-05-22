import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import Moment from 'moment';

import { firebaseFirestore } from '../../../config/firebase';

import AddButton from '../../components/AddButton';
import ComponentSpinner from '../../components/Loading';
import Loading from '../../components/Loading';

export default function Main() {
    const navigation = useNavigation();
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
        alert('Liked');
    }

    if (!isReady) {
        return <Loading />;
    }

    return (
        <Container>
            <Content style={styles.container}>
                {occurrences.map(occurrence => (
                    <Card key={occurrence.id} style={{ flex: 0 }}>
                        <CardItem onTouchEnd={() => alert('Vai abrir o cadastro do cara')}>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.thispersondoesnotexist.com/image' }} />
                                <Body>
                                    <Text>{occurrence.userName}</Text>
                                    <Text note>{Moment(occurrence.date).format('DD/MM/YYYY HH:MM')}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem onTouchEnd={() => navigation.navigate('Occurrence')}>
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
                                    <Icon name="heart" />
                                    <Text>{occurrence.countLikes} Likes</Text>
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                ))}
            </Content>
            <AddButton />
        </Container >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});