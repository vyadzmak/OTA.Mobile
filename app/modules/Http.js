import API_URL from './Settings'
//make get request with get params
//export const func1=()=>{

export const AGetWithParams=(route, params)=> {
        try {
            url = API_URL+route+"?"
            p_string =''
            p_length = params.length
            counter =0
             for (key in params){
                element = params[key]
                e = element["name"] +"="+element["value"]
                //alert(JSON.stringify(element))
                p_string+=e
                counter++
                if (counter<=p_length-1){
                    p_string+="&"
                }
             }
            url+=p_string

        console.log(url)
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('DONE!!!')
            return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        } catch (error) {
          console.error(error);
          return null
        }
      }

export const getWithParams=(route, params)=> {
    try{
        url = API_URL+route+"?"
        p_string =''
        p_length = params.length
        counter =0
         for (key in params){
            element = params[key]
            e = element["name"] +"="+element["value"]
            //alert(JSON.stringify(element))
            p_string+=e
            counter++
            if (counter<=p_length-1){
                p_string+="&"
            }
         }
        url+=p_string
        console.log(url)
        return fetch(url)
        .then((response) => {return response.json()})
        .catch((err) => console.log('Error!!!!' + err));
    }
    catch (err){
        alert("Error")
    }    
}

// //make get request with slash params
export const getWithSlashParams=(route)=> {
    try{
        url = API_URL+route
        //alert(url)
        return fetch(url)
        .then((response) => {return response.json()})
        .catch((err) => {console.log('Error!!!!' + err); return null});
    }
    catch (err){
        alert("Error")
    }    
}

const read_json  = (response)=>{
    return response.json().then(answer=>{return answer.message})
}

export const postRequest=(route, params)=> {
    try{
        url = API_URL+route
        
        return fetch(url, {
            method: 'POST',
            headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                     },
            body: JSON.stringify(params),
                    })
                    
                    .then((response) => response.json())
                    .then((responseData) => {
                        //ob = {}
                        return responseData
                        
                    })
                    .catch((err) => {console.log('Error!!!!' + err); return null});
    }
    catch (err){
        return null
        console.log(err)
    }
}