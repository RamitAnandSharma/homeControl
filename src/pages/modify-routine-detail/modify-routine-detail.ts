import {Component} from '@angular/core';
import {DataService} from '../../providers/dataservice';

@Component({
  templateUrl: 'modify-routine-detail.html'
})
export class ModifyRoutineDetailPage {
  private selectedList: Array<any> = [];
  private segment:string = "all";

  private showDelete:boolean = false;
  private roomList: Array<any> = [];

  constructor(private dataservice: DataService) {
    this.roomList = [];
    this.selectedList = [];
    this.segment = "devices";
    this.showDelete=true;

    this.getRoomList();
  }



    deleteRoutine(event) {
      this.showDelete=false;

    }
    editRoutineDelete(event) {
      this.showDelete=true;

    }
    saveRoutineDelete(event) {


    }
    cancelRoutineDelete(event) {
      this.showDelete=true;

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
