import { CunapiProvider } from './../../providers/cunapi/cunapi';
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
      primerNombre:'',
      segundoNombre:'',
      primerApellido:'',
      segundoApellido:'',
      cc:  "",
      carrera:"",
      sede: "",
      rh: ""
    }];
  
  displayQrCode() {
    return this.generated !== '';
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nativeStorage: NativeStorage,
              private cunMovilAPI : CunapiProvider) {
                
    
  }

  ionViewWillEnter()   
  {
    this.nativeStorage.getItem('user').then(userRes=> this.imgUrl = userRes.picture )
    
    this.nativeStorage.getItem('student').then(studentData =>{
      this.cunMovilAPI.getUserlicence(studentData.ccid).subscribe(studenRes=>{
       
        this.qrdata[0].primerNombre = studenRes[0].NOM_TERCERO;
        this.qrdata[0].segundoNombre = studenRes[0].SEG_NOMBRE;
        this.qrdata[0].primerApellido = studenRes[0].PRI_APELLIDO;
        this.qrdata[0].segundoApellido = studenRes[0].SEG_APELLIDO;
        this.qrdata[0].cc = studenRes[0].IDENTIFICACION;
        this.qrdata[0].carrera = studenRes[0].NOM_UNIDAD;
        this.qrdata[0].sede = studenRes[0].NOM_SEDE;
        this.qrdata[0].rh = studenRes[0].FRH_SANGUINEO;
        this.process();
      },err => alert(JSON.stringify(err)))
      

      
    })
  
  }

  process() {
    const qrcode = QRCode;
    const self = this;
    let res = this.qrdata[0].primerNombre + this.qrdata[0].segundoNombre + this.qrdata[0].primerApellido+this.qrdata[0].segundoApellido+
    ", "+this.qrdata[0].cc + ", "+this.qrdata[0].carrera + ", "+this.qrdata[0].sede + ", "+this.qrdata[0].rh
    qrcode.toDataURL(res.toString(), { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })
  }


}
