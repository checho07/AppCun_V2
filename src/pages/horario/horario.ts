import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HorarioProvider } from '../../providers';
import { HorarioModel } from '../../models/horarioModel';
import {horarioModal} from '../';


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
