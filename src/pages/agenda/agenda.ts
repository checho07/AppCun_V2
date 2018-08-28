import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DirectorioProvider } from '../../providers';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  directorio =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public callNumber: CallNumber, 
              public emailComposer: EmailComposer,
              public directorioProvider:DirectorioProvider) {

                this.directorio = directorioProvider.query()
  }

  ionViewDidLoad() {
    
  }
 
  
  callPhone(numero) {  
    this.callNumber.callNumber(numero, true)
    .then(() => alert('Launched dialer!'))
    .catch(() => alert('Error launching dialer'));
  }

  sendEmail(emailData) {
    console.log(emailData);
      let email = {
        to: emailData,
        cc: '',
        subject: 'Informacion al estudiante',
        body: 'Aqui puedes escribir tu inquietud...',
        isHtml: true
        
      };   
      this.emailComposer.open(email);
    }
   
    goHome(){
      this.navCtrl.setRoot('MenuCunPage')
    }

}
