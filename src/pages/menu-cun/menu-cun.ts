import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Item } from '../../models/item';
import { BotonesMenu } from '../../providers';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the MenuCunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
              private inAppBrowser: InAppBrowser) {
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
     }else{
      this.navCtrl.push(page);
     }
   
  }
  openAprende(){

    const browser = this.inAppBrowser.create("http://c.biu.us","_blank",)
  }

  openCunVirtual(){

      let iosSchemaName ='instagram://';
      let androidPackageName =  'com.pluralsight';
      let appUrl = 'instagram://user?username=';
      let httpUrl = 'http://www.pluralsight.com/';
      
      
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
          browser.create(appUrl, '_system')
        }
      );
    
  }

}
