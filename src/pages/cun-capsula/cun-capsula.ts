import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { ModalController, Modal } from 'ionic-angular';
import { ApiVimeoProvider } from '../../providers/';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { LoadingController } from 'ionic-angular';
import { AlertController,ToastController  } from 'ionic-angular';
import {comentariosModal} from '../'

@IonicPage()
@Component({
  selector: 'page-cun-capsula',
  templateUrl: 'cun-capsula.html',
})
export class CunCapsulaPage {
  //variables //
  private resPOST :any;
  public showForm =true;
  public showBtnGaleria = true;
  public hideBtnModal = false;
  public videoRes:any;
  public videoList:any;
  public hideContent = false; 
  public hideForm = true;
  public inputTus;
  public progress = "0";
  public videoInfo = {
    nombre:"",descripcion:"",size:''
  };

  constructor (
                public  rest: ApiVimeoProvider,
                public  mediaCapture: MediaCapture,
                public  loading: LoadingController,
                public  modalCtrl: ModalController,
                private alertCtr: AlertController,
                private toastCtrl: ToastController,
                private navCtrl: NavController
  ){
    this.getVideos()  
  }


  
  getVideos()
  {
    let loader = this.loading.create(
      {spinner: 'hide',
    content: ` <div class="loader">Cargando Página...</div> `});
    let loader1 = this.loading.create(
      {spinner: 'hide',
    content: ` <div class="loader">Cargando Videos...</div> `});

   loader.present().then(() => {

      this.rest.getVideos().subscribe(result =>
          {


    loader.present().then(() => {
      this.rest.getVideos().subscribe(result => {
        loader1.present().then(()=> {
          this.videoRes = result;
          this.videoList = this.videoRes.data;             
          console.log(this.videoList);
          this.progress = "50";
        })        
      },error => {
        alert(<any>error);
        console.log("getVideosError: " +error)
      },() => {
        loader1.dismiss();
        loader.dismiss();       
      });       
    });    
  }


  addVideo() {
    let alert = this.alertCtr.create ({
      title: 'Datos de tu video',
      inputs: [

        {
          name: 'videoName',
          placeholder: 'Titulo de tu video'
        },
        {
          name: 'description',
          placeholder: 'Descripcion y tu correo',
          type: 'text'
          
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => { }
        },
        {
          text: 'Grabar',
          handler: data => {
            if (!(data.videoName === "" && data.description === "") ) {
              this.videoInfo.nombre = data.videoName;
              this.videoInfo.descripcion =data.description;
              this.recordVideo();        
            } else {
              let alert = this.alertCtr.create ({
                title: 'Faltan Datos',
                subTitle: 'por favor brindanos un titulo y una descripcion para tu video, y si quieres tu correo',
                buttons:[{
                  text:'Ok',
                  role:'cancel',
                  handler:() => { this.addVideo() }
                }]
              });
              alert.present();
            }
          }
        }
      ]
    });
    alert.present();      
  }

  
  addVideoHd() {
    let alert = this.alertCtr.create({
      title: 'HD',
      subTitle: 'Estamos trabajando para brindarte una mejor experiencia',
      buttons: ['ok']
    });
    alert.present();
  }

  recordVideo() {
    let options: CaptureVideoOptions = { limit: 1,duration:15,quality:100}; 
    this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => data.forEach(element => {
      document.getElementById('back').style.backgroundColor = "rgba(0,0,0,0.4)";
      this.hideBtnModal= true;
      this.showBtnGaleria = false;
      this.hideContent = true;  
      // let btnGaleria = document.getElementById("btnGaleria")
      // btnGaleria.click(); 
      //document.getElementsByTagName('input')[1].value = "";
    }), (err: CaptureError) => {
      console.log("recordVideoError: " + err);
      document.getElementsByTagName('input')[1].value = "";
      let alert = this.alertCtr.create({
        title: 'Error al abrir camara',
        message: err.toString(),
        buttons: ['OK']
      });
      alert.present();
    });
  }

  openGallery() {    
    var inputFile =document.getElementById("tusInput");    
    inputFile.click();      
  }

  requestPOSTTus(videoInfo):void {  
    let loader = this.loading.create ({
      spinner: 'hide',
      content: ` <div class="loader">Obteniendo enlace...</div> `
    });
    loader.present().then(() => {  
      this.rest.POST_tus(videoInfo).subscribe(result => {  
        let loader1 = this.loading.create ({ 
          spinner: 'hide',
          content: ` <div class="loader">Subiendo Video...</div> `
        });
        loader1.present().then(()=> {
          this.resPOST = result
          let inputTus = document.getElementById('tusInput');         
          this.rest.PatchVideo(inputTus['files'][0],this.resPOST.upload.upload_link).subscribe(res => {                
            if (res) {
              loader1.dismiss(); 
              let toast = this.toastCtrl.create({
                message: 'Tu video pasara a revision y sera publicado',
                duration: 4000,
                position: 'bottom'
              }); 
              toast.onDidDismiss(() => {
                this.hideContent = false;
                this.showBtnGaleria = true;
                this.hideBtnModal = false;
              });
              toast.present();
            }
          })
        })         
        loader.dismiss();
      }, error => {
          loader.dismiss();
          alert(<any>error.message);
          console.log("requestPOSTError: " + error.message);
      });
    });
  }

//  requestPOST (videoInfo): void 
//  {
  
//   //let embed = document.getElementById("embed");

//   let loader = this.loading.create({content: 'Obteniendo Enlace para Subir Video...',});
 
//   loader.present().then(() => 
//   {
//       this.rest.uploadVideo(videoInfo).subscribe(result => 
//         {
//         this.resPOST = result;
       
//         //embed.innerHTML= this.resPOST.upload.form;
//         this.recordVideo();
//         },
//       error => {
//           alert(<any>error.message);
//           console.log("requestPOSTError: " + error.message);
//       }
//   );

//    loader.dismiss();  
  
//   });
// } 
  showLoading() {
    let loader = this.loading.create ({
      content: 'Subiendo Video...',
      dismissOnPageChange: true,
      duration:5000
    });
    loader.present();    
  }
  playVideo(link){
    var x = document.createElement('video');
    let embedDiv = document.getElementById('ebedVideo');
    x.setAttribute('src',link);
    x.setAttribute("controlsList", "nodownload"); 
    x.setAttribute("autoplay", "autoplay"); 
    x.onpause = function() {
      x.webkitExitFullScreen()
      embedDiv.removeChild(embedDiv.firstChild);
    }   
    embedDiv.appendChild(x);
    //document.body.appendChild(x);
    x.webkitEnterFullScreen();
    //embedDiv.removeChild(embedDiv.firstChild);
    //x.requestFullscreen();
  }

  openCommentsModal(videoInfo) {  
    const modalComments:Modal = this.modalCtrl.create(comentariosModal,{videoInfo});
        modalComments.present();
        modalComments.onDidDismiss(()=>{
          this.getVideos();     
        })
    // this.rest.getComments(videoInfo.uri).subscribe(comments =>{    
    //   commentsData = comments
    //   let dataObj = {
    //     commentsData:commentsData.data,
    //     videoId:videoInfo.uri.split('/')[2]
    //   }
    //   const modalComments:Modal = this.modalCtrl.create('ModalCommentsPage',{dataObj});
    //     modalComments.present();
    //     modalComments.onDidDismiss((data)=>{
    //       console.log(data);     
    //     })
    // },
    // error => {
    //     alert(<any>error.message);
    //     console.log("GetCommentsError: " + error.message);
    // }      
  }


  OnchangeInput(video) {
    const videoFile = video.target.files[0];
    this.videoInfo.size = videoFile.size;  
    this.requestPOSTTus(this.videoInfo)
  }
  goHome(){
    this.navCtrl.setRoot('MenuCunPage')
  }



doRefresh(refresher) {

  this.rest.getVideos().subscribe(result =>{
        this.videoRes = result;
        this.videoList = this.videoRes.data;
        refresher.complete();
  });
}


}
