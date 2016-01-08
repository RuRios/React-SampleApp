'use strict';

var React = require('react-native');

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

class SearchResults extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 != r2
        });
        this.state = {
            dataSource: ds,
            showProgress:true,
            searchQuery: props.searchQuery
        };
    }
    
    componentDidMount(){
        this.doSearch();
    }
    
    doSearch(){
        
        console.log('do search');
        
        var url = 'https://api.github.com/search/repositories?q='+
            encodeURIComponent(this.state.searchQuery);
     
        fetch(url)
            .then( (response) => response.json() )
            .then( (responseData) => {
                console.log('response: '+responseData);
                this.setState({
                    repositories: responseData.repositories,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items)
                })
            })
            .catch( (err)=>{
                console.log('Error searching: '+err);
            })
            .finally( ()=> {
                    this.setState({
                        showProgress:false 
                    })
                }                
        );

    }
    
    
    renderRow(rowData){
            return (
                <TouchableHighlight underlayColor='#ddd'>
                    
                    <View style={styles.row}>
                                       
                          <Text style={styles.repoLabel}>{rowData.full_name}</Text>
                          
                          <View style={styles.innerContainer}>                          
                                <View style={styles.repoCell}>                            
                                    <Image style={styles.repoCellIcon }
                                        source={require('image!star')}/>                                    
                                    <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>                                                           
                                </View>
                                <View style={styles.repoCell}>                            
                                    <Image style={styles.repoCellIcon }
                                        source={require('image!fork')}/>                                    
                                    <Text style={styles.repoCellLabel}>{rowData.forks}</Text>                                                           
                                </View>
                                <View style={styles.repoCell}>                            
                                    <Image style={styles.repoCellIcon }
                                        source={require('image!issues2')}/>                                    
                                    <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>                                                           
                                </View>
                          
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
  list:{
      paddingTop:50
  },
  row:{
    flex:1,
    flexDirection: 'row',
    padding:20,
    alignItems: 'center',
    borderColor:'#D7D7D7',
    borderBottomWidth: 1                            
  },
  repoLabel:{
    fontSize: 20,
    fontWeight: '600'  
  },
  innerContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:20,
    marginBottom: 20          
  }, 
  repoCellIcon:{
      width: 20,
      height: 20
  },
  repoCellLabel:{
      alignItems: 'center'
  },  
  
});
 
 module.exports = SearchResults;