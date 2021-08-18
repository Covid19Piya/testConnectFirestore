import * as React from 'react';
import { useContext, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class PostDonate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            Topic: '',
            Detail: '',
            Address: '',
            PhoneNumber: '',
            other: ''
        };
        this.onPressButton = this.onPressButton.bind(this);
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    };

    storeUser() {
        this.usersCollectionRef
            .add({
                Name: this.state.Name,
                Topic: this.state.Topic,
                Detail: this.state.Detail,
                Address: this.state.Address,
                PhoneNumber: this.state.PhoneNumber,
                Other: this.state.Other
            })
            .then((res) => {
                this.setState({
                    Name: '',
                    Topic: '',
                    Detail: '',
                    Address: '',
                    PhoneNumber: '',
                    Other: '',
                });
            })
            .catch((err) => {
                console.log('Error found: ', err);
                this.setState({
                    isLoading: false,
                });
            });
    }


    render() {

        this.usersCollectionRef = firestore().collection('PostDonate');

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Input
                        placeholder="Name"
                        leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                        style={styles}
                        value={this.state.Topic}
                        onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
                    />

                    <Input
                        placeholder="Topic"
                        leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                        style={styles}
                        value={this.state.Topic}
                        onChangeText={(val) => this.inputValueUpdate(val, 'Topic')}
                    />
                    <Input
                        placeholder="Detail"
                        leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                        style={styles}
                        value={this.state.Detail}
                        onChangeText={(val) => this.inputValueUpdate(val, 'Detail')}
                    />
                    <Input
                        placeholder="Address"
                        leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                        style={styles}
                        value={this.state.Address}
                        onChangeText={(val) => this.inputValueUpdate(val, 'Address')}
                    />
                    <Input
                        placeholder="PhoneNumber"
                        leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                        style={styles}
                        value={this.state.PhoneNumber}
                        onChangeText={(val) => this.inputValueUpdate(val, 'PhoneNumber')}
                    />

                    <Input
                        placeholder="Other"
                        leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                        style={styles}
                        value={this.state.Other}
                        onChangeText={(val) => this.inputValueUpdate(val, 'Other')}
                    />


                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        this.props.navigation.navigate('Menu Volunteer');
                        this.storeUser()
                    }}>
                        <Text style={styles.loginButtonText}>
                            เสร็จ
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    onPressButton() {
        const { navigate } = this.props.navigation;
        navigate('Menu Volunteer');
    }
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginVertical: 10,
        marginBottom: 15,
    },
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#00CABA',
        width: 320,
        height: 60,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#F0FFFF',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 15,
    },

    container: {
        flex: 1,
        backgroundColor: '#E2FCFA',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 127.5,
    },
});
export default PostDonate;
