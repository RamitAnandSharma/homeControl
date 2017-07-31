import {Component} from '@angular/core';
import {App, NavController, ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {DataService, FirebaseService } from '../../providers/';
import {RoomDetailPage} from '../room-detail/room-detail';

import { FileChooser, FilePath, File } from 'ionic-native';

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

  constructor(public camera: Camera, private app: App, private nav: NavController, private dataservice: DataService, private actionSheetController: ActionSheetController, private firebaseService: FirebaseService ) {
    this.getRoomList();
    this.getHomePicture();
  }

  getHomePicture(){
    this.firebaseService.getAsset(homeImageName).then(url => {
      this.homeImage = url;
    });
  }

  /**
  This Method allows user to Click Picture ->  Once Picture is clicked its uplaaded to Firebase. and replaces the existing Home Picture
  **/
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
          this.firebaseService.updateAsset(homeImageName, this.base64Image).then(snapshot => {
            this.homeImage = snapshot.downloadURL;
          });
    }, (err) => {
        console.log(err);
        alert(`Upload Failed, Please Retry`);
    });
  }



  // uploadWeb() {
  //   for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
  //       let path = `${selectedFile}`;
  //       path= `home.jpg`;
  //       console.log(path);
  //       console.log(selectedFile);
  //       this.firebaseService.saveAsset(path, selectedFile).then(snapshot => {
  //         this.homeImage = snapshot.downloadURL;
  //       });
  //   }
  // }






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
        { text: 'Create New Room', icon: 'ios-add-outline', handler: () => { this.nav.push(RoomDetailPage); } },
        { text: 'Modify Home Picture', icon: 'ios-camera-outline', handler: () => this.updateHomePicture() },
        { text: 'Cancel', icon: 'ios-backspace-outline',   handler: () => { } }
      ]
    });
    actionSheet.present(actionSheet);
  }


}
