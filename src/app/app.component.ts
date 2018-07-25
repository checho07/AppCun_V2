import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage,MenuCun } from '../pages';
import { Settings } from '../providers';
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  template:  
    `
    <ion-menu [content]="content">

    <ion-header>
      <ion-toolbar>
        <ion-title>Perfil Cun</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
    
      <img src="assets/img/marty-avatar.png" class="imgProfile">
    
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
        <button ion-button block outline >Cerrar Sesion</button>
      </ion-list>
    </ion-content>

  </ion-menu>
   <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage;  
  userdData ;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Tutorial', component: 'TutorialPage' },
    { title: 'Welcome', component: 'WelcomePage' },
    { title: 'Tabs', component: 'TabsPage' },
    { title: 'Cards', component: 'CardsPage' },
    { title: 'Content', component: 'ContentPage' },
    { title: 'Login', component: 'LoginPage' },
    { title: 'Signup', component: 'SignupPage' },
    { title: 'Master Detail', component: 'ListMasterPage' },
    { title: 'Menu', component: 'MenuPage' },
    { title: 'Settings', component: 'SettingsPage' },
    { title: 'Search', component: 'SearchPage' },
    { title: 'MenuCun', component: 'MenuCunPage' }
  ]

  constructor(private translate: TranslateService,
                      platform: Platform,
                      settings: Settings,
             private config: Config,
             private statusBar: StatusBar,
             private splashScreen: SplashScreen,
             private nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
       this.statusBar.backgroundColorByName("transaparent");    
    
      ///googlePlus check logged in.
      let env = this;
      this.nativeStorage.getItem('user')
      .then(function(data){
        alert(JSON.stringify(data))
        this.userdData = data;
        env.rootPage = MenuCun;
        env.splashScreen.hide();
      },function(err){
        env.rootPage = FirstRunPage;
        env.splashScreen.hide();
      }
    )
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('es'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
