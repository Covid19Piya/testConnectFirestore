import * as React from 'react';
import { useContext, Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class addData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      Name: '',
      Age: '',
      Help: '',
      PhoneNumber: '',
      Address: '',
      Status: '',
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeUser() {

      this.case
      .add({
        Name: this.state.Name,
        Age: this.state.Age,
        Help: this.state.Help,
        PhoneNumber: this.state.PhoneNumber,
        Address: this.state.Address,
        Status: "waiting",
        Request: '',
        Confirm: 'No'
      })
      .then((res) => {
        this.setState({
          Name: '',
          Age: '',
          Help: '',
          PhoneNumber: '',
          Address: '',
          Status: 'waiting',
          Request: '',
          Confirm: 'No'
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
    const { user } = this.props.route.params

    this.case = firestore().collection('Patient').doc(this.state.Name).collection("Case");


    return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder="กรุณาใส่ชื่อของคุณ "
            leftIcon={{ type: 'font-awesome', name: 'book' }}
            style={styles}
            value={this.state.Name}
            onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
          />
          <Input
            placeholder="อายุ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.Age}
            onChangeText={(val) => this.inputValueUpdate(val, 'Age')}
          />
          <Input
            placeholder="ต้องการความช่วยเหลือเรื่องใด"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.Help}
            onChangeText={(val) => this.inputValueUpdate(val, 'Help')}
          />
          <Input
            placeholder="หมายเลขโทรศัพท์"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.PhoneNumber}
            onChangeText={(val) => this.inputValueUpdate(val, 'PhoneNumber')}
          />

          <Input
            placeholder="ที่อยู่ของคุณ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.Address}
            onChangeText={(val) => this.inputValueUpdate(val, 'Address')}
          />



          <TouchableOpacity style={styles.loginButton} onPress={() => {
            this.props.navigation.navigate('Menu');
            this.storeUser()

          }}>
            <Text style={styles.loginButtonText}>
              ยืนยัน
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  onPressButton() {
    const { navigate } = this.props.navigation;
    navigate('HomeTeacher');
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
export default addData;
