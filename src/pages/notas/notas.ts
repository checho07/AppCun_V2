import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the NotasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html',
})
export class NotasPage {

  selectedItem: any;
  ocultar:any;
  @ViewChild('corte1Input') corte1Input : ElementRef;
  @ViewChild('corte2Input') corte2Input : ElementRef;
  @ViewChild('mensaje') mensaje : ElementRef;
  @ViewChild('tr') tr : ElementRef;

  clase: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, screenOrientation: ScreenOrientation, private toastCtrl:ToastController) {
    // activación de orientación de pantalla
    screenOrientation.unlock(); 
    this.ocultar = false;
  }

  ionViewDidLoad() {
    
  }

  /**
   *  funcion que mapea en los input del DOM las notas seleccionadas
   * @param notas {obj} array de notas
   */
  seleccionarNota(notas,i) {
    this.ocultar = true;
    this.selectedItem = notas;
    this.corte1Input.nativeElement.innerText = notas.c1;
    this.corte2Input.nativeElement.innerText = notas.c2;
  }  

  /**
   * Funcion que calcula la nota del tercer corte para pasar el semestre
   */
                                                 
  calcularNota() {   
    this.ocultar = false;
    
    let c1 =parseInt( this.corte1Input.nativeElement.innerText);
    let c2 =parseInt( this.corte2Input.nativeElement.innerText);

    if (!(this.corte1Input.nativeElement.innerText === "")) {
      let nota1 = c1  * 3;
      let nota2 = c2  * 3;
      let res = parseFloat(((300 -(nota1+nota2)) /40).toFixed(1));   
      this.mensaje.nativeElement.innerText = "Con " + res + " Pasas la materia en 3.0 \n" +  this.msgNotas(res);
    } else {
      
      let toast = this.toastCtrl.create({
        message: 'Seleccionar Materia',
        duration: 1500,
        position: 'bottom',
        cssClass:''
      });
      toast.present();      
    }
  }

/**
 * 
 * @param res {} objeto que contiene los mensajes seleccionados para cada rango
 * @returns {string} retorna el mensaje destinado segun el random
 */

    msgNotas(res){
    let random = Math.round(Math.random()*2);
    let rango;

    var mensajes=[{

      rango:2,msgArray:["Eres un Sabelotodo","Eres un Genio","Eres un Master"] 
    },
    {
      rango:3,msgArray:["Aún puedes mejorar","Seguro es una materia de relleno","Animo!! El semestre no se acaba"] 
    },
    {
      rango:4,msgArray:["Esfuerzate mas","Solicita tutorias","Pide ayuda a un amigo"] 
    },
    {
      rango:5,msgArray:["Mejor vende Avon","Necesitas un milagro","Ni resando pasas"] 
    }];

    
    if (res > 1 && res < 2) {
      
      rango= 2;
  
      for (let index = 0; index < mensajes.length; index++) {
        
        if(mensajes[index].rango === rango)
        return mensajes[index].msgArray[random];
        
      }
      
    } else if (res > 2 && res < 3) {
      rango= 3;
  
      for (let index = 0; index < mensajes.length; index++) {
        
        if(mensajes[index].rango === rango)
        return mensajes[index].msgArray[random];
        
      }
      
    } else if (res > 3 && res < 4) {
      rango= 4;
  
      for (let index = 0; index < mensajes.length; index++) {
        
        if(mensajes[index].rango === rango)
        return mensajes[index].msgArray[random];
        
      }
      
    } else if (res > 4 && res < 5) {
      rango= 5;
  
      for (let index = 0; index < mensajes.length; index++) {
        
        if(mensajes[index].rango === rango)
        return mensajes[index].msgArray[random];
        
      }
    }
  }

  // array  de notas 
  notas = [
    {
      asignatura:'Calculo',c1:35,c2:40,c3:50
    },
    {
      asignatura:'Base de Datos',c1:30,c2:42,c3:10
    },
    {
      asignatura:'Programacion Web',c1:25,c2:30,c3:40
    },
    {
      asignatura:'Programacion f',c1:25,c2:10,c3:40
    },
    {
      asignatura:'Administracion de base de datos ',c1:35,c2:40,c3:40
    },
    {
      asignatura:'Refinamiento de software',c1:50,c2:20,c3:40
    },
    {
      asignatura:'Proeyecto de grado I',c1:45,c2:32,c3:40
    }
  ]
}
