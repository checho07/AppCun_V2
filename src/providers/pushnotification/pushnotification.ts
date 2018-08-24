import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the PushnotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushnotificationProvider {

  constructor ( private oneSignal: OneSignal,
                public Platform:Platform,
                public  modalCtrl: ModalController,
                private http: HttpClient 
  ) {
    console.log('Hello PushnotificationProvider Provider');
  }

  initNotification(){

    if (this.Platform.is('cordova')) {
      
      this.oneSignal.startInit('23154f20-404c-4127-ad54-7622ef56481f', '528719470511');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        alert('La notificación fue Recivida');
        alert(JSON.stringify(data));
        //this.oneSignalTitle = data.payload.title;
        //this.oneSignalbody = data.payload.body;
       
      });
      this.oneSignal.handleNotificationOpened().subscribe((res) => {
      //   alert('El usuario abrio la Notificación');
      //   //this.oneSignalTitle1 = res.notification.payload.title;
      //   //this.oneSignalbody1 = res.notification.payload.body;
      let NotificacionPush = this.modalCtrl.create('NotificacionmodalPage',{
          title: res.notification.payload.title,
          subTitle: res.notification.payload.body,         
      });
      NotificacionPush.present();
        alert(res.notification.payload.title+'/'+ res.notification.payload.body);
       });
      
      this.oneSignal.endInit();
    }else{
      console.log('Onesignal no disponible en chrome');
      
    }
  }
  

  getNotifications(){
    var oneSignalURl = "https://onesignal.com/api/v1/notifications?";
    const appId = "23154f20-404c-4127-ad54-7622ef56481f";
    var headersParams = 
    {
         "Content-Type": "application/json",
         "Authorization": "Basic ZWYxZmE1NzUtMWI5Yi00NGQxLTkwOGYtZTcyZDYwNDNkNzEz"
     };

     var options ={

      headers: headersParams

    }
    return this.http.get(oneSignalURl+ "app_id="+appId+"&limit=5",options)

  }
}
