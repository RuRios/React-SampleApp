'use strict';

var React = require('react-native');
var Feed = require('./Feed');
var Repos = require('./Repos');
var Search = require('./Search');

var {
    Text,
    View,
    Component,
    StyleSheet,
    TabBarIOS,
    NavigatorIOS
} = React;

class AppContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'repos' 
        }
    }
    render(){
        return (
            <TabBarIOS style={styles.container}>

                <TabBarIOS.Item
                    title="Repos"
                    selected={this.state.selectedTab =='repos'}
                    icon={require('image!inbox')} 
                    onPress={ ()=>this.setState({selectedTab: 'repos' }) }>                        
                        <NavigatorIOS
                            style={{
                                flex:1
                            }}
                            initialRoute={{
                                component: Repos,
                                title: 'Repos'
                            }}/>
                </TabBarIOS.Item>
                
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab =='feed'}
                    icon={require('image!inbox')} 
                    onPress={ ()=>this.setState({selectedTab: 'feed' }) }>                        
                        <NavigatorIOS
                            style={{
                                flex:1
                            }}
                            initialRoute={{
                                component: Feed,
                                title: 'Feed'
                            }}/>
                </TabBarIOS.Item>
                
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab =='search'}
                    icon={require('image!search')} 
                    onPress={ ()=>this.setState({selectedTab: 'search' }) }>                        
                        <NavigatorIOS
                            style={{
                                flex:1
                            }}
                            initialRoute={{
                                component: Search,
                                title: 'Search'
                            }}/>
                </TabBarIOS.Item>                  
            </TabBarIOS>                                
        );         
    }
 }
 
 var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop:0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
    color: 'red'
  }
});
 
 module.exports = AppContainer;