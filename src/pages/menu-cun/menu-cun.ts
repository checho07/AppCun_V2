import { CunapiProvider } from './../../providers';
import { NativeStorage } from '@ionic-native/native-storage';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public buttons:BotonesMenu,
              private device: Device,
              public AppAvailability:AppAvailability,
              private inAppBrowser: InAppBrowser,
              private toggle : MenuController,
              private googlePlus: GooglePlus,
              private afAuth: AngularFireAuth,
              private platform : Platform,
              private nativeStorage: NativeStorage,
              private cunMovilAPI : CunapiProvider          
            
            ) {
                      
    this.currentButtons = [];
  }

  ionViewWillEnter(){   
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
    this.nativeStorage.getItem('student').then(res=>{
      console.log('student already exists');
    }).catch(err =>{

      this.cunMovilAPI.getUserByEmail(email).subscribe(userRes =>{
        this.nativeStorage.setItem('student',{ccid:userRes[0].NUM_IDENTIFICACION})

      },err =>{
        alert(JSON.stringify(err));
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
                  env.currentButtons = [];
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
  notificaciones(){
    this.navCtrl.push('NotificacionesPage');
  }

  logOut(){
    this.afAuth.auth.signOut();
  if (this.platform.is('cordova')) {
    
    this.googlePlus.logout()
    this.nativeStorage.remove('user');
    
  } else {
    
  }
  }


}
