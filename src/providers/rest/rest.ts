import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://demo.aarvitechnolabs.com/street7-api/api';
@Injectable()
export class RestProvider {
 user: Observable<firebase.User>;
  constructor(public http: HttpClient, private afAuth: AngularFireAuth) {
    console.log('Hello RestProvider Provider');
  }                       
     
  /* user manage apis */
  login(credentials) {
     return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
         headers.append('Content-Type', 'application/json');
        var frm_data = new FormData();
        frm_data.append("user_email",credentials.user_email);
        frm_data.append("user_password",credentials.user_password);
        this.http.post(apiUrl+'/user_login.php', frm_data, {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }
  user_update(regData, signup, photo, del, update) {
    
  console.log(regData);
  console.log('photo', photo)
    return new Promise((resolve, reject) => {
     
       let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        var frm_data = new FormData();

        frm_data.append('user_name', regData.user_name);
        frm_data.append('user_mobilenumber', regData.user_mobilenumber);
        frm_data.append('user_email', regData.user_email);
        frm_data.append('user_password', regData.user_password);
        frm_data.append('confirmpassword', regData.confirmpassword);
        frm_data.append('insert', signup);
        frm_data.append('edit', update);
        frm_data.append('delete', del);
        frm_data.append('base64_user_profile_pic', photo);
        console.log('userData', frm_data)
        this.http.post(apiUrl+'/user_update.php', frm_data, {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
   
    });
  }                    

  getPosts () {
    return new Promise((resolve, reject) => {
      
      var frm_data = new FormData();

      frm_data.append('post_user_id', '52');
      frm_data.append('post_category', 'style');
      this.http.post(apiUrl+'/get_posts.php', frm_data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
  });
  }

  logout(){
    return new Promise((resolve, reject) => {
        let headers = new HttpHeaders();
        headers.append('X-Auth-Token', localStorage.getItem('token'));

        this.http.post(apiUrl+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
    });
  }


validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    conole.log('email', re.test(String(email).toLowerCase()))
}
}
