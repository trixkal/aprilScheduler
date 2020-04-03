import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private auth: AuthenticationService) {
    this.doLogin();
  }

  doLogin() {
    this.auth.login();
    // this.route.navigateByUrl(`/tabs/tab1`);
  }
}
