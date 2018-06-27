import React from 'react';
import { Image} from 'react-native';
import SearchBar from 'react-native-searchbar'

export default class SearchBarComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          searchText:'',
          searchBar: SearchBar
        }
      }

    changeText(search){
        try{
            this.setState({searchText:search})
        }
        catch (err){
          console.log(err)
        }
      }

      makeSearch(){
        try{
            this.props.navigation.push('FilterProducts', {
                filter_parameter :5,
                filter_value: this.state.searchText
              });
           
        }
        catch (err){
          console.log(err)
        }
      }
    
    showBar(){
        this.searchBar.show()
    }
    hideBar(){
        this.searchBar.hide()
    }
    render() {
     
          return (
        
        <SearchBar
        ref={(ref) => this.searchBar = ref}
        placeholder ="Поиск"
        handleChangeText ={text=>this.changeText(text)}
        onSubmitEditing={()=>this.makeSearch()}
        //showOnLoad
      />
      );
    //} else return(null)
} 
  }