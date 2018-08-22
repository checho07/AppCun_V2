import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';

/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private oneSignal: OneSignal) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacionesPage');
  }




}
