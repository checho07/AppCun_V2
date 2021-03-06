
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiVimeoProvider {

  
//Variables

 private options : any;
 private headersParams: any;
 private TusheadersParams: any;
 private vimeoURl:string;
 
 //Fin Variables

  constructor(public http: HttpClient) {
   
  this.vimeoURl = "https://api.vimeo.com";

  this.headersParams =
  {
       "Content-Type": "application/json",
       "Accept": "application/vnd.vimeo.*+json;version=3.4",
       "Authorization": "Bearer 08093dbf7ad01a80be3218b4201ad054"
   };
   this.TusheadersParams =
   {
       "Tus-Resumable":"1.0.0",
        "Content-Type": "application/offset+octet-stream",
        "Upload-Offset": "0"
    };
  }
  
 //Fin Constructor


 PatchVideo(video,uploadLink){
  this.options={

    headers: this.TusheadersParams,
    observe:'response',
    responseProgress:true
    
 }
return this.http.patch(uploadLink,video,this.options)
 
 
 

 }

 POST_tus(videoInfo){
    this.options={

    headers: this.headersParams,
    
    body: 
    JSON.stringify({

      upload:
      {
          approach:"tus",
          redirect_url:"http://localhost:8100",
          size: videoInfo.size
      },
      name : videoInfo.nombre,
      description:videoInfo.descripcion,
     
      embed:
      {
        buttons:
        {
          embed:false,
          fullscreen:true,
          hd:false,
          like:true,
          share:false,
          watchlater:false
        },
      playbar:false,
      title:
        {
        name:"show",
        owner:"hide",
        portrait:"hide"
        },
      privacy:
        {
        download:false,
        embed:"private",
        view:"nobody"
        }
    }
    })
 }
  return this.http.post<any>(this.vimeoURl +"/me/videos",this.options.body,this.options)

 }

/**
 * Funcion que realiza un http Post request, que retorna los permisos y formulario, para hacer un upload de un video a vimeo.
 * @param videoInfo informacion para subir el video (nombre,descripcion).
 */
  uploadVideo(videoInfo){

    this.options={

      headers: this.headersParams,
      body: 
      JSON.stringify({

        upload:
        {
            approach:"post",
            redirect_url:"http://localhost:8100"
        },
        name : videoInfo.videoName,
        description:videoInfo.description,
        size: 2000,
        embed:
        {
          buttons:
          {
            embed:false,
            fullscreen:true,
            hd:false,
            like:true,
            share:false,
            watchlater:false
          },
        playbar:false,
        title:
          {
          name:"show",
          owner:"hide",
          portrait:"hide"
          },
        privacy:
          {
          download:false,
          embed:"private",
          view:"nobody"
          }
      }
      })
   }
    return this.http.post<any>(this.vimeoURl +"/me/videos",this.options.body,this.options)
   }

   /**
    * Funcion que realiza un http get request a vimeo Api, que trae como resultado los videos de la galeria CunApp
    */
  getVideos()
  {
    this.options ={

      headers: this.headersParams

    }
    return this.http.get(this.vimeoURl + "/me/albums/5273466/videos",this.options)
  }

 

  getComments(URI){
    this.options ={

      headers: this.headersParams

    }
    return this.http.get(this.vimeoURl + URI,this.options)
  }
  postComment(videoId,comment:string,user){
  
    this.options={

      headers: this.headersParams,
      body: 
      JSON.stringify({
       text:"Nombre:"+user+":comentario:"+comment
      })
   }
    return this.http.post<any>(this.vimeoURl +"/videos/" + videoId + "/comments",this.options.body,this.options)
   }
 


}
