import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StreamingMedia,StreamingAudioOptions } from '@ionic-native/streaming-media';
/**
 * Generated class for the CunMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cun-media',
  templateUrl: 'cun-media.html',
})
export class CunMediaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private streamingMedia:StreamingMedia) {
  }

  ionViewDidLoad() {
    
  }

  
radioOn(){
  let options: StreamingAudioOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') }
    
  };
  
this.streamingMedia.playAudio('http://stream.miradio.in:8553/stream?type=.mp3', options);

}


}
