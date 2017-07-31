import {Component} from '@angular/core';
import {App, NavController, ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {DataService} from '../../providers/dataservice';
import {RoomDetailPage} from '../room-detail/room-detail';


import { FileChooser, FilePath, File } from 'ionic-native';
//import firebase from 'firebase';
//import { AngularFire, FirebaseListObservable } from 'angularfire2';
//import { AngularFireModule  } from 'angularfire2';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { AngularFireStorage } from 'angularfire2/storage'
//import * as firebase from 'firebase/app'; // for typings
interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}

const homeImageName = `images/home.jpg`;
@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  private roomList: Array<any> = [];
  private base64Image:any;
  private homeImage:any;

  constructor(public camera: Camera, private app: App, private nav: NavController, private dataservice: DataService,
    private actionSheetController:ActionSheetController, private afDB: AngularFireDatabase
    //, private firebaseApp: FirebaseApp
  ) {
    this.getRoomList();
    this.getHomePicture();
  }


  //This method will query image from firebase and display in App
  getHomePicture(){
    //https://www.youtube.com/watch?v=mSi7bNk4ySM
    firebase.storage().ref().child(homeImageName).getDownloadURL().then(url => {
      this.homeImage = url;
    });
  }

  updateHomePicture(){
    const cameraOptions: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        quality: 50,
        targetWidth: 1000,
        targetHeight: 1000
    };
    this.camera.getPicture(cameraOptions).then((imageData) => {
        // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.uploadHomePicture(this.base64Image);
    }, (err) => {
        console.log(err);
        alert(`Upload Failed, Please Retry`);
    });
  }

  uploadHomePicture(base64Image:any) {
    firebase.storage().ref().child(homeImageName).putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then(snapshot => {
      this.homeImage = snapshot.downloadURL;
    });
  }

  uploadWeb() {
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
                console.log(selectedFile);
                let path = `${selectedFile}`;
                console.log(path);
                path= `home.jpg`;
                var iRef = firebase.storage().ref().child(path);
                iRef.put(selectedFile).then((snapshot) => {
                    console.log('Uploaded a blob or file! Now storing the reference at',`/images/`);
                    console.log(snapshot.downloadURL);
                    this.homeImage = snapshot.downloadURL;
                    //af.database.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name })
                });
            }

  }




  delete(image: Image) {
            // let storagePath = image.path;
            // let referencePath = `${this.folder}/images/` + image.$key;
            //
            // // Do these as two separate steps so you can still try delete ref if file no longer exists
            //
            // // Delete from Storage
            // firebase.storage().ref().child(storagePath).delete()
            // .then(
            //     () => {},
            //     (error) => console.error("Error deleting stored file",storagePath)
            // );
            //
            // // Delete references
            // this.af.database.object(referencePath).remove()



        }
  showPicture(){
    //https://www.youtube.com/watch?v=mSi7bNk4ySM
    let storageRef = firebase.storage().ref().child(`ranking.jpg`);
    storageRef.getDownloadURL().then(url => {
      console.log(url);
      alert(url);
      this.base64Image = url;
    });
  }



  onPageDidEnter() {
    this.app.setTitle('Home');
  }

  getRoomList() {
    this.roomList = [];
    this.dataservice.getRoomList().subscribe(
      data => {
        this.roomList.push(data)
      }
    );
  }

  goToRoomDetails(sessionData) {
    this.nav.push(RoomDetailPage, sessionData);
  }

  presentHomeActionSheet() {
  let actionSheet = this.actionSheetController.create({
    title: '',
    buttons: [
      {
        text: 'Create New Room',
        icon: 'ios-add-outline',
        handler: () => {
          console.log('Create New Room clicked');
          this.nav.push(RoomDetailPage);
        }
      },{
        text: 'Modify Home Picture',
        icon: 'ios-camera-outline',
        handler: () => {
          console.log('Create New Room clicked');
          this.updateHomePicture();
        }
      },{
        text: 'Cancel',
        icon: 'ios-backspace-outline',
        handler: () => {
          console.log('Archive clicked');
        }
      }
    ]
  });
  actionSheet.present(actionSheet);
  }


}
