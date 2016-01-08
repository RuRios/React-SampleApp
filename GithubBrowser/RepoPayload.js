'use strict';

var React = require('react-native');
var moment = require('moment');

var {
    Text,
    View,
    Component,
    Image,
    StyleSheet,
    ListView,
    ActivityIndicatorIOS
} = React;

class PushPayload extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 != r2
        });
        this.state = {
            //dataSource: ds.cloneWithRows(props.repo.payload.commits),
            repo: props.repo,
            showProgress:true,
            dataSource: ds
        };
    }
    
   
    componentDidMount(){
        this.getCommitsData();
    }
    
    getCommitsData(){
        
        console.log('get commit data');
        
        var url = 'https://api.github.com/repos/rurios/'
        +this.state.repo.name+'/commits';
             
        fetch(url)
            .then( (response) => response.json() )
            .then( (responseData) => {
                //console.log('response: '+responseData);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData)
                });                
            })
            .catch( (err)=>{
                console.log('Error getting commits: '+err);
            })
            .finally( ()=> {
                    this.setState({
                        showProgress:false 
                    })
                }                
        );

    }
    
    renderRow(rowData){
        return(
            <View style={styles.row}>
                <Image  source={{uri: rowData.author.avatar_url}}
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18}}/>
                <Text> SHA: <Text style={styles.highlight}>{rowData.sha}</Text></Text>
                <Text> Author: <Text style={styles.highlight}>{rowData.author.login}</Text></Text>
                <Text> Message: <Text style={styles.highlight}>{rowData.commit.message}</Text></Text>
            </View>
        );
    }
    
    render(){
        

        if(this.state.showProgress){            
            return (
                    <View style={styles.container}>
                        <ActivityIndicatorIOS/>                                                                                                           
                    </View>             
            );                        
        }
            return (
                    <View style={styles.container}>
                        <Text><Text style={styles.highlight}>Latest Commits</Text></Text>
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