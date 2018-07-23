import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class WordpressProvider {

  private WORDPRESS_REST_API_URL:String;
  constructor(public http: HttpClient) {
   this.WORDPRESS_REST_API_URL = "https://www.cun.edu.co/cunmedia/wp-json/wp/v2/";
  }

getRecentPosts(page){
  return this.http.get(this.WORDPRESS_REST_API_URL+'posts?page='+page);
}



}
