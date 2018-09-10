import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

/**
 * Generated class for the MispagosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mispagos',
  templateUrl: 'mispagos.html',
})
export class MispagosPage {
  pdfObj = null;
  constructor (
                public  navCtrl: NavController,
                public  navParams: NavParams,
                private inAppBrowser:InAppBrowser,
                private alertCtrl : AlertController,
                private document : DocumentViewer,
                private transfer : FileTransfer,
                private fileOpener: FileOpener,
                private Platform: Platform,
                private File:File
              ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MispagosPage');
  }

  goHome(){
    this.navCtrl.setRoot('MenuCunPage')
  }

  pagosPecLink() {
    this.inAppBrowser.create("https://botondepago.cun.edu.co:8443/BotonPago","_blank",);
  }

  openPdf(){
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      }
      this.document.viewDocument('assets/5-tools.pdf', 'application/pdf', options);
    }

  openLocalPdf(){
   /* this.fileOpener.open('path/to/Guia.pdf', 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error openening file', e));*/
    if (this.Platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.File.writeFile(this.File.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.File.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  downloadAndOpenPdf() {
    let path = null;
 
    if (this.Platform.is('ios')) {
      path = this.File.documentsDirectory;
    } else if (this.Platform.is('android')) {
      path = this.File.dataDirectory;
    }
 
    const transfer = this.transfer.create();
    transfer.download('assets/Guia.pdf', path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }
  
}
