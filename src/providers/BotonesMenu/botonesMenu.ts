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

  constructor( private translate:TranslateService) {
    translate.get([
                  "TITLE_MENU_NOTAS",
                  "TITLE_MENU_CARNE",
                  "TITLE_MENU_CALENDARIO",
                  "TITLE_MENU_VIRTUAL",
                  "TITLE_MENU_HORARIO",
                  "TITLE_MENU_DINERO",
                  "TITLE_MENU_CUNMEDIA",
                  "TITLE_MENU_APRENDE",
                  "TITLE_MENU_BIBLIOTECA",
                  "TITLE_MENU_CAPSULA",
                  "TITLE_MENU_EMPLEO",
                  "TITLE_MENU_DIVIERTETE",
    ]).subscribe(
      (values) =>{
        console.log('valores', values);
        let items = [
          {
            nombre:  values.TITLE_MENU_NOTAS,
            imagen:  "assets/img/4notas.png",
            page:    "NotasPage"
          },
          {
            nombre: values.TITLE_MENU_CARNE,
            imagen: "assets/img/5carne.png",
            page:   "CarnePage"
          },
          {
            nombre: values.TITLE_MENU_CALENDARIO,
            imagen: "assets/img/6calendario.png",
            page:   "CalendarioPage",
            candado: "assets/img/IconoCandado.png"
          },
          {
            nombre: values.TITLE_MENU_VIRTUAL,
            imagen: "assets/img/7virtual.png",
            page:   "CunVirtualPage"
          },
          {
            nombre: values.TITLE_MENU_HORARIO,
            imagen: "assets/img/8horario.png",
            page:   "HorarioPage"
          },
          {
            nombre: values.TITLE_MENU_DINERO,
            imagen: "assets/img/9dinero.png",
            page:   "GanaDineroPage",
            candado: "assets/img/IconoCandado.png"
          },
          {
            nombre: values.TITLE_MENU_CUNMEDIA,
            imagen: "assets/img/10media.png",
            page :"CunMediaPage"
          },
          {
            nombre: values.TITLE_MENU_APRENDE,
            imagen: "assets/img/12aprende.png",
            page:   "AprendePage"
          },
          {
            nombre: values.TITLE_MENU_BIBLIOTECA,
            imagen: "assets/img/11biblioteca.png",
            page:   "BibliotecaPage"
          },      
          {
            nombre: values.TITLE_MENU_CAPSULA,
            imagen: "assets/img/14capsula.png",
            page:   "CunCapsulaPage"
          },
          {
            nombre: values.TITLE_MENU_EMPLEO,
            imagen: "assets/img/15empleo.png",
            page:   "EmpleoPage"
          },
          {
            nombre: values.TITLE_MENU_DIVIERTETE,
            imagen: "assets/img/16diviertete.png",
            page:   "DiviertetePage"
          }
        ];
    
        for (let item of items) {
          this.items.push(new Item(item));
        }
      }
    )
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

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
