import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right, Textarea, Form } from 'native-base';
import Moment from 'moment';

import Loading from '../../components/Loading';

import { firebaseFirestore } from '../../config/firebase';

export default function Occurrence() {
    const navigation = useNavigation();
    const route = useRoute();

    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [occurrence, setOccurrence] = useState({});
    const [comments, setComments] = useState([]);
    const [atualComment, setAtualComment] = useState('');
    const [countLikes, setCountLikes] = useState(0);

    useEffect(() => {
        setOccurrence(route.params.occurrence);
        setCountLikes(route.params.occurrence.countLikes);
        loadComments(route.params.occurrence.id);
        setIsReady(true);
    }, []);


    const loadComments = async (id) => {
        const querySnapshot = await firebaseFirestore.collection("comments").where("occurrence", "==", id).orderBy("date", "desc").get();
        var tempComments = [];
        querySnapshot.forEach(function (docs) {
            tempComments = [...tempComments, { ...docs.data(), id: docs.id }];
        });
        setComments(tempComments);
    }


    const handleMakeComment = async () => {
        if (!atualComment) return;
        setLoading(true);
        setAtualComment('');
        const resultFirestoreAdd = await firebaseFirestore.collection('comments').add({
            occurrence: occurrence.id,
            userName: 'Anônimo',
            comment: atualComment,
            date: Date.now(),
        });
        setComments([(await resultFirestoreAdd.get()).data(), ...comments]);
        setLoading(false);
    }


    const handleLike = async () => {
        setCountLikes(countLikes + 1);
        await firebaseFirestore.collection('occorrence').doc(occurrence.id).update({
            'countLikes': countLikes + 1,
        });
        
    }



    if (!isReady) {
        return <Loading />
    }

    return (
        <Container>
            <Content>
                <Button style={styles.buttonBack} transparent onPress={() => navigation.goBack()}>
                    <Icon style={styles.headerIcons} name='arrow-back' />
                </Button>
                <Card>
                    <CardItem>
                        <Left>
                            <Body>
                                <Text>{occurrence.title}</Text>
                                <Text note>{occurrence.userName}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={{ uri: occurrence.image1 }} style={{ height: 200, width: '100%', flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Text style={styles.title}> {occurrence.description} </Text>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent onPress={handleLike}>
                                <Icon active name="thumbs-up" />
                                <Text>{countLikes}</Text>
                            </Button>
                            <Right>
                                <Text note>{Moment(occurrence.date).format('DD/MM HH:MM')}</Text>
                            </Right>
                        </Left>
                    </CardItem>
                </Card>

                <Card>
                    <CardItem>
                        <Content padder>
                            <Form>
                                <Textarea
                                    rowSpan={3}
                                    bordered
                                    placeholder="Comentário"
                                    style={styles.textarea}
                                    value={atualComment}
                                    onChangeText={setAtualComment}
                                />
                            </Form>
                        </Content>
                    </CardItem>

                    <CardItem >
                        <Body></Body>
                        <Right>
                            <Button
                                success 
                                rounded 
                                transparent 
                                bordered 
                                style={styles.btnComment} 
                                onPress={handleMakeComment}>
                                {loading? <Text> ... </Text> : <Text>Comentar</Text>}
                            </Button>
                        </Right>
                    </CardItem>
                </Card>

                {comments.map(comment => (
                    <Card key={comment.id}>
                        <CardItem header bordered>
                            <Text>{comment.userName}</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>{comment.comment}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                ))}
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
        textAlign: 'justify',
    },
    textarea: {
        borderRadius: 5,
        padding:  10,
    },
    btnComment:{
        marginTop: -25,
        marginRight: 8,
        padding: 0
    }
});