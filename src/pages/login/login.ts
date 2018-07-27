import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';

////////googleLogin 2
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {Platform} from 'ionic-angular';
////////



import { User } from '../../providers';
import { MenuCun } from '../';
@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  ////////googleLogin 2
  user:Observable<firebase.User>;
  ///////

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn:boolean = false;
  gender: any;
  birthday:any;  
  ageMin:any; 
  ageMax:any;

  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              private googlePlus: GooglePlus,
              private afAuth: AngularFireAuth,
              private platform : Platform,
              private nativeStorage : NativeStorage,
              private loadingCtrl:LoadingController) 
              {
                
               this.user = this.afAuth.authState;
               this.login();
 
              }

  ionViewDidEnter(){
  this.displayData();
  }

signOut(){
  this.afAuth.auth.signOut();
  if (this.platform.is('cordova')) {
    this.googlePlus.logout()
    this.nativeStorage.remove('user');
    this.navCtrl.push(LoginPage);
  } else {
    
  }
}
 login() {
    let nav = this.navCtrl;
    let env = this;
    let loading = this.loadingCtrl.create({
      content:'Espera por favor...'
    });

    loading.present();

    this.googlePlus.login
    ({ 
       'webClientId':"537588800472-09dt0r3bviscgeep9c4eqla4v6h78mcb.apps.googleusercontent.com",
       'offline':true,
       'scopes':'profile email '
    })
     .then(res=>
      
      {  
        
        this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))

        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.gender  =res.gender;
        this.birthday=res.birthday;  
        this.ageMin=res.ageRangeMin; 
        this.ageMax=res.ageRangeMax;
        
        
        this.nativeStorage.setItem('user',
        {
          name:res.displayName,
          email:res.email,
          picture:res.imageUrl,
          gender :res.gender , 
          birthday:res.birthday,  
          ageMin:res.ageRangeMin, 
          ageMax:res.ageRangeMax

        }).then(function(res){
          loading.dismiss();
          env.navCtrl.setRoot(MenuCun);
          let toast = this.toastCtrl.create({
            message: 'Bienvenido ${res.givenName}',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        },function(err){
          alert(JSON.stringify(err))
        })
  })
  

  }

  displayData(){
    this.nativeStorage.getItem('user')
    .then(function(data){
      alert(JSON.stringify(data))
      this.isLoggedIn = true;
    },function(err){
      console.log(JSON.stringify(err))
    })
  }

  

  
  
}
