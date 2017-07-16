
import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
//import {Observable} from 'rxjs/Observable';
//import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

var client: any;
declare var Paho: any;

@Injectable()
export class MqttConfig {

//https://www.eclipse.org/forums/index.php/t/1066543/
// https://github.com/eclipse/paho.mqtt.javascript/blob/master/utility/utility.js
// https://github.com/eclipse/paho.mqtt.javascript/issues
// https://eclipse.org/paho/clients/js/
//http://www.eclipse.org/paho/clients/js/utility/

    private topic:string;
    private subject: Subject<string>;
  //  private _statusObserver1;
    constructor(private events: Events) {
      this.subject = new Subject<string>();
      this.topic = "testtopic/67" ;
    }

    enableMqtt() {
        client = new Paho.MQTT.Client("ws://iot.eclipse.org/ws", "myClientId" + new Date().getTime());
        // set callback handlers
        client.onConnectionLost = this.onConnectionLost;
        client.onMessageArrived = this.onMessageArrived.bind(this);
        // connect the client
        client.connect({
            onSuccess: this.onConnect.bind(this)
        });
    };

    onConnectionLost(responseObject) {
      //console.log("error");
        if (responseObject.errorCode !== 0)
            console.log("onConnectionLost:" + responseObject.errorMessage);
    };
    onConnect() {
      client.subscribe(this.topic);
      this.publishRequest4HomeStatus();
      setTimeout(() => {
        this.publishRequest4HomeStatus();
      }, 600000);
    };
    _status() {
      return this.subject;
    }

    onMessageArrived(response) {
      var message = response.payloadString;
      console.log(message);
      if (message.indexOf("ev001/status/home/mbr/") > -1) {
        this.events.publish("homeStatus",message);
        //this._statusObserver1 = message;
        this.subject.next(message);
      } else if (message.indexOf("ok") > -1) {
          var result = message.substring(0, message.lastIndexOf("/"));
          this.events.publish(result + "/status");
      }
    };

    publishRequest4HomeStatus() {
      //console.log('before message send ');
      var message = new Paho.MQTT.Message("ev001/status/home/mbr");
      message.destinationName = this.topic;
      client.send(message);
    //  console.log('after message send ');
    };

    publishToServer(command) {
      //  console.log("command::  "+command);
        //this.subscribeToServer();
        var message = new Paho.MQTT.Message(command);
        message.destinationName = this.topic;
        client.send(message);
    };
}
