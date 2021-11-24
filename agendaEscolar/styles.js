import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
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
    bottomBanner: {
      backgroundColor: '#248aff',
      width: '100%',
      height: '15%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0
    },
    headerText: {
      fontSize: 60,
      fontWeight: 'bold'
    },
    enterButtonView: {
      marginTop: '5%', 
      width: 180,
      height: 180,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 3
    },
    enterButtonTouch: {
      marginTop: '5%',
      width: 160,
      height: 160,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
    },
    chooseView: {
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
    image: {
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
    },
    dailyTaskView: {
      marginTop: '5%',
      width: '50%',
      height: 500,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderWidth: 3
    },
    dailyTaks: {
      marginBottom: 15,
      marginLeft: 100,
      marginRight: 100,
      fontSize: 25,
      fontWeight: 'bold'
    },
    arrowButtonDailyTasks: {
      borderWidth: 3,
      flex: 0.5,
      width: 20,
      height: 100,
      margin: 100,
    },
    container2: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: '#fff',
      width: '100%',
      height: '95%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    taskButtonTouch: {
      width: 300,
      height: 300,
      margin: 10,
      backgroundColor: "#faff6d",
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    taskButtonText: {
      fontSize: 40,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    goBackText: {
      fontSize: 18,
      width: '100%',
      height: '100%',
    },
    goBackView: {
      position: 'absolute',
      margin: 10,
      left: 5,
      top: 5,
    }
  });

  export default styles;