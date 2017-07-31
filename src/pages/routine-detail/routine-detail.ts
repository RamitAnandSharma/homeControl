import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from '../../providers/dataservice';

@Component({
  templateUrl: 'routine-detail.html'
})
export class RoutineDetailPage {

  private selectedList: Array<any> = [];
  private segment:string = "all";
  private showDelete:boolean = false;
  private roomList: Array<any> = [];

  constructor(private nav:NavController, private dataservice:DataService) {
    this.roomList = [];
    this.selectedList = [];
    this.segment = "devices";
    this.showDelete=true;

    this.getRoomList();
  }

  deleteRoutine(event) {
    this.showDelete=false;
  }
  cancelRoutineDelete(event) {
    this.showDelete=true;
  }

  goToRoomDetails(){
      this.nav.push(RoutineDetailPage);
  }
  //Using Rxjs
  getRoomList() {
    this.dataservice.getRoomList().subscribe(
      data => {
        this.roomList.push(data)
      }
    );
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
    }
    return false;
  }

  roomSelect(rooms) {
    this.selectedList=[];
    for(var index= 0; index < rooms.length; index++){
      if( this.containsObject(rooms[index], this.roomList)){
        this.selectedList = [...this.selectedList, rooms[index]];
      }else{
        this.selectedList = this.selectedList.filter(function(elem){
          return elem != rooms[index];
        })
      }
    }
  }


}
