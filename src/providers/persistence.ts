import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Persistence {

  constructor(private storage: Storage) {
    //this.db = new Storage(SqlStorage, {name: 'dbName'});
  }

  query():void{

  }
  put(key, value):void{
    this.storage.set(key, value);
  }
  get(key):any{
    this.storage.get(key);
  }
  delete(key):void{
    this.storage.remove(key);
  }
  clear():void{
    this.storage.clear();
  }

  getUser():any {
    return this.storage.get('username');
		// return new Promise(resolve => {
    //   return this.db.get('username').then((value) => {
    //   // console.log(typeof value);
    //   // console.log(typeof value === 'undefined');
    //   // console.log(value);
    //   // console.log(value === "undefined");
    //       	resolve(value);
    //   });
		// });
	}



}
