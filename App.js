import * as React from 'react';
import {useContext, Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Input, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

class addData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
      ans: '',
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
        question: this.state.question,
        choice1: this.state.choice1,
        choice2: this.state.choice2,
        choice3: this.state.choice3,
        choice4: this.state.choice4,
        ans: this.state.ans,
      })
      .then((res) => {
        this.setState({
          question: '',
          choice1: '',
          choice2: '',
          choice3: '',
          choice4: '',
          ans: '',
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
    const {text} = "poom";
    console.log({text}.text);
    this.usersCollectionRef = firestore()
      .collection('subject_Code')
      .doc({text}.text)
      .collection('Exam');
    return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder="Question"
            leftIcon={{type: 'font-awesome', name: 'book'}}
            style={styles}
            value={this.state.question}
            onChangeText={(val) => this.inputValueUpdate(val, 'question')}
          />
          <Input
            placeholder="Choice 1"
            leftIcon={{type: 'font-awesome', name: 'caret-right'}}
            style={styles}
            value={this.state.choice1}
            onChangeText={(val) => this.inputValueUpdate(val, 'choice1')}
          />
          <Input
            placeholder="Choice 2"
            leftIcon={{type: 'font-awesome', name: 'caret-right'}}
            style={styles}
            value={this.state.choice2}
            onChangeText={(val) => this.inputValueUpdate(val, 'choice2')}
          />
          <Input
            placeholder="Choice 3"
            leftIcon={{type: 'font-awesome', name: 'caret-right'}}
            style={styles}
            value={this.state.choice3}
            onChangeText={(val) => this.inputValueUpdate(val, 'choice3')}
          />

          <Input
            placeholder="Choice 4"
            leftIcon={{type: 'font-awesome', name: 'caret-right'}}
            style={styles}
            value={this.state.choice4}
            onChangeText={(val) => this.inputValueUpdate(val, 'choice4')}
          />

          <Input
            placeholder="Answer"
            leftIcon={{type: 'font-awesome', name: 'caret-right'}}
            style={styles}
            value={this.state.ans}
            onChangeText={(val) => this.inputValueUpdate(val, 'ans')}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.storeUser()}>
            <Text style={styles.loginButtonText}>ADD QUESTION</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.onPressButton}>
            <Text style={styles.loginButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  onPressButton() {
    const {navigate} = this.props.navigation;
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
