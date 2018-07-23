import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';

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
  templateUrl: 'login.html',
  providers: [GooglePlus]
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
              private platform : Platform) {

    this.user = this.afAuth.authState;
  }


///////googleLogin2
googleLogin()
{
  if(this.platform.is('cordova')){
    this.nativeGoogleLogin();
  }else{
    this.webGoogleLogin();
  }

}

async nativeGoogleLogin(): Promise<any>{
  try {
    const gplusUser = await this.googlePlus.login({
      'webClientId':"537588800472-09dt0r3bviscgeep9c4eqla4v6h78mcb.apps.googleusercontent.com",
      'offline':true,
      'scopes':'profile email'
    })
  
    return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider
      .credential(gplusUser.idToken))
      
  } catch (error) {
    console.log(error);
  } 
}
async webGoogleLogin(): Promise<void>{
    try {
   


      const provider = new firebase.auth.GoogleAuthProvider();
      const credential=  await this.afAuth.auth.signInWithPopup(provider);
      console.log(provider)
    } catch (error) {
      console.log(error);
    }
}

signOut(){
  this.afAuth.auth.signOut();
  if (this.platform.is('cordova')) {
    this.googlePlus.logout()
  } else {
    
  }
}

check(uid){
  if (uid) 
    this.navCtrl.setRoot(MenuCun);
  
}
  ///////



  login() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  
}
