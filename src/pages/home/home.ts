import {Component} from '@angular/core';
import {App, NavController, ActionSheetController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {DataService} from '../../providers/dataservice';
import {RoomDetailPage} from '../room-detail/room-detail';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  private roomList: Array<any> = [];
  private base64Image:any;

  constructor(public camera: Camera, private app: App, private nav: NavController, private dataservice: DataService, private actionSheetController:ActionSheetController) {
    this.getRoomList();
  }

  takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
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
          this.takePicture();
          //this.nav.push(RoomDetailPage);
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
