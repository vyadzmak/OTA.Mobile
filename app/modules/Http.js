import API_URL from './Settings'
//make get request with get params
//export const func1=()=>{
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
        
        return fetch(url)
        .then(function(response) {
            if (response.status == 200) {
                return response.json()
            }
          else return []
        })
         .catch(function(error) {
             return []
        });
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
        .then(function(response) {
            if (response.status == 200) {
                return response.json()
            }
          else return []
        })
         .catch(function(error) {
             return []
        });
    }
    catch (err){
        alert("Error")
    }    
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
                    
                    .then(function(response) {
                        if (response.status == 200) {
                            return response.json()
                        }
                      else return response
                    })
                     .catch(function(error) {
                         return response
                    });;
    }
    catch (err){
        console.log(err)
    }
}