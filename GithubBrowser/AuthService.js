var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth',
      userKey ='user';

class AuthService{
    
    getAuthInfo(cb){
        AsyncStorage.multiGet([authKey, userKey], (err,val)=>{
            if(err){
                return cb(err);
            }
            if(!val){
                return cb();
            }
            
            var zippedObj = _.zipObject(val);
            
            if(!zippedObj[authKey]){
                return cb();
            }
            
            var authInfo = {
                headers: {
                    'Authorization':'Basic '+zippedObj[authKey] 
                },user: JSON.parse(zippedObj[userKey])
            }
            
            return cb(null, authInfo);
        });
    }
    
    
    login(creds, cb){
        
        var b = new buffer.Buffer( creds.username +':'
        + creds.password);             
        var auth = b.toString('base64');
        
       fetch('https://api.github.com/user',{
        headers: {
            'Authorization':'Basic '+auth 
        }   
       })
       .then( (response)=> {
           if(response.status >= 200 && response.status < 300){
              return response; 
           }
        //    else if(response.status === 401){
        //       throw 'bad credentials'; 
        //    }
        //    throw 'unknown error';
        
        throw{
          badCredentials: response.status == 401,
          unknownError: response.status != 401  
        }
        
       })       
       .then( (response)=> {
           
           return response.json();
       })
       .then ( (results)=> {
           console.log(results);
           AsyncStorage.multiSet([
               [authKey,auth],
               [userKey,JSON.stringify(results)]
            ],(err)=> {
                if(err){
                   throw err;
                }
                               
                return cb({success:true});
                
            })                               
           
        //    this.setState({
        //        showProgress:false
        //    });
       })
       .catch( (err)=>{
           console.log('logon failed: '+err);
           cb(err);
           //this.setState(err);
       });
                  
    }
}

module.exports = new AuthService();