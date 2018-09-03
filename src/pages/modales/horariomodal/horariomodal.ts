import { Materia } from './../../notas/notas';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-horariomodal',
  templateUrl: 'horariomodal.html',
})
export class HorariomodalPage {
  
  public materias = [];
  public materiasVirtuales = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ViewCtrl:ViewController,
              public alertCtrl: AlertController,
              public inAppBrowser:InAppBrowser) {

               this.materias =  navParams.get('materias')
               this.materiasVirtuales = navParams.get('materiasVirtuales')
               


               console.log(this.materiasVirtuales)
  }

  ionViewDidLoad() {
    
    if(this.materias){
      let materias = this.materias;
      
    if(materias.length == 0  ){
      let alert = this.alertCtrl.create(
        {title:"Estas Libre Hoy..", message:'parece que no tienes clases el dia de hoy.',buttons:[{text:'Ok',handler: () => {
          this.closemodal();
        }}]})
        alert.present();
    }
    }
    if(this.materiasVirtuales){
      let materiasVirtuales = this.materiasVirtuales
      if(materiasVirtuales.length == 0  ){
        let alert = this.alertCtrl.create(
          {title:"Estas Libre Hoy..", message:'parece que no tienes clases el dia de hoy.',buttons:[{text:'Ok'}]})
          alert.present();
      }
    }

  
  }
  closemodal(){
    this.ViewCtrl.dismiss();
  }

  showAlert(materia) {
    const alert = this.alertCtrl.create({      
      title: 'Calculo Multivariado',
      subTitle: 'Fecha inicio: '+materia.FEC_INICIO+' <br> \n  Fecha final: '+materia.FEC_FIN+'<br> \n Nivel: '+materia.NUM_NIVEL+'<br> \nCréditos: '+materia.CREDITOS+' <br>\n Nom Unidad: '+materia.NOM_UNIDAD+'<br> \nCod pensum: '+materia.COD_PENSUM+'',
      cssClass: 'alertDetallesA',
      buttons: [
        {
          text: 'OK',
          cssClass: "bOk"
        },
      ],  
    });
    alert.present();
  }

  abrirMediacionVirtual(){
    this.inAppBrowser.create("http://virtual.cun.edu.co/mediacionvirtual/","_blank",)
  }

  openUbicacion(){
    this.navCtrl.push('UbicacionPage');
  }
  
}
