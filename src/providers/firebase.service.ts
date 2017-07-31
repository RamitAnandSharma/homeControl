import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

//http://www.instructables.com/id/Serial-Communication-and-Firebase-Data-Sending-Wit/
@Injectable()
export class FirebaseService {

  constructor(private afDB: AngularFireDatabase) {
    //this.db = new Storage(SqlStorage, {name: 'dbName'});
  }




  getAsset(assetName:string):firebase.Promise<any>{
    //https://www.youtube.com/watch?v=mSi7bNk4ySM
    // firebase.storage().ref().child(assetName).getDownloadURL().then(url => {
    //   //this.homeImage = url;
    // });
    return firebase.storage().ref().child(assetName).getDownloadURL();
  }

  updateAsset(assetName:string, asset:any):firebase.Promise<any>{
    return firebase.storage().ref().child(assetName).putString(asset, firebase.storage.StringFormat.DATA_URL);
    // firebase.storage().ref().child(assetName).putString(asset, firebase.storage.StringFormat.DATA_URL).then(snapshot => {
    //   //this.homeImage = snapshot.downloadURL;
    // });
  }

  saveAsset(assetName:string, asset:File):firebase.Promise<any>{
    return firebase.storage().ref().child(assetName).put(asset);
  }

  deleteAsset(assetStoragePath: any) {
    firebase.storage().ref().child(assetStoragePath).delete().then(
      () => {},
      (error) => console.error("Error deleting stored file",assetStoragePath)
    );
  }

  //
  // uploadWeb() {
  //   for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
  //               console.log(selectedFile);
  //               let path = `${selectedFile}`;
  //               console.log(path);
  //               path= `home.jpg`;
  //               var iRef = firebase.storage().ref().child(path);
  //               iRef.put(selectedFile).then((snapshot) => {
  //                   console.log('Uploaded a blob or file! Now storing the reference at',`/images/`);
  //                   console.log(snapshot.downloadURL);
  //                   this.homeImage = snapshot.downloadURL;
  //                   //af.database.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name })
  //               });
  //           }
  //
  // }




  // delete(image: Image) {
  //           // let storagePath = image.path;
  //           // let referencePath = `${this.folder}/images/` + image.$key;
  //           //
  //           // // Do these as two separate steps so you can still try delete ref if file no longer exists
  //           //
  //           // // Delete from Storage
  //           // firebase.storage().ref().child(storagePath).delete()
  //           // .then(
  //           //     () => {},
  //           //     (error) => console.error("Error deleting stored file",storagePath)
  //           // );
  //           //
  //           // // Delete references
  //           // this.af.database.object(referencePath).remove()
  //
  //
  //
  //       }
  // showPicture(){
  //   //https://www.youtube.com/watch?v=mSi7bNk4ySM
  //   let storageRef = firebase.storage().ref().child(`ranking.jpg`);
  //   storageRef.getDownloadURL().then(url => {
  //     console.log(url);
  //     alert(url);
  //     this.base64Image = url;
  //   });
  // }




}
