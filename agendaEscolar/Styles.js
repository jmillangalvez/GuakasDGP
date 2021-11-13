import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    banner: {
      backgroundColor: '#248aff',
      width: '100%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 60,
      fontWeight: 'bold'
    },
    buttonView: {
      marginTop: '5%', 
      width: 180,
      height: 180,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 3
    },
    buttonTouch: {
      marginTop: '5%',
      width: 160,
      height: 160,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    buttonChoose: {
      marginTop: '5%',
      width: 150,
      height: 150,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 3
    },
    chooseTouch: {
      marginTop: '5%', 
      width: 120,
      height: 120,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
    },
    choosingView: {
      marginTop: '5%',
      width: '90%',
      height: 150,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 3
    },
    choosingButton:  {
      height: '90%',
      borderWidth: 3,
      fontSize: 25,
      fontWeight: 'bold',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10
    },
    buttonText: {
      marginBottom: 15,
      fontSize: 25,
      fontWeight: 'bold',
    },
    choosingStudentView: {
      width: 250,
      height: 70,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowButton: {
      width: 250,
      height: 100,
      flex: 0.75,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrowImage: {
      width: '100%',
      height: '100%',
    },
    loginAdminText: {
      width: '100%',
      height: '100%',
    },
    loginAdminView: {
      width: '95%',
      justifyContent: 'center',
    }
  });

  export default styles;