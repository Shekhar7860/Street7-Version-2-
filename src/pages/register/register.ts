import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { GlobalsProvider } from '../../providers/globals/globals';
import { AngularFireDatabase } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})                 
export class RegisterPage {
 userPic : any = "assets/imgs/frame.png";;
 photo : any;
   const options: CameraOptions = {
  quality: 100,
  PictureSourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}
  newPhoto : any ;
  loading: any;
  selectedimage : any;
  regData = { 
    'user_name' : '',
    'user_mobilenumber' : '',
    'user_email' : '',
    'user_password' : '',
    'confirmpassword' : ''
  };
  response :any;
                                   
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest_call: RestProvider, public globals: GlobalsProvider, public db : AngularFireDatabase, private camera: Camera, public actionSheetCtrl:ActionSheetController) {}

  doSignup() {
  if(this.regData.user_name && this.regData.user_mobilenumber && this.regData.user_email && this.regData.user_password && this.regData.confirmpassword)
  {
	if(this.regData.user_password == this.regData.confirmpassword)
	{
  //  this.globals.showLoader('Registering...');
	   console.log(this.regData)
    this.rest_call.user_update(this.regData, 1, this.selectedimage, 0, 0).then((result) => {
               
	  console.log(result);
	//  this.globals.loading.dismiss();
	 // this.globals.presentToast("User Created Successfully");
	 // this.navCtrl.pop();
      // this.loading.dismiss();
      // this.response = result;
      // this.navCtrl.pop();
    }, (err) => {
		console.log(err);
    //  this.globals.loading.dismiss();
      this.globals.presentToast(JSON.stringify(err));
    });
  }
  else
  {
  this.globals.presentToast("Password and Confirm Password should be same");
  }
                         
  }
  else
  {
  this.globals.presentToast("Please fill all details");
  }
  }


  getProfilImageFromCameraGallry () {
 let actionSheet = this.actionSheetCtrl.create({
       title: 'Choose Photos',
       buttons: [
         {
           text: 'Camera',
           role: 'destructive',
           handler: () => {
                
             this.camera.getPicture({
             sourceType: this.camera.PictureSourceType.CAMERA,
             destinationType: this.camera.DestinationType.DATA_URL
          }).then((imageData) => {
            this.userPic = 'data:image/jpeg;base64,'+imageData;
            this.newPhoto = imageData;
            this.selectedimage = 'data:image/jpeg;base64,'+imageData;
           let block =   this.selectedimage.split(";");
           let contentType = block[0].split(":")[1];// In this case "image/gif"
           let realData = block[1].split(",")[1];//
           this.photo = this.b64toBlob(realData,contentType);

          }, (err) => {
             this.globals.presentToast(JSON.stringify(err));
        });
           }               
         },
         {
           text: 'Gallery',
           handler: () => {
          this.camera.getPicture({
          sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: this.camera.DestinationType.DATA_URL
       }).then((imageData) => {
         this.newPhoto = imageData;
         this.userPic = 'data:image/jpeg;base64,'+imageData;
         this.selectedimage = 'data:image/jpeg;base64,'+imageData;
         let block =  this.selectedimage.split(";");
         let contentType = block[0].split(":")[1];// In this case "image/gif"
         let realData = block[1].split(",")[1];//
         this.photo =this.b64toBlob(realData,contentType);
       }, (err) => {
          this.globals.presentToast(JSON.stringify(err));
                       
     });
           }
         },
         {
           text: 'Cancel',
           role: 'cancel',
           handler: () => {
             console.log('Cancel clicked');
           }
         }
       ]
     });
     actionSheet.present();
  }

  b64toBlob(b64Data:any, contentType:any) {
         contentType = contentType || '';
         let   sliceSize = 512*10;
         var byteCharacters = atob(b64Data);
         var byteArrays = [];
         for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
         var slice = byteCharacters.slice(offset, offset + sliceSize);
         var byteNumbers = new Array(slice.length);
         for (var i = 0; i < slice.length; i++) {
             byteNumbers[i] = slice.charCodeAt(i);
         }
         var byteArray = new Uint8Array(byteNumbers);
         byteArrays.push(byteArray);
         }
         var blob = new Blob(byteArrays, {type: contentType});
         console.log(JSON.stringify(blob));
    //blob.style.height = "300px";
    //blob.style.width = "300px";
         return blob;
  }
}