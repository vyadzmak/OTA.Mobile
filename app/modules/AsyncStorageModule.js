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


