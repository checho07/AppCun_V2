import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiviertetePage } from './diviertete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DiviertetePage,
  ],
  imports: [
    IonicPageModule.forChild(DiviertetePage),
    TranslateModule.forChild()
  ],
})
export class DiviertetePageModule {}
