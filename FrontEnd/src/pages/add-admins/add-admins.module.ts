import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAdminsPage } from './add-admins';

@NgModule({
  declarations: [
    AddAdminsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAdminsPage),
  ],
})
export class AddAdminsPageModule {}
