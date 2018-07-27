import { CalendarioProvider } from './../../providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  DayConfig,CalendarComponentOptions } from "ion2-calendar";

/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

  dateMulti: string[];
  type: 'string'; 
   _daysConfig: DayConfig[] = [];   
  optionsMulti: CalendarComponentOptions;   
  datearr =[];
  color:any; 
  configDays:any;
  eventos =[];
  dataMes=[];
  currentDate:Date = new Date();
  areas=[];
  

  constructor(public navCtrl: NavController,calendarioProvider:CalendarioProvider) {
    
    this.eventos = calendarioProvider.query();
    this.eventos.forEach(element => {
      this.createMarker(element)
    });
    this.dataMesFn(null,this.currentDate);
   

    this.optionsMulti = {
      pickMode: 'single',
      color: 'primary',
      monthPickerFormat:	['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
      weekdays:['D', 'L', 'M', 'MI', 'J', 'V', 'S'],
      weekStart:1,
      daysConfig:this._daysConfig
    };
    
  }

 

  createMarker(data){
    let arrayMarker= {cssClass:'',date:new Date(),subTitle:''}

    switch (data.area) {
      case 'recursoHumano':
        arrayMarker.cssClass = 'oa'
        arrayMarker.subTitle = 'RRHH'
        break;
        case 'capitalSocial':
        arrayMarker.cssClass = 'op'
        arrayMarker.subTitle  = 'CS'
        break;
        case 'cebiac':
        arrayMarker.cssClass = 'cc'
        arrayMarker.subTitle  = 'CE'
        break;
        case 'academicos':
        arrayMarker.cssClass = 'aa'
        arrayMarker.subTitle  = 'OA'
        break;
      default:
        break;
    }
    arrayMarker.date  = data.fecha;  
    this._daysConfig.push(arrayMarker)    
  }  

dataMesFn(target?,fecha?){
  this.dataMes = [];
  this.areas = [];
  this._daysConfig;
  if(target){   
    this.eventos.forEach(element => {
      if (target.newMonth.months == element.fecha.toISOString().split('-')[1]) {
        this.dataMes.push(element);
      }      
    });
  }else{
    this.eventos.forEach(element => {
      if (fecha.toISOString().split('-')[1] == element.fecha.toISOString().split('-')[1]) {
        this.dataMes.push(element);
      }      
    });
  }
 console.log(this.dataMes);

for (let i = 0; i < this.dataMes.length ; i++) 
{
  if(this.areas.length == 0){
    this.areas.push(this.dataMes[i].area)
  }
for (let y = 0; y < this.areas.length; y++) {
   if(this.dataMes[i].area == this.areas[y]){
       y ++;
  }else{ this.areas.push(this.dataMes[i].area) }  
}    
};
 //console.log(this.areas)
}

}


