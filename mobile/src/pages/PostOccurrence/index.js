import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Form, Item, Input, Button, Icon, Text, Label, Textarea } from 'native-base';

import Loading from '../../components/Loading';
import { firebaseFirestore } from '../../config/firebase';
import { FontDisplay } from 'expo-font';

export default function PostOccurrence() {
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false);
    const [description, setDescription] = useState('')

    useEffect(() => {
        setIsReady(true);
    }, []);


    if (!isReady) {
        return <Loading color='blue' />
    }

    return (
        <Container style={styles.container}>
            <Content padder>
                <Button style={styles.buttonBack} transparent onPress={() => navigation.goBack()}>
                    <Icon style={styles.headerIcons} name='arrow-back' />
                </Button>
                <Text style={styles.title}> Conte ao povo o que acontece na sua região! </Text>
                <Form>
                    <Item>
                        <Content style={styles.imgContent}>
                            <Text>Imagens aqui</Text>
                        </Content>
                    </Item>
                    <Item>
                        <Input placeholder="Título" style={styles.inputText} />
                    </Item>
                    <Item>
                        <Textarea
                            placeholder="Descrição"
                            rowSpan={5}
                            style={styles.textarea}
                            value={description}
                            onChangeText={setDescription}
                            style={styles.inputText}
                        />
                    </Item>
                </Form>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inputText: {
        fontSize: 15,
        padding: 10,
        paddingLeft: 10
    },
    imgContent: {
        height: 150,
        backgroundColor: 'orange'
    }
});