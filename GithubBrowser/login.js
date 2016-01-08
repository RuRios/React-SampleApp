'use strict';


var React = require('react-native');
var buffer = require('buffer');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Component,
    ActivityIndicatorIOS
} = React;

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            showProgress:false
        }
    }
    render(){
        
        var errorCtrl = <View/>;
        
        if(this.state.badCredentials){
            errorCtrl = <Text style={styles.errorMsg}>The user or pass is invalid</Text>;
        }
        if(this.state.unknownError){
            errorCtrl = <Text style={styles.errorMsg}>Unexpected issue</Text>;
        }        
                
        return (
           <View style={styles.container}>
                <Image style={styles.logo} source={require('image!Octocat')}  />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput style={styles.input} 
                           placeholder="Github Username"
                           onChangeText={(text)=> this.setState({ username: text }) } />
                <TextInput style={styles.input} 
                           placeholder="Github Password" 
                           secureTextEntry='true'                           
                           onChangeText={(text)=> this.setState({ password: text }) } />
                <TouchableHighlight 
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
                <ActivityIndicatorIOS
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader}
                />
                {errorCtrl}
                
           </View>
       );
   }
   
   onLoginPressed(){
       console.log('attemp login: '+ this.state.username);
       this.setState({showProgress: true});
       
       var authService = require('./AuthService');
       authService.login({
           username: this.state.username,
           password: this.state.password
       }, (results)=> {
           this.setState(Object.assign({showProgress:false},results));
           
           if(results.success && this.props.onLogin)
           {
               this.props.onLogin();
           }
                      
       });
          
   }
   
};

var styles = StyleSheet.create({
    container: {
        backgroundColor:'#F5FCFF',
        flex: 1,
        paddingTop: 40,
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
    },
    loader:{
        marginTop: 20
    },
    errorMsg:{
        
    }
});

module.exports = Login;