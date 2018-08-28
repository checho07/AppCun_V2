import { Component } from '@angular/core';
import {  IonicPage, NavParams, ViewController, LoadingController, ToastController  } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import {ApiVimeoProvider} from '../../../providers'


@IonicPage()
@Component({
  selector: 'page-modal-comments',
  templateUrl: 'modal-comments.html',
})
export class ModalCommentsPage {

   
  comments:any;
  fatherPage:any;
  public formulario : FormGroup;
  private videoId;

  constructor(private params: NavParams,
              private view :ViewController,
              private formBuilder: FormBuilder,
              private apiVimeo: ApiVimeoProvider,
              private loading:LoadingController,
              private toastCtrl:ToastController) {

                do {
     
                  this.getVideos(); 
                } while (this.comments.data);
               
  }

  ionViewDidLoad() {
   
  }

  getVideos()
  {
    var loader = this.loading.create(
      {spinner: 'hide',
    content: ` <div class="loader">Cargando Comentarios...</div> `});
    loader.present();
    
    this.fatherPage = this.params.get('videoInfo');
    
    this.videoId = this.fatherPage.uri.split('/')[2];
    
    this.comments = this.apiVimeo.getComments(this.fatherPage.uri)
    .subscribe(comments =>
      {
    this.comments =  comments;
    loader.dismiss();
     
      },error =>
       {
            alert(<any>error.message);
            console.log("GetCommentsError: " + error.message);
       })
   
   
      this.formulario = this.formBuilder
      .group({
        text: ['', Validators.required]
      });
     
  }

  closeModal(){
   
    this.view.dismiss();
  }

  addComment(){
    var loaderCommentAdd = this.loading.create(
      {spinner: 'hide',
    content: ` <div class="loader">Posteando...</div> `});
      
    loaderCommentAdd.present().then(()=>{

      this.apiVimeo.postComment(this.videoId,this.formulario.value.text).subscribe(response =>{
            
        if(response)
        {
          this.presentToast();
         this.getVideos();
        
      }
      },
      error => {
          alert(<any>error.message);
          console.log("addCommentPOSTError: " + error.message);
      })
      loaderCommentAdd.dismiss();
    })
  
   }

   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Tu comentario ha sido posteado exitosamente,Gracias.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
