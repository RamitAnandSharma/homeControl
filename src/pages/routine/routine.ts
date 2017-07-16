import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RoutineDetailPage} from '../routine-detail/routine-detail';
//import {ModifyRoutineDetailPage} from '../modify-routine-detail/modify-routine-detail';

@Component({
  templateUrl: 'routine.html'
})
export class RoutinePage {

  private nightmodeActive:boolean = false;
  constructor(private nav:NavController) {
    this.nightmodeActive = false;
  }


  presentLoadingDefault(event) {
    this.nightmodeActive = !this.nightmodeActive;
  }


  showRoutineDetails(event) {
    // go to the room detail page
    // and pass in the session data
    //this.nav.push(RoomDetailPage, sessionData);
    this.nav.push(RoutineDetailPage);
    //this.nightmodeActive = !this.nightmodeActive;
  }
  addNewRoutine(event) {
    // go to the room detail page
    // and pass in the session data
    //this.nav.push(RoomDetailPage, sessionData);
    this.nav.push(RoutineDetailPage);// ModifyRoutineDetailPage
    //this.nightmodeActive = !this.nightmodeActive;
  }


}
