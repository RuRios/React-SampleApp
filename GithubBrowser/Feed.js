'use strict';

var React = require('react-native');
var moment = require('moment');
var PushPayload = require('./PushPayload.js');

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

class Feed extends Component{
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
            +'/received_events';
            
            fetch(url, {
                headers: authInfo.header
            })
            .then( (response) => response.json() )
            .then( (responseData) => {
                var feedItems =  responseData.filter( (ev) => ev.type == 'PushEvent');
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedItems),
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
            title: 'Push Event',
            component: PushPayload,
            passProps:{
                pushEvent: rowData
            }
        });
    }
    
    renderRow(rowData){
            return (
                <TouchableHighlight
                    onPress={ ()=> this.pressRow(rowData)}
                    underlayColor='#ddd'>
                    
                    <View style={styles.row}>
                        <Image
                            source={{uri: rowData.actor.avatar_url}}
                            style={{
                                height: 36,
                                width: 36,
                                borderRadius: 18}}/>
                        <View style={{     
                            padding:20,
                            }}>                            
                            <Text style={{color:'#000' }}>
                                {moment(rowData.created_at).fromNow()}</Text>
                            <Text style={{color:'#000'}}>
                                {rowData.actor.login}</Text>
                            <Text style={{color:'#000' }}>
                                {rowData.payload.ref.replace('refs/heads/','')}</Text>                                                
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
 
 module.exports = Feed;