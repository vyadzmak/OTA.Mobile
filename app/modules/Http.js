import API_URL from './Settings'
export default function getWithParams(route, params) {
    try{
        //alert("HERE")
        ///productsCategoriesByProductCategory
        url = API_URL+route+"?"

        p_string =''

        p_length = params.length
        counter =0
      
        //alert("SS"+(params))
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
        //alert(url)
        // //url = API_URL+ '/productsCategoriesByProductCategory?user_id=1&category_id='+this.state.current_category_id
        return fetch(url)
        .then(function(response) {
            if (response.status == 200) {
                return response.json()
            }
          else return []
        })
         .catch(function(error) {
             return []
            //Alert.alert(error);   // Using this line
        });


        // .then(response => response.json())
        // .then(json => {
        //     // alert(JSON.stringify(json))
        //     return json
            
        // })
    }
    catch (err){
        alert("Error")
    }    
}