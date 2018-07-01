import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBusinessPage } from './add-business';

@NgModule({
  declarations: [
    AddBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBusinessPage),
  ],
})
export class AddBusinessPageModule {}
