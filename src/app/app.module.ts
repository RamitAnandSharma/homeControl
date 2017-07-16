import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';

import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SmartHomeApp } from './app.component';
import { LoginPage, ModifyRoutineDetailPage, RecentlyPage, RoutinePage, RoutineDetailPage, SVGElement,
   HomePage, ProfilePage, RightnowPage, RoomDetailPage, TabsPage } from '../pages/';
import { Authentication, DataService, Persistence, MqttConfig } from '../providers/';
import { ParallaxHeader } from '../components/parallax-header/parallax-header';

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
    IonicStorageModule.forRoot()
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
    DataService, Persistence,
    MqttConfig,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
