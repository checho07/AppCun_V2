import { NativeStorage } from '@ionic-native/native-storage';
import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { TranslateService } from '@ngx-translate/core';

export interface items{
  nombre:string;
  imagen:string;
  page:string;
}

@Injectable()
export class BotonesMenu {

  items: Item[] = [];
  constructor( private translate:TranslateService,nativeStorage:NativeStorage) {

     

      let items = [
        {
          
          nombre:  "Tus notas" ,
          imagen:  "assets/img/4notas.png",
          page:    "NotasPage", 
          cunOnly: true
        },
        {
          nombre: "Carné",
          imagen: "assets/img/5carne.png",
          page:   "CarnePage",
          cunOnly: true
        },
        {
          nombre: "Calendario",
          imagen: "assets/img/6calendario.png",
          page:   "CalendarioPage"
        },
        {
          nombre: "Cun Virtual",
          imagen: "assets/img/7virtual.png",
          page:   "CunVirtualPage"
        },
        {
          nombre: "Tu horario",
          imagen: "assets/img/8horario.png",
          page:   "HorarioPage",
          cunOnly: true
        },
        {
          nombre: "Gana dinero",
          imagen: "assets/img/9dinero.png",
          page:   "GanaDineroPage",
          candado: "assets/img/IconoCandado.png"
        },
        {
          nombre: "Cun media",
          imagen: "assets/img/10media.png",
          page :"CunMediaPage"
        },
        {
          nombre: "Aprende",
          imagen: "assets/img/12aprende.png",
          page:   "AprendePage"
        },
        {
          nombre: "Biblioteca",
          imagen: "assets/img/11biblioteca.png",
          page:   "BibliotecaPage"
        },      
        {
          nombre: "Cun cápsula",
          imagen: "assets/img/14capsula.png",
          page:   "CunCapsulaPage"
        },
        {
          nombre: "Empleo",
          imagen: "assets/img/15empleo.png",
          page:   "EmpleoPage"
        },
        {
          nombre: "Diviértete",
          imagen: "assets/img/16diviertete.png",
          page:   "DiviertetePage"
        }
      ];
  
      for (let item of items) {
        this.items.push(new Item(item));
      }
    }

  // query(params?: any) {
  //   if (!params) {
  //     return this.items;
  //   }

  //   return this.items.filter((item) => {
  //     for (let key in params) {
  //       let field = item[key];
  //       if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
  //         return item;
  //       } else if (field == params[key]) {
  //         return item;
  //       }
  //     }
  //     return null;
  //   });
  // }

  query(params?: any) {
    let filterItems =[];
    if (!params) {
      return this.items;
    }

     this.items.filter((item) => {
       
      if(item.cunOnly){
        item.candado =  "assets/img/IconoCandado.png";
        item.page = 'noCunPage';
        filterItems.push(item)
      }else{
        filterItems.push(item)
      }

    });
    return filterItems
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
