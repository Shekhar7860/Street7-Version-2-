import { Component } from '@angular/core';
import { NavController , App , LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { OpenPostPage } from '../open-post/open-post';
import { GroupsPage } from '../groups/groups';
import { RestProvider } from '../../providers/rest/rest';        
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  isLoggedIn: boolean = false;
  // You can get this data from your API. This is a dumb data for being an example.
  public stories = [
    {
      id: 1,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'candelibas'
    },
    {
      id: 2,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'maxlynch'
    },
    {
      id: 3,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'ashleyosama'
    },
    {
      id: 4,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'adam_bradley'
    },
    {
      id: 5,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 6,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 6,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 7,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 8,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 9,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 10,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
        {
      id: 11,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 12,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 13,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    }
    ,    {
      id: 14,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 15,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 16,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
         {
      id: 17,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 18,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 19,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    }
    ,    {
      id: 20,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 21,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    },
    {
      id: 22,
      img: 'https://source.unsplash.com/120x120',
      user_name: 'linus_torvalds'
    }
    
    
  ];

  public categories = [
    {
      id: 1,
      img: 'https://source.unsplash.com/100x60',
      category_name: 'For You'
    },
    {
      id: 2,
      img: 'https://source.unsplash.com/100x60',
      category_name: 'Style'
    },
    {
      id: 3,
      img: 'https://source.unsplash.com/100x60',
      category_name: 'Fitness'
    },
    {
      id: 4,
      img: 'https://source.unsplash.com/100x60',
      category_name: 'Beautfy'
    },
    {
      id: 5,
      img: 'https://source.unsplash.com/100x60',
      category_name: 'Property'
    }
  ];

  public posts = [
    {
      id: 1,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'For You'
    },
    {
      id: 2,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Style'
    },
    {
      id: 3,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Fitness'
    },
    {
      id: 4,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Beautfy'
    },
    {
      id: 5,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Property'
    },
    {
      id: 6,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Property'
    },
    {
      id: 6,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Property'
    },
    {
      id: 6,
      post_image: 'https://source.unsplash.com/160x150',
      post_title: 'Property'
    }
  ];

  
  constructor(public app: App, public rest_call: RestProvider, public navCtrl: NavController, public authService: AuthServiceProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    // if(!localStorage.getItem("user_id")) {
      // // navCtrl.setRoot(LoginPage);
      // this.app.getRootNav().push(LoginPage);
      
    // }
    // if(localStorage.getItem("user_id")) {
      // this.isLoggedIn = true;
    // }
                             
  }

  ionViewDidLoad() {
    this.rest_call.getPosts().then((result) => {
      console.log(result);
      this.posts = result.data;
      }, (err) => {
      console.log(err);
      //  this.globals.loading.dismiss();
      });
  }                     
  logout() {
    this.showLoader();
    this.authService.logout().then((result) => {
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
    this.loading.present();
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  openPostPage(post_id){
    this.app.getRootNav().push(OpenPostPage);
  }
  openMyGroups(){
    this.app.getRootNav().push(GroupsPage);
  }
}
