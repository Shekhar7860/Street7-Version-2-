import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { TwitterConnect } from '@ionic-native/twitter-connect';
import { MyApp } from './app.component';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { HomePage } from '../pages/home/home';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpClientModule } from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TabsPage } from "../pages/tabs/tabs";
import { InboxPage } from '../pages/inbox/inbox';
import { NewPostPage } from '../pages/new-post/new-post';
import { ChatPage } from '../pages/chat/chat';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
 import { Camera, CameraOptions } from '@ionic-native/camera';                 
import { OpenPostPage } from '../pages/open-post/open-post';
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { GroupsPage } from "../pages/groups/groups";
import { GroupDetailPage } from "../pages/group-detail/group-detail";
import { Network } from '@ionic-native/network';
import { InviteTeammatesPage } from '../pages/invite-teammates/invite-teammates';
import { Contact, Contacts } from '@ionic-native/contacts';
import { SettingsPage } from '../pages/settings/settings';
import { CreateGroupPage } from '../pages/create-group/create-group';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { InviteToStreet7Page } from '../pages/invite-to-street7/invite-to-street7';
import { RestProvider } from '../providers/rest/rest';
import { GlobalsProvider } from '../providers/globals/globals';
                

const firebaseConfig = {
    apiKey: "AIzaSyCzJL6qhSQYE6OSRlOuZW77j4cruxUFQRs",
    authDomain: "ionic2-8b379.firebaseapp.com",
    databaseURL: "https://ionic2-8b379.firebaseio.com",
    projectId: "ionic2-8b379",
    storageBucket: "ionic2-8b379.appspot.com",
    messagingSenderId: "454166531047"
}                      

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    LoginPage,
    RegisterPage,
    NewPostPage,
    NotificationsPage,
    ProfilePage,
    InboxPage,
    OpenPostPage,
    GroupsPage,
    GroupDetailPage,
    InviteTeammatesPage,
    SettingsPage,
    CreateGroupPage,
    EditProfilePage,
    InviteToStreet7Page,
	ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
	 AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule,
	 AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    TabsPage,
    NewPostPage,
    NotificationsPage,
    ProfilePage,
    InboxPage,
    OpenPostPage,
    GroupsPage,
    GroupDetailPage,
    InviteTeammatesPage,
    SettingsPage,
    CreateGroupPage,
    EditProfilePage,
    InviteToStreet7Page,
	ChatPage, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Facebook,
    Network,
    Contact,
    Contacts,
    RestProvider,
    SocialSharing,
    GlobalsProvider,
    TwitterConnect,
    Camera,
    InAppBrowser,  
    Push,
    FileTransfer
  ]
})
export class AppModule { }
