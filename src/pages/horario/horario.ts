import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HorarioProvider } from '../../providers';
import { HorarioModel } from '../../models/horarioModel';
import {horarioModal} from '../';

/**
 * Generated class for the HorarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horario',
  templateUrl: 'horario.html',
  
})
export class HorarioPage {
  currentDay: HorarioModel[];
  virtual:boolean;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public horario:HorarioProvider,
              public modalCtrl: ModalController
             ) {
    this.currentDay = this.horario.query();
    this.virtual=true;
  }

  ionViewDidLoad() {
    
  }

  showModal() {
    const modal = this.modalCtrl.create(horarioModal);
    modal.present();
  }
  
 


}
