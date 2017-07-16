
import {Injectable} from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Injectable()
export class PushConfig {

    constructor() {}

    // enablePushNotification():void {
    //   var push = Push.init({
    //      android: {
    //          senderID: "AIzaSyCIRl-k5jCCJtxzOZp2ilDwR0LRJDWQ1I0"
    //      },
    //      ios: {
    //          alert: "true",
    //          badge: true,
    //          sound: 'false'
    //      },
    //      windows: {}
    //   });
    //
    //   push.on('registration', (data) => {
    //       console.log(data.registrationId);
    //       alert(data.registrationId.toString());
    //     });
    //     push.on('notification', (data) => {
    //       console.log(data);
    //       alert("Hi, Am a push notification");
    //     });
    //     push.on('error', (e) => {
    //       console.log(e.message);
    //     });
    // }
  }
