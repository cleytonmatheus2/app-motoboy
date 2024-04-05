import { View, StyleSheet, Text } from "react-native"; 


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20
  }, 
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    paddingLeft:40,
    marginHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#CCC",
  },
  iconUser: {
    width: 18,
    height: 18,
    position: "absolute",
    top: 15,
    left: 33
  },
  iconLock: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 15,
    left: 33
  },
  button: {
    paddingTop: 50,
    marginTop: 50,
    backgroundColor: "#171626"
  }
  
});


  export default styles