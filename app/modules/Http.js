import API_URL from './Settings'
//make get request with get params
export default function getWithParams(route, params) {
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
// export default function getWithSlashParams(route) {
//     try{
//         url = API_URL+route
//         return fetch(url)
//         .then(function(response) {
//             if (response.status == 200) {
//                 return response.json()
//             }
//           else return []
//         })
//          .catch(function(error) {
//              return []
//         });
//     }
//     catch (err){
//         alert("Error")
//     }    
// }