import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';

class ShowData extends Component {
    constructor() {
        super();

        this.state = {
            Name: '',
        }
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    render() {
        return (
            <View>
                <Text> ผู้ป่วยที่ต้องการความช่วยเหลือ </Text>
                <Input
                    placeholder="กรุณาใส่ชื่อของคุณ "
                    leftIcon={{ type: 'font-awesome', name: 'book' }}
                    style={styles}
                    value={this.state.Name}
                    onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
                />

                <TouchableOpacity style={styles.loginButton} onPress={() => {
                    this.props.navigation.navigate('PatientStatusIn', { text: this.state.Name });
                }
                }>
                    <Text style={styles.loginButtonText}>
                        ค้นหาเคสของฉัน
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
    input: {
        marginVertical: 10,
        marginBottom: 15,
    },
    loginButton: {
        marginVertical: 32,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 100

    },
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#DFF17C',
        width: 320,
        height: 60,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 15
    }
});


export default ShowData;