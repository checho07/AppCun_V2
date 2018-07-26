import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import QRCode from 'qrcode';

@IonicPage()
@Component({
  selector: 'page-carne',
  templateUrl: 'carne.html',
})
export class CarnePage {
  
  imgUrl:string;
  generated = '';
  qrdata =[
    {
      nombre:  "Leidy Tatiana Castiblanco Moreno" ,
      cc:  "1024158934",
      carrera:"Ingenieria en sistemas",
      sede: "Sur",
      rh: "a+"
    }];
  
  displayQrCode() {
    return this.generated !== '';
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage: NativeStorage) {
    nativeStorage.getItem('user').then(userRes=>{
      this.imgUrl = userRes.picture;
    })
  }

  ionViewDidLoad() {
     this.process();
  }

  process() {
    const qrcode = QRCode;
    const self = this;
    let res = this.qrdata[0].nombre + ", "+this.qrdata[0].cc + ", "+this.qrdata[0].carrera + ", "+this.qrdata[0].sede + ", "+this.qrdata[0].rh
    qrcode.toDataURL(res.toString(), { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }


}
