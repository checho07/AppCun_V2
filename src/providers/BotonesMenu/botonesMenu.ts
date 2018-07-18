import { Injectable } from '@angular/core';

import { Item } from '../../models/item';

@Injectable()
export class BotonesMenu {
  items: Item[] = [];

 

  constructor() {
    let items = [
      {
        nombre:  "Tus notas" ,
        imagen:  "assets/img/4notas.png",
        page:    "NotasPage",
        candado: "assets/img/IconoCandado.png"
      },
      {
        nombre: "Carné",
        imagen: "assets/img/5carne.png",
        page:   "CarnePage",
        candado: "assets/img/IconoCandado.png"
      },
      {
        nombre: "Calendario",
        imagen: "assets/img/6calendario.png",
        page:   "CalendarioPage"
      },
      {
        nombre: "Cun Virtual",
        imagen: "assets/img/7virtual.png",
        page:   "CunVirtualPage"        ,
        candado: "assets/img/IconoCandado.png"
      },
      {
        nombre: "Tu horario",
        imagen: "assets/img/8horario.png",
        page:   "HorarioPage",
        candado: "assets/img/IconoCandado.png"
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
        page:   "BibliotecaPage",
        candado: "assets/img/IconoCandado.png"
      },
      {
        nombre: "AEI",
        imagen: "assets/img/13aei.png",
        page:   "AeiPage",
        candado: "assets/img/IconoCandado.png"
      },
      {
        nombre: "Cun cápsula",
        imagen: "assets/img/14capsula.png",
        page:   "CapsulaPage"
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
      },
      {
        nombre: "Funcionarios",
        imagen: "assets/img/17funcionarios.png",
        page:   "FuncionariosPage",
        candado:"assets/img/IconoCandado.png"
      },    
    {
      nombre: "Vitapp",
      imagen: "assets/img/18vitapp.png",
      page:   "VitappPage"
    }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
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

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
