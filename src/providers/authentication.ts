import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Persistence } from './persistence';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class Authentication {

    private HAS_LOGGED_IN:string;
    private username:string;
    private contentHeader:Headers;
    constructor(private events:Events, private http: Http, private persistence: Persistence) {
        this.HAS_LOGGED_IN = 'hasLoggedIn';
        this.username = '';
        this.contentHeader = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    }

    getUsername():string {
      return this.username;
    }
    setUsername(username:string) {
      return this.username = username;
    }
    validateCredentials(username, password) {
        return new Promise((resolve, reject) => {
          if (!username.trim() || !password.trim()) {
            const error = new Error('An username and password must be provided')
            reject(error)
            return
          }
            // firebase.auth().signInWithEmailAndPassword(username, password).then(( data) =>{
            //   this.events.publish('user:login');
            //   this.persistence.put(this.HAS_LOGGED_IN, true);
            //   this.persistence.put('username', username);
            //   this.username = username;
            //   resolve(data);
            // }).catch(()=>{
            //   var err =  { message : "Invalid Username And Password"};
            //   reject(err);
            // })



        //var creds = "username=" + username + "&password=" + password;
          // let options = new RequestOptions({
          //     headers: this.contentHeader
          // });

      		this.http.get('assets/data/data.json')
        		.map(response => response.json())
        		.map(response =>response.user)
            .subscribe(
                    data => {
                      data.forEach(user => {
                        if (user.username.toLowerCase() === username.toLowerCase() && user.password  === password) {
                          this.events.publish('user:login');
                          this.persistence.put(this.HAS_LOGGED_IN, true);
                          this.persistence.put('username', user.username);
                          this.username = user.username;
                          resolve(data);
                        }
                      });
                      var err =  { message : "Invalid Username And Password"};
                      reject(err);
                });

          // this.http.post(LOGIN_URL, creds, options)
          //     .map(res => res.json())
          //     .subscribe(
          //         data => {
          //             this.events.publish('user:login');
          //             this.persistence.put(this.HAS_LOGGED_IN, true);
                        //this.persistence.put('username', user.username);
          //             this.username = data.username;
          //             resolve(data);
          //         },
          //         err => {
          //           var response = err.json();
          //           reject(response);
          //         }
          //     );
        });
    }


    logout():void {
        //this.storage.remove(this.HAS_LOGGED_IN);
        //this.storage.remove('username');
        this.persistence.clear();
        this.events.publish('user:logout');
        // this.nav.popToRoot();
    }

    // return a promise
    hasLoggedIn():any {
        return this.persistence.get(this.HAS_LOGGED_IN).then((value) => {
            return value;
        });
    }

    getUser():any {
  		return this.persistence.getUser();
  	}

    handleError(error) {
        console.error("Application error::  " + error);
        return Observable.throw(error.json().error || 'Server error');
    }
    // checkCredentials_Json(username, password) {
    //   var body = JSON.stringify({ username: 'admin', password:'password' });
    //   var headers = new Headers({'Content-Type': 'application/json'});
    //   let options = new RequestOptions({ headers: headers });
    //   return this.http.post(LOGIN_URL, body, options)
    //       .map(res=>res.json());
    // }



    // checkCredentials_other(username, password) {
    //   var creds = "username=" + username + "&password=" + password;
    //   let options = new RequestOptions({ headers: this.contentHeader });
    //   return this.http.post(LOGIN_URL, creds, options)
    //       .map(res=>res.json());
    // }


    // signup(username, password) {
    //   this.storage.set(this.HAS_LOGGED_IN, true);
    //   this.events.publish('user:signup');
    // }


}
