import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PushnotificationProvider} from '../../../providers/pushnotification/pushnotification';

/**
 * Generated class for the NotificacionmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificacionmodal',
  templateUrl: 'notificacionmodal.html',
})
export class NotificacionmodalPage {

  Notificaciones = [];
  constructor ( 
                public navCtrl: NavController,
                public navParams: NavParams,
                public notificationProvider:PushnotificationProvider
              ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionmodalPage');
    this.getNotifications();
  }

  showDataNot(){
    let notiPush = this.notificationProvider.initNotification;
    
  }

  getNotifications(){
    let notData = this.notificationProvider.getNotifications().subscribe((datano)=>{
     
      this.Notificaciones = datano['notifications'];
    })
  }
}
