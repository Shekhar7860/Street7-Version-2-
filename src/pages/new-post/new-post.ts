import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'; 
import { GlobalsProvider } from '../../providers/globals/globals';
import { RestProvider } from '../../providers/rest/rest';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
                   
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})                   
export class NewPostPage {
  base64Image : any;
  imageFileName : any;
  base64Video  : any;
  mediaFiles = [];
  loader: any;
videoId: any;
selectedimage : any;
Video : any;
flag_upload = true;
flag_play = true;
public photos: any = [];
public base64Image2: string;
public fileImage: string;
public responseData: any;
public photo : any;
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
    }
  ];
  postData = { post_title:'', post_description:'' };
  public co_creators = [
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private transfer: FileTransfer,  private camera: Camera, public actionSheetCtrl:ActionSheetController,  public globals: GlobalsProvider) {
  }
              
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }
  createNewPost(){

  }
  gotoPreviousStat(){
    this.navCtrl.pop();
  }

  takePhoto () {
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
            this.selectedimage = 'data:image/jpeg;base64,'+imageData;
           let block =   this.selectedimage.split(";");
           let contentType = block[0].split(":")[1];// In this case "image/gif"
           let realData = block[1].split(",")[1];//
           this.photo =this.b64toBlob(realData,contentType);

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
                     
  uploadPhoto () {
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log(this.photos)
    for (var i=0; i<this.photos.length ; i++)
    {
      var filename = 'post_media' ;
    let options: FileUploadOptions = {
      fileKey: filename,
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {},
      params : {"post_user_id":52, "insert" :1, "post_category" : 'style', "post_title":'hi', "post_description" :"testIt", }
    }
   
      console.log('photos', this.photos[i])
     fileTransfer.upload(this.photos[i], 'http://demo.aarvitechnolabs.com/street7-api/api/post_update.php', options)
      .then((data) => {
      console.log(JSON.stringify(data) +" Uploaded Successfully");
      this.imageFileName = "http://cashmann.co.uk/shekhar/upload/ionicfile"
    }, (err) => {   
      console.log(err);
    });
  }
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

  takePhoto2() {
    console.log("coming here");

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 450,
      targetHeight: 450,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image2 = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image2);
        this.photos.reverse();
                               
      },
      err => {
        console.log(err);
      }
    );
  }
}
