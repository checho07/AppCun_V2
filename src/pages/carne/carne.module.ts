import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarnePage } from './carne';

@NgModule({
  declarations: [
    CarnePage,
  ],
  imports: [
    IonicPageModule.forChild(CarnePage),
  ],
})
export class CarnePageModule {}
