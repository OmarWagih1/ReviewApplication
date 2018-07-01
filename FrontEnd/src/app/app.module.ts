import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http'
import { HomePage } from '../pages/home/home';
import { HideHeaderDirective } from '../directives/headerscroll/headerscroll';
import { AddBusinessPage } from '../pages/add-business/add-business';
import {RestaurantPage} from '../pages/restaurant/restaurant';
import { ReviewPage } from '../pages/review/review';
import { CommentsPage } from '../pages/comments/comments';
import { LoginsPage } from '../pages/logins/logins';
import { RegisterPage } from '../pages/register/register';
import { ListPage } from '../pages/list/list';
import { ElasticModule } from 'angular2-elastic';
import { AdminPage } from '../pages/admin/admin';
import { RequestsPage } from '../pages/requests/requests';
import { StatisticsPage } from '../pages/statistics/statistics';
import { AddOwnersPage } from '../pages/add-owners/add-owners';
import { AddAdminsPage } from '../pages/add-admins/add-admins';
import { AddMenusPage } from '../pages/add-menus/add-menus';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  // ANY component/page/directive you make you HAVE to include it in the declarations AND up in the imports
  declarations: [
    MyApp,
    HomePage,
    HideHeaderDirective,
    AddOwnersPage,
    AddMenusPage,
    AddAdminsPage,
    StatisticsPage,
    RequestsPage,
    AddBusinessPage,
    RestaurantPage,
    ReviewPage,
    ListPage,
    CommentsPage,
    LoginsPage,
    RegisterPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    ElasticModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  // Same here for pages (i think)
  entryComponents: [
    MyApp,
    HomePage,
    AddBusinessPage,
    RestaurantPage,
    AddMenusPage,
    ReviewPage,
    ListPage,
    AdminPage,
    CommentsPage,
    LoginsPage,
    RegisterPage,
    AddOwnersPage,
    AddAdminsPage,
    StatisticsPage,
    RequestsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
IonicModule.forRoot(MyApp, { animate: false })