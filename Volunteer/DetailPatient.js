import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class ShowData extends Component {
  constructor() {
    super();
    this.state = {
      userArr: [],
      FirstName: '',
      LastName: '',
      Age: '',
      Help: '',
      Address: '',
      PhoneNumber: ''
    }

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
      const { FirstName, Help, Address, Age, LastName, PhoneNumber } = res.data();
      userArr.push({
        key: res.id,
        res,
        FirstName,
        LastName,
        Age,
        Help,
        Address,
        PhoneNumber
      })
    })
    this.setState({
      userArr
    })
  }

  storeUser() {
    this.storeData
      .add({
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Age: this.state.Age,
        Help: this.state.Help,
        Address: this.state.Address,
        PhoneNumber: this.state.PhoneNumber,
      })
      .then((res) => {
        this.setState({
          FirstName: '',
          LastName: '',
          Age: '',
          Help: '',
          Address: '',
          PhoneNumber: '',
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

    const { text, user } = this.props.route.params

    this.fireStoreData = firestore().collection("Cases").doc({ text }.text).collection("Detail");

    this.storeData = firestore().collection("Users").doc({ user }.user.email).collection("YourCase");

    return (
      <ScrollView >

        <View>
          <Text> ผู้ป่วยที่ต้องการความช่วยเหลือ </Text>
          {
            this.state.userArr.map((item, i) => {

              this.state.FirstName = item.FirstName
              this.state.LastName = item.LastName
              this.state.Age = item.Age
              this.state.Help = item.Help
              this.state.Address = item.Address
              this.state.PhoneNumber = item.PhoneNumber

              return (
                <ListItem
                  key={i}
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>ชื่อ : {item.FirstName} นามสกุล : {item.LastName}</ListItem.Title>
                    <ListItem.Title>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                    <ListItem.Title>ที่อยู่ : {item.Address}</ListItem.Title>

                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                      this.props.navigation.navigate('Your Case', { text: { text }.text, user: user });
                      this.storeUser()
                    }
                    }>
                      <Text style={styles.loginButtonText}>
                        ยืนยันช่วยเหลือ
                      </Text>
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              );
            })
          }
        </View>
        </ScrollView >

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
  }
});


export default ShowData;