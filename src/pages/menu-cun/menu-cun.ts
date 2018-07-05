import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BotonesMenu} from '../../mocks/providers/BotonesMenu';
import { Item } from '../../models/item';
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuCunPage');
  }

}
