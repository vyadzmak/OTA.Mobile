import { AsyncStorage } from "react-native";

//DEVIL's CHILD!!!!!!!!!!!!!!!!!!!!!!!!!!
//get value from storage
export async function GetStorageValue(name) {
  try {
    
    return AsyncStorage.getItem(name).then(value => {
        return JSON.stringify(value)
      }
    )
  } catch (err) {}
}

//set value to storage
export function SetStorageValue(name, value){
  try {
    let v =value
    let n = name
    AsyncStorage.setItem(n, v);
  } catch (err) {}
};

export const _storeData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
   // alert("OK")
  } catch (error) {
    // Error saving data
  }
}

export const _retrieveData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
   } catch (error) {
     // Error retrieving data
   }
}