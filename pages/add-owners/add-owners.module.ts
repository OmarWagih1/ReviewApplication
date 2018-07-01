import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOwnersPage } from './add-owners';

@NgModule({
  declarations: [
    AddOwnersPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOwnersPage),
  ],
})
export class AddOwnersPageModule {}
