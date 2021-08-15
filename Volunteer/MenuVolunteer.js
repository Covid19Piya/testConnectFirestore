import * as React from 'react';
import {useContext, Component} from 'react';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import {AuthContext} from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
console.disableYellowBox = true;
export default function homeScreen({navigation}) {
  const {user, logout} = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Welcome Teacher </Text>
      <Text style={styles.head}>"{user.email}"</Text>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('MakeSubject')}>
        <Text style={styles.loginButtonText}>
        Create Exam
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('studentScore')}>
        <Text style={styles.loginButtonText}>
        Student Score
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Name Exam Chat')}>
        <Text style={styles.loginButtonText}>
        Exam Chat
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('homeWorkMain')}>
        <Text style={styles.loginButtonText}>
        Homework Create
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('mainShowAns')}>
        <Text style={styles.loginButtonText}>
        Homework Answer
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.loginButtonText}>
        Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
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
  welcome:{
    fontWeight: 'bold',
    fontSize:25,
    color: '#00B3B2',
    
  },
  head:{
    fontWeight: 'bold',
    fontSize:20,
    color: '#00B3B2',
    marginBottom: 20,
  },

  loginButtonText: {
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize:20,
    padding: 15
  },
  
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#00CABA',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },
  logoutButton: {
    marginVertical: 10,
    backgroundColor: '#b53531',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
    },

  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
    
  },
});
