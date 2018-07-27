
import { Injectable } from '@angular/core';
import { CalendarioModel } from '../../models/calendarioModel';

@Injectable()
export class CalendarioProvider {
  items: CalendarioModel[] = [];
 
 
  constructor() {
    let items = [
        {
          nombreEvento:'evento1',
          descripcion:'descripcion1',
          hora:'1:25pm',
          fecha:new Date(2018,7,9),
          sede:'A',
          area:'recursoHumano',
          cssClass:'oa'
          },
          {
            nombreEvento:'evento2',
          descripcion:'descripcion2',
          hora:'1:30pm',
          fecha:new Date(2018,7,15),
          sede:'F',
          area:'capitalSocial',
          cssClass:'op'
          },
          {
            nombreEvento:'evento3',
            descripcion:'descripcion3',
            hora:'1:50pm',
            fecha:new Date(2018,8,21),
            sede:'C',
            area:'cebiac',
            cssClass:'cc'
          },
          {
            nombreEvento:'eventoJulio',
            descripcion:'descripcion3',
            hora:'1:50pm',
            fecha:new Date(2018,9,22),
            sede:'C',
            area:'academicos',
            cssClass:'aa'
          },
          {
            nombreEvento:'eventoJulio',
            descripcion:'descripcion3',
            hora:'1:50pm',
            fecha:new Date(2018,6,21),
            sede:'C',
            area:'cebiac',
            cssClass:'cc'
          },
          {
            nombreEvento:'eventoJulio',
            descripcion:'descripcion3',
            hora:'1:50pm',
            fecha:new Date(2018,6,1),
            sede:'C',
            area:'cebiac',
            cssClass:'cc'
          },
          {
            nombreEvento:'eventoJulio',
            descripcion:'descripcion3',
            hora:'1:50pm',
            fecha:new Date(2018,8,13),
            sede:'C',
            area:'recursoHumano',
            cssClass:'oa'
            
          }
    ];
 
    for (let item of items) {
      this.items.push(new CalendarioModel(item));
    }
  }
 
  query(params?: any) {
    if (!params) {
      return this.items;
    }
 
    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }
 
  add(item: CalendarioModel) {
    this.items.push(item);
  }
 
  delete(item: CalendarioModel) {
    this.items.splice(this.items.indexOf(item), 1);
  }
 }