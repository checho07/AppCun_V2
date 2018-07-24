import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

              private googlePlus: GooglePlus,
              private afAuth: AngularFireAuth,
              private platform : Platform
            
            
            ) {
    this.currentButtons = this.buttons.query();
    console.log(this.currentButtons)
  }

  ionViewDidLoad() {
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
          browser.create(appUrl , '_system')
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

  logOut(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot("LoginPage");
    if (this.platform.is('cordova')) {
      this.googlePlus.logout()
    } else {
      
    }
  }

}
