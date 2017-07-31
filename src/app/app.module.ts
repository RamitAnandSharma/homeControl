import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//https://github.com/angular/angularfire2/blob/master/docs/Auth-with-Ionic3-Angular4.md
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SmartHomeApp } from './app.component';
import { LoginPage, ModifyRoutineDetailPage, RecentlyPage, RoutinePage, RoutineDetailPage, SVGElement,
   HomePage, ProfilePage, RightnowPage, RoomDetailPage, TabsPage } from '../pages/';
import { Authentication, DataService, Persistence, MqttConfig, FirebaseService } from '../providers/';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

//https://www.ion-book.com/blog/ionic2/ionic-push-notifications/
//https://www.ion-book.com/blog/ionic2/ionic-push-notifications/
//https://devdactic.com/ionic-2-push-notifications/
//https://devdactic.com/ionic-2-push-notifications/
const cloudSettings: CloudSettings = {
  'core': {
      'app_id': 'fa62f54a',
    },
    'push': {
      'sender_id': '512486982322',
      'pluginConfig': {
        'ios': {
          'badge': true,
          'sound': true
        },
        'android': {
          'iconColor': '#343434'
        }
      }
    }
  };
  // import firebase from 'firebase';
  //   // Initialize Firebase
  //     var config = {
  //       apiKey: "AIzaSyB7qM4gts4trA_KIodCZmL7Y-VRbKo2VAQ",
  //       authDomain: "smarthome-60bd4.firebaseapp.com",
  //       databaseURL: "https://smarthome-60bd4.firebaseio.com",
  //       projectId: "smarthome-60bd4",
  //       storageBucket: "smarthome-60bd4.appspot.com",
  //       messagingSenderId: "512486982322"
  //     };

  export const firebaseConfig = {
    apiKey: "AIzaSyB7qM4gts4trA_KIodCZmL7Y-VRbKo2VAQ",
    authDomain: "smarthome-60bd4.firebaseapp.com",
    databaseURL: "https://smarthome-60bd4.firebaseio.com",
    projectId: "smarthome-60bd4",
    storageBucket: "smarthome-60bd4.appspot.com",
    messagingSenderId: "512486982322"
  };

@NgModule({
  declarations: [
    SmartHomeApp,
    HomePage,
    LoginPage,
    ModifyRoutineDetailPage,
    ProfilePage,
    RecentlyPage,
    RightnowPage,
    RoomDetailPage,
    RoutinePage,
    RoutineDetailPage,
    TabsPage,
    SVGElement,
    ParallaxHeader
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SmartHomeApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SmartHomeApp,
    HomePage,
    LoginPage,
    ModifyRoutineDetailPage,
    ProfilePage,
    RecentlyPage,
    RightnowPage,
    RoomDetailPage,
    RoutinePage,
    RoutineDetailPage,
    TabsPage,
    SVGElement
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Authentication,
    DataService,
    Persistence,
    MqttConfig,
    FirebaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
