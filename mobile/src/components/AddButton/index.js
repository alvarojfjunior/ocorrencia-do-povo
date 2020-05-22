import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Icon, Button } from 'native-base';



export default function AddButton() {
    const navigation = useNavigation();
    return (
        <Container style={styles.addContainer} >
            <Button style={styles.addButton}  onPress={() => { navigation.navigate('PostOccurrence') }} >
                <Icon style={styles.addIcon} name="add" />
            </Button>
        </Container >
    );
}


const styles = StyleSheet.create({
    addContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
        height: 90,
        width: 90,
    },
    addButton: {
        height: 70,
        width: 70,
        borderRadius: 50,
        backgroundColor: '#642484'        
    },
    addIcon: {
        height: 60,
        width: 60,
        left: -10,
        textAlign: 'center',
        fontSize: 60
    }
});