import { Component } from '@angular/core';
import { DataService } from '../../providers/dataservice';


@Component({
  templateUrl: 'recently.html'
})
export class RecentlyPage {

  private deviceEvents: Array<any> = [];
  private queryText:string;

   constructor(private dataservice: DataService) {
     this.deviceEvents = [];
     this.queryText = '';
     this.getRecentEventList();
   }

  getRecentEventList(event?:any) {
    this.deviceEvents = [];
    if(this.queryText == ''){
      this.dataservice.getRecentEvents().subscribe(
        data => this.deviceEvents.push(data)
      );
    } else {
      this.dataservice.getFiltredRecentEventList(this.queryText).subscribe(
        data => this.deviceEvents.push(data)
      );
    }
  }

}
