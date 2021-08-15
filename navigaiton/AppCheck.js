import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import firestore from '@react-native-firebase/firestore';

// Patient

import MenuPatient from '../Patient/MenuPatient';
import MenuVolunteer from '../Volunteer/MenuVolunteer';

const Stack = createStackNavigator();
var teacher = null;
const list = [];
const loopdata = (user) => {
  list.map((each) => {
    if (each.Email == user.email && each.Teacher) {
      teacher = true;
    } else if (each.Email == user.email && !each.Teacher) {
      teacher = false;
    }
  });
};

export default function checkRoleScreen() {
  const { user } = useContext(AuthContext);
  const [Email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await firestore()
          .collection('Users')
          .get()
          .then((querySnapshot) => {
            // console.log('Total Users: ',querySnapshot.size)
            querySnapshot.forEach((doc) => {
              const { Email, Teacher } = doc.data();
              list.push({
                id: doc.id,
                Email,
                Teacher,
              });
            });
          });

        setEmail(list);
        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);


  loopdata(user);

  return teacher ? (
    <>
      <Stack.Navigator initialRouteName="HomeTeacher">

      <Stack.Screen name="Menu" component={MenuVolunteer} />


      </Stack.Navigator>
    </>
  ) : (
    <>
      <Stack.Navigator initialRouteName="HomeStudent">



        <Stack.Screen name="Menu" component={MenuPatient} />



      </Stack.Navigator>
    </>
  );
}
