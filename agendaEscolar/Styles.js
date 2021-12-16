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
  sideBanner: {
    backgroundColor: '#eb3d34',
    width: '12.5%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: '15%'
  },
  sideBannerLast: {
    backgroundColor: '#00FF00',
    width: '12.5%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: '15%'
  },
  headerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff'
  },
  taskText: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  enterButtonLoginView: {
    marginTop: '5%', 
    width: 180,
    height: 180,
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 3
  },
  enterButtonView: {
    marginTop: '20%',
    width: 250,
    height: 150,
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 3
  },
  formItem: {
    marginTop: '10%',
    marginRight: '10%',
  },
  formItem2: {
    marginTop: '10%',
    marginRight: '10%',
    width: '200px'
  },
  confirmButton: {
    marginTop: '5%',
  },
  removeButton: {
    marginTop: '1%',
  },
  enterButtonDownView: {
    marginTop: '10%',
    width: 250,
    height: 150,
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 3
  },
  middleView: {
    marginTop: '20%',
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
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
  choosingButton: {
    height: '90%',
    borderWidth: 3,
    fontSize: 25,
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  taskButton:  {
    height: '90%',
    width: '60%',
    borderWidth: 3,
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskButton2:  {
    height: '15%',
    width: '60%',
    margin: 5,
    borderWidth: 3,
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
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
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  listImage:{
    width:100,
    height:100,
    borderRadius:20,
    marginLeft:20
  },
  listImage2:{
    width:75,
    height:75,
    borderRadius:20,
    marginLeft:20
  },
  listText:{
    fontSize:40,
  },
  pictogram: {
    width: '500px',
    height: '500px',
  },
  pictogram2: {
    width: '300px',
    height: '300px',
  },
  loginAdminText: {
    width: '100%',
    height: '100%',
    fontSize: 30
  },
  backText: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    color: '#fff'
  },
  normalText: {
    width: '100%',
    height: '100%'
  },
  loginAdminView: {
    width: '95%',
    justifyContent: 'center',
  },
  loginAdminBox: {
    height: 'auto',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    padding: 30,
    borderWidth: 4
  },
  loginAdminInput: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5
  },
  loginAdminButton: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#248aff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    flex: 0.9, 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 60
  },
  listContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listContent: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
    height: 100
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
  },
  buttonTouch: {
    backgroundColor: "#bcbcbc",
    justifyContent: 'center',
    width: '42.5%',
    height: '42.5%'
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
  },
  dailyTaskView: {
    marginTop: '5%',
    width: '70%',
    height: 350,
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
  dailyTaks2: {
    marginLeft: 100,
    marginRight: 100,
    fontSize: 25,
    fontWeight: 'bold'
  },
  arrowButtonDailyTasks: {
    width: 100,
    height: 100,
    margin: 100,
  },
  selectImage: {
    width: 100,
    height: 100,
  },
  selectImage2: {
    width: 75,
    height: 75,
  },
  pictoSafeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '12%'
  },
  pictoSafeArea2: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  educatorTaskView: {
    marginTop: '5%',
    width: '70%',
    height: '70%',
    backgroundColor: "#faff6d",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 3
  },
  formContent: {
    fontSize: 25
  }
});

export default styles;