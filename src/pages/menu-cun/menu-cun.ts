import { CunapiProvider } from './../../providers';
import { NativeStorage } from '@ionic-native/native-storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, MenuController, ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Item } from '../../models/item';
import { BotonesMenu } from '../../providers';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { GooglePlus } from '@ionic-native/google-plus';
import {Platform} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-menu-cun',
  templateUrl: 'menu-cun.html',
 
})
export class MenuCunPage {
  currentButtons: Item[];
  givenName: string ;
  email: string;
  imageUrl:string;
  

  constructor (
                public  navCtrl: NavController,
                public  navParams: NavParams,
                public  buttons:BotonesMenu,
                private device: Device,
                public  AppAvailability:AppAvailability,
                private inAppBrowser: InAppBrowser,
                private toggle : MenuController,
                private googlePlus: GooglePlus,
                private afAuth: AngularFireAuth,
                private platform : Platform,
                private nativeStorage: NativeStorage,
                private cunMovilAPI : CunapiProvider,
                public  modalCtrl: ModalController,
                private toastCtrl: ToastController           
            ) {
                      
    this.currentButtons = [];

   
  }

  ionViewWillEnter(){   
    let env = this;
    env.nativeStorage.getItem('user')
    .then(function(data){   
      env.imageUrl = data.picture; 
      env.email = data.email;
      env.givenName = data.givenName; 
      
  
    },function(err){
  
      let toast = env.toastCtrl.create({
        message: 'Error al cargar Informacion de usuario (' + err +')',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
     
      }
    );
  //  this.currentButtons = this.buttons.query();
  //  this.nativeStorage.getItem('user').then(userRes =>{
  //   let email = userRes.email;
      
  //  this.setStudentData(email);
  //  })
 
  

   this.loadButtons()
  
  }
  ionViewDidLeave(){
    this.currentButtons = [];
  }

  setStudentData(email){

    let env = this;
    env.nativeStorage.getItem('student').then(res=>{
      console.log('student already exists');
    }).catch(err =>{

      env.cunMovilAPI.getUserByEmail(email).subscribe(userRes =>{
        env.nativeStorage.setItem('student',{ccid:userRes[0].NUM_IDENTIFICACION})

      },err =>{
        let toast = env.toastCtrl.create({
          message: 'No conexion a Servidor (' + err +')',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      })
    })
   
  };   

  
  

  loadButtons(){
    let env = this;
    env.currentButtons = [];
              this.nativeStorage.getItem('user')
              .then(function(data) { 
                let email = data.email.split('@')[1];
                if(email !== 'cun.edu.co'){
                  env.currentButtons = env.buttons.query('nocun');
                }else{
                  env.setStudentData(data.email)
                  env.currentButtons = env.buttons.query();
                }
                
              },function(err){
                
                env.currentButtons = env.buttons.query('nocun');
                console.log(env.currentButtons)
              }
            ) 
  }
  

  openPage(page){
     if (page == 'CunVirtualPage'){
      this.openCunVirtual();
     }else if(page == 'AprendePage'){
      this.openAprende();
     }else if(page =='EmpleoPage'){
      this.openEmpleo();     
     }else{
      this.navCtrl.push(page);
     }
   
  }

  openEmpleo(){

    this.inAppBrowser.create("http://www.elempleo.com/sitios-empresariales/Colombia/cun/","_blank",)
 }

  openAprende(){

     this.inAppBrowser.create("http://c.biu.us","_blank",)
  }

  openCunVirtual(){

      let iosSchemaName ='instagram://';
      let androidPackageName =  'com.moodle.moodlemobile.cun';
      let appUrl = 'moodle://profile/';
      let httpUrl = 'https://play.google.com/store/apps/details?id=com.moodle.moodlemobile.cun';
      
      
      let app:string;
  
      if (this.device.platform === 'iOS') {
        app = iosSchemaName;
      } else if (this.device.platform === 'Android') {
        app = androidPackageName;
      } else {
        let browser = new InAppBrowser();
        browser.create(httpUrl , '_system');
        return;
      }
         
      this.AppAvailability.check(app).then(
        () => { // success callback
          console.log("yes")
          let browser = new InAppBrowser();
          browser.create(httpUrl , '_system')
        },
        () => { // error callback
          console.log("no")
          let browser = new InAppBrowser();
          browser.create(httpUrl, '_system')
        }
      );
    
  }

  directorioPush(){
    this.navCtrl.push('AgendaPage');
  }
  sedesPush(){
    this.navCtrl.push('UbicacionPage');
  }
  noticiasPush(){
    this.navCtrl.push('NoticiasPage');
  }

  notificaciones() {
    let NotificacionPush = this.modalCtrl.create('NotificacionmodalPage', {  });
    NotificacionPush.present();
  }
 


  logOut(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
    if (this.platform.is('cordova')) {
      this.googlePlus.logout()
    } else {
      
    }
  }

  signOut(){    
     
    this.nativeStorage.clear().then(()=>{
      this.afAuth.auth.signOut();     
      this.googlePlus.logout()  
      this.navCtrl.popToRoot();
      this.navCtrl.setRoot('WelcomePage');
    }) 
  }


}
