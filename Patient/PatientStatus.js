import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, Picker, TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';

class ShowData extends Component {
    constructor() {
        super();

        this.state = {
            userArr: []
        }
    }

    state = { user: 'No' }
    updateUser = (user) => {
        this.setState({ user: user })
    }

    componentDidMount() {
        this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { Name, Help, Email, Confirm, Age, PhoneNumber, Address, Request, Status } = res.data();
            userArr.push({
                key: res.id,
                res,
                Name,
                Help,
                Email,
                Confirm,
                Age,
                Address,
                PhoneNumber,
                Request,
                Status
            })
        })
        this.setState({
            userArr
        })
    }

    updateData(name, status, user) {
        firestore().collection("Volunteer").doc(user).collection("Case")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log("In fn" + name, status, user);
                    if (doc.data().Name == name) {
                        doc.ref.update({
                            Confirm: status
                        });
                    }
                });
            });

        firestore().collection('Patient').doc(name).collection("Case")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log("In fn" + name, status);
                    if (doc.data().Name == name) {
                        doc.ref.update({
                            Status: status,
                            Confirm: status

                        });
                    }
                });
            });
    }

    render() {
        const { user } = this.props.route.params;
        console.log({ user }.user.phoneNumber)

        this.fireStoreData = firestore().collection("Patient").doc({ user }.user.phoneNumber).collection("Case");
        return (
            <View>
                <Text> ?????????????????????????????????????????????????????????????????????????????????????????? </Text>
                {
                    this.state.userArr.map((item, i) => {
                       
                            return (

                                <ListItem
                                    key={i}
                                    bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>???????????? : {item.Name}</ListItem.Title>
                                        <ListItem.Title>???????????? : {item.Age}</ListItem.Title>
                                        <ListItem.Title>????????????????????? : {item.Address}</ListItem.Title>
                                        <ListItem.Title>????????????????????????????????? : {item.PhoneNumber}</ListItem.Title>
                                        <ListItem.Title>????????????????????????????????????????????????????????????????????? : {item.Help}</ListItem.Title>
                                        <ListItem.Title>??????????????????????????????????????????????????????????????????????????? : {item.Request}</ListItem.Title>
                                        <ListItem.Title>???????????????????????? : {item.Status}</ListItem.Title>

                                        <TouchableOpacity style={styles.loginButton} onPress={() => {
                                            this.updateData(item.Name, this.state.user, item.Request)

                                        }}>
                                            <Text style={styles.loginButtonText}>
                                                ?????????????????????????????????
                                            </Text>
                                        </TouchableOpacity>
                                    </ListItem.Content>
                                </ListItem>
                            );
                    })
                }
                <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                    <Picker.Item label="??????????????????????????????" value="No" />
                    <Picker.Item label="?????????????????????" value="Yes" />
                </Picker>
            </View>
        )
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