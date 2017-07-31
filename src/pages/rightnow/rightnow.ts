
import {Component} from '@angular/core';
import {MqttConfig} from '../../providers/mqttconfig';

@Component({
  templateUrl: 'rightnow.html'
})
export class RightnowPage {

  private CO2:string;
  private TEMP:string;
  private HUMIDITY:string;
  private AQ:string;

  private devices: Array<{device: string, state: string, icon:string}>;
  constructor(private mqttconfig: MqttConfig) {

  this.devices = [
    { device: 'Blinds', state: '2', icon: 'md-contract' },
    { device: 'Closet', state: '2', icon: 'ios-cube' },
    { device: 'Door & Locks', state: '1', icon: 'ios-lock' },
    { device: 'Light & Switches', state: '2', icon: 'md-outlet' },
    { device: 'TV', state: '1', icon: 'md-easel' }
    ];
  }

  ionViewLoaded() {
    console.log('hi user ionViewLoaded');
  }

  ionViewWillEnter() {
    console.log('hi user ionViewLoaded 1');
    this.mqttconfig._status().subscribe(data => {
      console.log(data);
      var dataArr = data.split('/');
      this.TEMP = dataArr[4];
      this.AQ = dataArr[5];
      this.CO2 = dataArr[6];
      this.HUMIDITY = dataArr[7];
    });


    // );

    // this.mqttconfig._status().subscribe(data => {
    //   console.log('dd');
    //   console.log(data)
    //   }
    // );

    // this.dataservice.getRoomList().subscribe(
    //   data => {
    //     this.roomList.push(data)
    //   }
    // );
  }


  homeStatus(){
    //this.mqttconfig.publishHomeDataRequestForStatus();
  }

  showHomeStatus(returnString:string){
     console.log(returnString);
  }

    // var command:string = "ev001/mbr/swb0/" + each.alias+ "/";
    // var newState:string = (each.state === 'on') ? 'off' :'on';
    // command = command + newState;
    // var result:string = command + "/status" ;
    //
    //
    // this.events.subscribe(result, () => {
    //   each.processing = false;
    //   each.state = newState;
    //   this.presentToast() ;
    //   //console.log('zzzzzzzzzzzzzzzzzz');
    //   var result= this.events.unsubscribe(result, ()=>{ console.log('ddddd')});
    //   console.log("unsubscribe result:  "+result);
    // });
    //
    // each.processing = false;
    // this.mqttconfig.publishToServer(command);
    // each.processing = false;

}
