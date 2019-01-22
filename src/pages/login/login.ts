import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Network } from '@ionic-native/network';
import { RestProvider } from "../../providers/rest/rest";
import { GlobalsProvider } from "../../providers/globals/globals";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import { Instagram } from "ng2-cordova-oauth/core";
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AngularFireDatabase } from '@angular/fire/database';
               
@Component({
  selector: 'page-login',    
  templateUrl: 'login.html'
})            
export class LoginPage{
   user: Observable<firebase.User>;

  loading: any;
  loginData = { user_email:'', user_password:'' };
  response: any;
  platform:any;
  constructor(public navCtrl: NavController, public rest_call: RestProvider, private afAuth: AngularFireAuth, public globals: GlobalsProvider, public fb: Facebook,private _net: Network,public platform: Platform, public db : AngularFireDatabase, private twitter: TwitterConnect, private push: Push) {
    this.platform = platform;
    if(!this.isConnected()){
      alert("No Internet Available!! Please activate internet for better user experience ;)");
    }
                  
    
  }
	
  
   ionViewDidLoad() {
    this.initPushNotification()
  }
  isConnected(): boolean {
    let conntype = this._net.type;
    return conntype && conntype !== 'unknown' && conntype !== 'none';
  }

   initPushNotification()
 {
  const options: PushOptions = {
    android: {
      senderID: "454166531047"
    },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
 };



  const pushObject: PushObject = this.push.init(options);
  pushObject.on('notification').subscribe((notification: any) => this.openhomepage());




 pushObject.on('registration').subscribe((registration: any) =>   this.savedevicetokentoserver(registration.registrationId));



  pushObject.on('error').subscribe(error => alert(JSON.stringify(error)));




 }
             
 savedevicetokentoserver(token){
 console.log(token);

 }
                   

  doLogin() {
    // this.navCtrl.setRoot(HomePage);
	if(this.loginData.user_email && this.loginData.user_password){
		
	
   // this.globals.showLoader('Authenticating...');
	  this.rest_call.validateEmail(this.loginData.user_email);
    this.rest_call.login(this.loginData).then((result) => {
	if(result){
       console.log(result);
       this.navCtrl.push(TabsPage);
			//  this.globals.loading.dismiss();
			//  this.globals.presentToast("Login Successfully");
			//  this.navCtrl.push(TabsPage)
	}                                   
      // this.loading.dismiss();
      // this.response = result;
      // if(this.response.status == 'success'){
        // localStorage.setItem('user_id', this.response.data.user_id);
        // localStorage.setItem('user_name', this.response.data.user_name);
        // localStorage.setItem('user_email', this.response.data.user_email);
        // localStorage.setItem('user_status', this.response.data.user_status);  
        // this.navCtrl.setRoot(HomePage);
      // }else{
        // this.loading.dismiss();
        // this.globals.presentToast(this.response.message);
      // }
    }, (err) => {
		console.log(err);
		// this.globals.loading.dismiss();
     // this.loading.dismiss();
      this.globals.presentToast("Wrong Email Or Password");
    });
	}           
	else
	{
   this.globals.presentToast("Please enter email and password both");
	}
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  

  do_facebook_login(){
      // Login with permissions
      this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday', 'user_friends'])
      .then( (res: FacebookLoginResponse) => {

          // The connection was successful
          if(res.status == "connected") {

              // Get user ID and Token
              var fb_id = res.authResponse.userID;
              var fb_token = res.authResponse.accessToken;

              // Get user infos from the API
              this.fb.api("/me?fields=name,gender,birthday,email, friends", []).then((user) => {
                  console.log(user);
                  // Get the connected user details
                  var gender    = user.gender;
                  var birthday  = user.birthday;
                  var name      = user.name;
                  var email     = user.email;

                  alert("=== USER INFOS ===");
                  alert("Gender : " + gender);
                  alert("Birthday : " + birthday);
                  alert("Name : " + name);
                  alert("Email : " + email);

                  // => Open user session and redirect to the next page
                       
              });

          } 
          // An error occurred while loging-in
          else {

                this.globals.presentToast('an error occured');

          }

      })
      .catch((e) => {
           this.globals.presentToast(e);
      });
  }

                                   

  do_instagram_login(){
   this.oauth.logInVia(this.provider).then((success) => {
                alert(JSON.stringify(success));
            }, (error) => {
                console.log(JSON.stringify(error));
            });
  }
  
  do_twitter_login(){
  var provider = new firebase.auth.TwitterAuthProvider();
  this.twitter.login()
    .then( res => {
     console.log(res)
        
    }, err => {
      this.globals.presentToast("Twitter Not Installed");
    })
    }
}             