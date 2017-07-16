import {Component} from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {Authentication} from '../../providers/authentication';


@Component({
  templateUrl: 'login.html'
})

export class LoginPage {

  private login: {username?: string, password?: string} = {};
  private submitted:boolean;
  constructor(private nav: NavController, private authentication: Authentication, private alertController:AlertController
    ) {
    this.login = {username:'Anurag', password:'password'};
    this.submitted = false;
  }

  onLogin(form) {
    this.submitted = true;
    if (form.valid) { 
      this.authentication.validateCredentials(form.value.username, form.value.password)
      .then((data)=> {
          this.nav.push(TabsPage);
          this.submitted = false;
      })
      .catch( err => {
          let alert = this.alertController.create({
            subTitle: err.message,
            buttons: ['OK']
          });
          alert.present(alert);
          this.submitted = false;
      });
    }
  }

}
