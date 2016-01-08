'use strict';

var React = require('react-native');
var RepoPayload = require('./RepoPayload.js');

var {
    Text,
    View,
    Component,
    StyleSheet,
    ListView,
    ActivityIndicatorIOS,
    Image,
    TouchableHighlight 
} = React;

class Repos extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 != r2
        });
        this.state = {
            dataSource: ds,
            showProgress:true
        };
    }
    
    componentDidMount(){
        this.fetchFeed();
    }
    
    fetchFeed(){
        require('./AuthService').getAuthInfo( (err, authInfo) => {
            var url = 'https://api.github.com/users/'
            + authInfo.user.login
            +'/repos';

            fetch(url, {
                headers: authInfo.header
            })
            .then( (response) => response.json() )
            .then( (responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    showProgress:false
                });
            })
            .catch( (err)=>{
                console.log('error! :( - '+err);
                //this.setState(err);
            });            
        });
    }
    
    pressRow(rowData){
        this.props.navigator.push({
            title: rowData.name,
            component: RepoPayload,
            passProps:{
                repo: rowData
            }
        });
    }
    
    renderRow(rowData){
            return (
                <TouchableHighlight
                    onPress={ ()=> this.pressRow(rowData)}
                    underlayColor='#ddd'>
                    
                    <View style={styles.row}>

                        <View style={{     
                            padding:20,
                            }}>                            
                            <Text style={{color:'#000' }}>
                                {rowData.name}</Text>
                                
                            <Text style={{color:'#000'}}>
                                {()=>{
                                    if(rowData.private){
                                        return"Private"; 
                                    }else return "Public";
                                }}</Text>
                                
                            <Text style={{color:'#000' }}>
                                {rowData.stargazers_count}</Text>
                                        
                            <Text style={{color:'#000' }}>
                                {rowData.forks}</Text>
                                                                                                             
                        </View>
                        
                    </View>
                 </TouchableHighlight>
            )
    }
    
    render(){
        
        if(this.state.showProgress){
            return (
                <View style={{
                    flex:1,
                    justifyContent:'center'}}>
                    <ActivityIndicatorIOS size="large" />
                 </View>
            );
        }else{
            
            return (
                <View style={{
                    flex:1,
                    justifyContent:'flex-start'}}>
                    <ListView
                        style={styles.list}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)} 
                    />
                </View>                           
            );           
            
        }       
    }
 }
 
 var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
    color: 'red'
  },
  list:{
      paddingTop:50
  },row:{
    flex:1,
    flexDirection: 'row',
    paddingLeft:20,
    paddingTop:14,
    alignItems: 'center',
    borderColor:'#D7D7D7',
    borderBottomWidth: 1      
  }
});
 
 module.exports = Repos;