import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { BotonesMenu } from '../../providers';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public buttons:BotonesMenu) {
    this.currentButtons = this.buttons.query();
    console.log(this.currentButtons)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCunPage');
  }

  openPage(page){
    this.navCtrl.push(page);
  }

}
