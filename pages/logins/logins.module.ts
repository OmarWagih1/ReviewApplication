import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginsPage } from './logins';

@NgModule({
  declarations: [
    LoginsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginsPage),
  ],
})
export class LoginsPageModule {}
