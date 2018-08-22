import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';


/*
  Generated class for the PushnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushnotificationProvider {

  constructor ( private oneSignal: OneSignal,
                public Platform:Platform
  ) {
    console.log('Hello PushnotificationProvider Provider');
  }

  initNotification(){

    if (this.Platform.is('cordova')) {
      
      this.oneSignal.startInit('23154f20-404c-4127-ad54-7622ef56481f', '528719470511');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        alert('La notificación fue Recivida sergio');
        alert(JSON.stringify(data));
        //this.oneSignalTitle = data.payload.title;
        //this.oneSignalbody = data.payload.body;
       
      });
      // this.oneSignal.handleNotificationOpened().subscribe((res) => {
      //   alert('El usuario abrio la Notificación');
      //   //this.oneSignalTitle1 = res.notification.payload.title;
      //   //this.oneSignalbody1 = res.notification.payload.body;

      // });
      
      this.oneSignal.endInit();
    }else{
      console.log('Onesignal no disponible en chrome');
      
    }
  }
}
