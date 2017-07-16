import {NavController, NavParams, Events,ToastController} from 'ionic-angular';
import {Component} from '@angular/core';
import {DataService} from '../../providers/dataservice';
import {MqttConfig} from '../../providers/mqttconfig';
import {DimmerPage} from '../dimmer/dimmer';

import {Device} from '../../entity/interface';

@Component({
  templateUrl: 'room-detail.html'
})
export class RoomDetailPage {

  private sessionparam:any;
  private sessions:any;
  private segment:string = "all";
  //private showDelete:boolean = false;

  private shownSessions:number = 0;
  private dayIndex:any;
  private queryText:string;
  private excludeTracks:any;
  private deviceList=[];
  constructor( private nav:NavController, private dataservice: DataService, private navParams:NavParams,
     private mqttconfig: MqttConfig, private events: Events, private toastController:ToastController) {
     this.sessionparam = navParams.data;
     this.segment = "devices";
     this.getDeviceList();
   }

    roomid:string;
    getDeviceList() {
      this.roomid = this.navParams.get("roomid");
      console.log(this.roomid);
      this.dataservice.getRoomDevices("").subscribe(
        data => {
          this.deviceList.push(data);
        }
      );

      this.mqttconfig._status().subscribe(data => {
        var dataArr = data.split('/');
        this.deviceList[0].state = dataArr[8];
        this.deviceList[0].state = dataArr[9];
        this.deviceList[0].state = dataArr[10];
        this.deviceList[0].state = dataArr[11];
      });
    }


  recentActivity() {
    this.dataservice.getRoomRecentEvents(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
      this.shownSessions = 3;
      this.sessions = data;
    });
  }


  showKnob(event,each) {
     this.nav.push(DimmerPage);
  }

  presentToast() {
    let toast = this.toastController.create({
      message: 'Device Operation successful',
      duration: 3000
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present(toast);
  }

  presentLoadingDefault(event, each) {
    if(!each.online){
      return false;
    }
    each.processing = true;
    var command:string;
    if(this.roomid == "1"){
      command = "ev001/mbr/swb0/" + each.alias+ "/";
    } else if(this.roomid == "2"){
      command = "ev001/br/swb0/" + each.alias+ "/";
    } else {
      command = "ev001/mbr/swb0/" + each.alias+ "/";
    }

    var newState:string = (each.state === 'on') ? 'off' :'on';
    command = command + newState;
    //var result:string = command + "/status" ;

    // this.events.subscribe(result, () => {
    //   each.processing = true;
    //   each.state = newState;
    //   this.presentToast() ;
    //   console.log('zzzzzzzzzzzzzzzzzz');
    //
    //   var result= this.events.unsubscribe(result, ()=>{ console.log('ddddd')});
    //
    //   console.log("unsubscribe result:  "+result);
    //   each.processing = false;
    // });


    this.mqttconfig.publishToServer(command);
    this.presentToast() ;
    each.state = newState;
    each.processing = false;
    // each.processing = false;
    // each.state = newState;
    // this.presentToast() ;


  //this.events.subscribe(result, () => {

  // return new Promise(resolve => {
  //   this.events.subscribe(result, this.onSubscribeTrigger(each, result));
  // });
  }


    //this.mqttconfig.subscripe("ev001/mbr/swb0/light/on");

    //mqttconfig.
    // let loading = Loading.create({
    //   content: 'Please wait....    Device ON/OFF Operation '
    // });
    // this.nav.present(loading);
    // setTimeout(() => {
    //   each.active = !each.active;
    //   each.processing = false;
    //   loading.dismiss();
    // }, 3000);
    // each.processing = true;

}
