'use strict';

var React = require('react-native');
var moment = require('moment');

var {
    Text,
    View,
    Component,
    Image,
    StyleSheet,
    ListView
} = React;

class PushPayload extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 != r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
            pushEvent: props.pushEvent 
        };
    }
    
    renderRow(rowData){
        return(
            <View style={styles.row}>
                <Text><Text style={styles.highlight}>{rowData.sha.substring(0,6)}</Text> - {rowData.message}</Text>
            </View>
        );
    }
    
    render(){        
         return (
                <View style={styles.container}>
                    <Image style={styles.avatar}
                        source={{uri: this.state.pushEvent.actor.avatar_url}}/>
                    <Text style={styles.time}>{moment(this.state.pushEvent.created_at).fromNow()}</Text>
                    <Text><Text style={styles.highlight}>{this.state.pushEvent.actor.login}</Text> pushed to</Text>                   
                    <Text style={styles.highlight}>{this.state.pushEvent.payload.ref.replace('refs/heads/','')}</Text>
                    <Text> at <Text style={styles.highlight}>{this.state.pushEvent.repo.name}</Text></Text>
                    <Text style={styles.commits}>{this.state.pushEvent.payload.commits.length} commit(s)</Text>                    
                    <ListView 
                        contentInset={{top:-40}}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)} />                                        
                 </View>             
        );    
    }
 }
 
  var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    justifyContent:'flex-start',
    alignItems: 'center'    
  },
  avatar: {       
    height: 120,
    width: 120,
    borderRadius: 60,
    paddingTop:20,
  },
  row: {
    flex: 1,
    justifyContent:'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
    paddingTop:20,
    paddingBottom: 20,
    padding: 10,
  },
  time:{
      padding:20,
      fontSize: 20,
  },
  highlight:{
      fontWeight: '800',
  },
  commits:{
      padding:20,
      fontSize: 20,      
  }
});
 
module.exports = PushPayload;