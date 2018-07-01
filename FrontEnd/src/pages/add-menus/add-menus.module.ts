import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMenusPage } from './add-menus';

@NgModule({
  declarations: [
    AddMenusPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMenusPage),
  ],
})
export class AddMenusPageModule {}
