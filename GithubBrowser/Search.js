'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Component
} = React;

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
                
        return (
           <View style={styles.container}> 
                <TextInput style={styles.input} 
                           placeholder="Search Query"
                           onChangeText={(text)=> this.setState({ 
                           searchQuery: text 
                 }) }/>
                
                <TouchableHighlight 
                    onPress={this.onSearchPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
                
           </View>
       );
   }
   
   onSearchPressed(){
       console.log('Attemping to search for: '+ this.state.searchQuery);
       
       this.props.navigator.push({
            title: 'Results',
            component: SearchResults,
            passProps:{
                searchQuery: this.state.searchQuery
            }
        });
    }
   
};

var styles = StyleSheet.create({
    container: {
        backgroundColor:'#F5FCFF',
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width: 66,
        height: 55
    },
    heading:{
        fontSize: 30,
        marginTop: 10
    },
    input:{
        fontSize: 18,
        marginTop: 10,
        height: 50,
        padding: 4,
        borderWidth: 1,
        borderColor:'#48bbec' 
    },
    button:{
        backgroundColor:'#48BBEC',
        alignSelf:'stretch',
        marginTop: 10,
        height:50,
        justifyContent:'center'           
    },
    buttonText:{       
        fontSize: 22,
        color:'#fff',
        alignSelf:'center'  
    }
});

module.exports = Search;