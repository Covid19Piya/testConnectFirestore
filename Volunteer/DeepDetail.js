import * as React from 'react';
import { Component } from 'react'
import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Picker } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class ShowData extends Component {
    constructor() {
        super();
        this.state = {
            userArr: []
        }

    }

    state = { user: '' }
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
            const { FirstName, LastName, Age, Help, Address, PhoneNumber, Status } = res.data();
            userArr.push({
                key: res.id,
                res,
                FirstName,
                LastName,
                Age,
                Help,
                Address,
                PhoneNumber,
                Status
            })
        })
        this.setState({
            userArr
        })
    }

    updateData(name, status, user) {
        this.fireStoreData1 = firestore().collection("Users").doc({ user }.user.email).collection("YourCase")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log("In fn" + name, status);
                    if (doc.data().FirstName == name) {
                        doc.ref.update({
                            Status: status
                        });
                    }
                });
            });
    }

    render() {

        const { patientName, user } = this.props.route.params
        console.log(patientName)
        this.fireStoreData = firestore().collection("Users").doc({ user }.user.email).collection("YourCase");

        return (
            <ScrollView>
                <View>
                    <Text> เคสของคุณ </Text>                                 
                    {
                        this.state.userArr.map((item, i) => {
                            if (patientName == item.FirstName)
                            
                                return (
                                    
                                    <ListItem
                                        key={i}
                                        bottomDivider>
                                            
                                        <ListItem.Content>
                                        
                                        <TouchableOpacity style={styles.loginButton} onPress={() => {
                                                this.updateData(item.FirstName, this.state.user, user)

                                            }}>
                                                <Text style={styles.loginButtonText}>
                                                    อัพเดทสถานะ
                                                </Text>
                                            </TouchableOpacity>
                                         
                                            <ListItem.Title>ชื่อ : {item.FirstName} นามสกุล : {item.LastName} </ListItem.Title>
                                            <ListItem.Title>อายุ : {item.Age}</ListItem.Title>
                                            <ListItem.Title>ที่อยู่ : {item.Address}</ListItem.Title>
                                            <ListItem.Title>หมายเลขโทรศัพท์ : {item.PhoneNumber}</ListItem.Title>
                                            <ListItem.Title>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                                            <ListItem.Title>สถานะ : {item.Status}</ListItem.Title>

                                  
                                            <TouchableOpacity style={styles.loginButton} onPress={() => {
                                                this.props.navigation.navigate('DeepDetail', { text: { text }.text, user: user });
                                            }}>
                                                <Text style={styles.loginButtonText}>
                                                    พูดคุย
                                                </Text>
                                            </TouchableOpacity>
                                            
                                        </ListItem.Content>
                                        
                                    </ListItem>
                                    
                                );
                                
                        })
                        
                    }
                    <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                        <Picker.Item label="รอ" value="Waiting" />
                        <Picker.Item label="อยู่ระหว่างดำเนินการ" value="On Process" />
                        <Picker.Item label="เสร็จสิ้น" value="Finish" />
                    </Picker>
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        this.props.navigation.navigate('Menu Volunteer');
                    }}>
                        <Text style={styles.loginButtonText}>
                            กลับสู่เมนู
                        </Text>
                    </TouchableOpacity>




                </View>
            </ScrollView>

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
        marginVertical: 20,
        backgroundColor: '#DFF17C',
        width: 150,
        height: 50,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,

    },

    loginButtonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 15
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


export default ShowData;