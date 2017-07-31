
import {Component, ViewChild} from '@angular/core';
import { Push, PushToken } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';

import { Authentication, MqttConfig } from '../providers/';
import { LoginPage, RecentlyPage, RoutinePage, HomePage, ProfilePage, RightnowPage, TabsPage } from '../pages/';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}




@Component({
  templateUrl: 'app.html'
})
export class SmartHomeApp {

  private root: any;
  private appPages: Array<PageInterface>;
  private loggedInPages: Array<PageInterface>;
  private loggedOutPages: Array<PageInterface>;

  @ViewChild(Nav) nav: Nav;
  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private events: Events,
    private menu: MenuController, private authentication: Authentication,
    private storage: Storage, private mqttconfig: MqttConfig, //, private pushconfig: PushConfig
    public push: Push
     ) {
       // Check if the user has already seen the tutorial
    // this.storage.get('hasSeenTutorial')
    //   .then((hasSeenTutorial) => {
    //     if (hasSeenTutorial) {
    //       //this.rootPage = TabsPage;
    //     } else {
    //       //this.rootPage = TutorialPage;
    //     }
    //
    //
    //     // decide which menu items should be hidden by current login status stored in local storage
    //     // this.authentication.hasLoggedIn().then((hasLoggedIn) => {
    //     //   this.enableMenu(hasLoggedIn === true);
    //     // });
    //   })
      this.initializeApp();
  }


  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      //this.pushconfig.enablePushNotification();
      this.listenToMQTTEvents();
      this.mqttconfig.enableMqtt();
      // this.registerToken();
      // this.getNotifications();
      //this.storage.ready().then(() => { });


      this.checkPreviousAuthorization();
      this.listenToLoginEvents();
    });
    this.configureMenu();
  }

  private configureMenu(): void {
    this.appPages = [
      { title: 'Right Now', component: TabsPage, tabComponent:RightnowPage, icon: 'ios-planet-outline' },
      { title: 'Home', component: TabsPage, tabComponent:HomePage,  icon: 'ios-home-outline', index: 1 },
      { title: 'Recently', component: TabsPage, tabComponent:RecentlyPage, icon: 'ios-timer-outline', index: 2 },
      { title: 'Routine', component: TabsPage, tabComponent:RoutinePage, icon: 'ios-flash-outline', index: 3 },
      { title: 'Profile', component: TabsPage, tabComponent:ProfilePage, icon: 'ios-contact-outline', index: 4 }
    ];
    this.loggedInPages = [
      { title: 'Logout', component: TabsPage, icon: 'ios-log-out-outline', logsOut: true}
    ];
    this.loggedOutPages = [
      { title: 'Login', component: LoginPage, icon: 'ios-log-in-outline' }
      //,{ title: 'Signup', component: SignupPage, icon: 'ios-person-add-outline' }
    ]
  }
  public openPage(page: any): void {
    // close the menu when clicking a link from the menu
    this.menu.close();
     // find the nav component and set what the root page should be reset the nav to remove previous pages and only have this page we wouldn't want the back button to show in this scenario
    if (page.index) { this.nav.setRoot(page.component, {tabIndex: page.index}); } else { this.nav.setRoot(page.component); }
    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //this.registerPush();
      setTimeout(() => {
        this.deregisterToken();
        this.authentication.logout();
        //this.checkPreviousAuthorization();
      }, 1000);
    } else {
      // this.registerToken();
      // this.getNotifications();
    }
    //  if (page.title === 'Logout') {
    //    // Give the menu time to close before changing to logged out
    //   // setTimeout(() => {
    //      this.authentication.logout();
    //      this.checkPreviousAuthorization();
    //    //}, 1000);
    //  }
  }
  // // decide which menu items should be hidden by current login status stored in local storage
  //     // this.authentication.hasLoggedIn().then((hasLoggedIn) => {
  //     //   this.enableMenu(hasLoggedIn == 'true');
  //     // });
  //
  //
  checkPreviousAuthorization():void {
    this.authentication.getUser().then((value) => {
      if( (typeof value === 'undefined') || (value === "undefined") || (value === null)) {
        this.root = LoginPage;
      } else {
        //this.deregisterPush();
        this.authentication.setUsername(value);
        this.root = TabsPage;
      }

      this.registerToken();
      this.getNotifications();

    });
  }

  listenToMQTTEvents():void {
    this.events.subscribe('homeStatus', (message) => {
      console.log(message);
    });
  }

  listenToLoginEvents():void {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });
    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });
    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }
  enableMenu(loggedIn):void {
    this.menu.enable(loggedIn, "loggedInMenu");
    this.menu.enable(!loggedIn, "loggedOutMenu");
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

//https://devdactic.com/ionic-push-notifications-guide/
  private registerToken(){
     this.push.register().then((t: PushToken) => {
       return this.push.saveToken(t,{
         ignore_user: true
       });
      //return this.push.saveToken(t);
     }).then((t: PushToken) =>  this.getNotifications() );
   }

   private getNotifications(){
     this.push.rx.notification()
     .subscribe((msg) => {
       alert(msg.title + ': ' + msg.text);
     });
   }



  deregisterToken(){
    this.push.unregister();

    //this.push.rx.notification().
  }





  // openTutorial() {
  //   //this.nav.setRoot(TutorialPage);
  // }

  // deregisterPush1(){
  //   this.push.register().then((t: PushToken) => {
  //     return this.push.saveToken(t);
  //   }).then((t: PushToken) => {
  //     console.log('Token saved:', t.token);
  //   });
  // }
  //
  //
  // registerPush1() {
  //     // Check that we are on a device
  //   if (this.platform.is('cordova')) {
  //       // Register push notifications with the push plugin
  //     this.push.register()
  //     .then((t: PushToken) => {
  //       console.log('Generated Token' + JSON.stringify(t));
  //       // Save the user with Ionic's user auth service
  //       return this.push.saveToken(t);
  //     })
  //     .then( (t: PushToken) => {
  //       console.log('Token Saved', t);
  //       this.listenForPush();
  //     }).catch( (err) => {
  //       console.log('Error Saving Token: ' , err);
  //     });
  //    }
  // }
  //
  // listenForPush() {
  //   this.push.rx.notification().subscribe((msg) => {
  //     alert(msg.title + ': ' + msg.text);
  //   });
  // }

}
