import {NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {RecentlyPage} from '../recently/recently';
import {RoutinePage} from '../routine/routine';
import {RightnowPage} from '../rightnow/rightnow';
import {ProfilePage} from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = RightnowPage;
  tab2Root: any = HomePage;
  tab3Root: any = RecentlyPage ;
  tab4Root: any = RoutinePage ;
  tab5Root: any = ProfilePage ;
  
  mySelectedIndex: number;
  constructor(private navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
