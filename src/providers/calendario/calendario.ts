
import { Injectable } from '@angular/core';
import { CalendarioModel } from '../../models/calendarioModel';

@Injectable()
export class CalendarioProvider {
  items: CalendarioModel[] = [];
 
 
  constructor() {
    let items = [
                  {
                    nombreEvento:'Brigada de salud',
                    descripcion:'Asiste a la primera brigada de salud CUN',
                    hora:'1:50pm',
                    fecha:new Date(2018,6,5),
                    sede:'C',
                    area:'Brigadas',
                    cssClass:'oa'
                    
                  },
                  {
                    nombreEvento:'Salud y vida',
                    descripcion:' El cuerpo es nuestro jardín, la voluntad es nuestro jardinero (William Shakespeare)',
                    hora:'1:50pm',
                    fecha:new Date(2018,6,19),
                    sede:'A',
                    area:'Brigadas',
                    cssClass:'oa' 
                  },
                  //
                  {
                    nombreEvento:'Semana Cun',
                    descripcion:'Presenta tu proyecto!! No te quedes atras ',
                    hora:'1:50pm',
                    fecha:new Date(2018,7,3),
                    sede:'I',
                    area:'Bienestar',
                    cssClass:'cc'
                  },
                  {
                    nombreEvento:'final de parciales',
                    descripcion:'descripcion3',
                    hora:'1:50pm',
                    fecha:new Date(2018,7,28),
                    sede:'',
                    area:'Orientación académica',
                    cssClass:'aa'
                  },
                  //
                  {
                    nombreEvento:'evento',
                    descripcion:'descripcion',
                    hora:'1:50pm',
                    fecha:new Date(2018,8,11),
                    sede:'C',
                    area:'Orientación académica',
                    cssClass:'aa'
                  },
                  {
                    nombreEvento:'evento 2',
                    descripcion:'descripcion 2',
                    hora:'1:50pm',
                    fecha:new Date(2018,8,12),
                    sede:'C',
                    area:'Orientación académica',
                    cssClass:'aa'
                  },
                  //
                  {
                    nombreEvento:'evento',
                    descripcion:'descripcion',
                    hora:'1:50pm',
                    fecha:new Date(2018,9,6),
                    sede:'C',
                    area:'Bienestar',
                    cssClass:'cc'
                  },
                  {
                    nombreEvento:'evento 1',
                    descripcion:'descripcion 1',
                    hora:'1:50pm',
                    fecha:new Date(2018,9,15),
                    sede:'C',
                    area:'Brigadas',
                    cssClass:'oa'
                  },
                  {
                    nombreEvento:'evento ',
                    descripcion:'descripcion 3',
                    hora:'1:50pm',
                    fecha:new Date(2018,9,20),
                    sede:'C',
                    area:'Orientación académica',
                    cssClass:'aa'
                  },
                  {
                    nombreEvento:'evento del mes ',
                    descripcion:'descripcion del evento',
                    hora:'1:50pm',
                    fecha:new Date(2018,9,22),
                    sede:'C',
                    area:'Bienestar',
                    cssClass:'cc'
                  },
                  //sep                  
                  {
                    nombreEvento:'evento 5',
                    descripcion:'descripcion3',
                    hora:'1:50pm',
                    fecha:new Date(2018,10,5),
                    sede:'C',
                    area:'Brigadas',
                    cssClass:'oa'
                    
                  },
                  {
                    nombreEvento:'eventoJulio',
                    descripcion:'descripcion3',
                    hora:'1:50pm',
                    fecha:new Date(2018,10,13),
                    sede:'C',
                    area:'capital Social',
                    cssClass:'op'
                  },
                  {
                    nombreEvento:'eventoJulio',
                    descripcion:'descripcion3',
                    hora:'1:50pm',
                    fecha:new Date(2018,10,24),
                    sede:'C',
                    area:'Bienestar',
                    cssClass:'cc'
                  },
                  {
                    nombreEvento:'eventoJulio',
                    descripcion:'descripcion3',
                    hora:'1:50pm',
                    fecha:new Date(2018,10,28),
                    sede:'C',
                    area:'Orientación académica',
                    cssClass:'aa'
                  },
                  //
                  {
                    nombreEvento:'evento 2019',
                    descripcion:'descripcion3',
                    hora:'1:50pm',
                    fecha:new Date(2019,6,19),
                    sede:'C',
                    area:'Orientación académica',
                    cssClass:'aa'
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