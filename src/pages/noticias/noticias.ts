import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WordpressProvider} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html',
})
export class NoticiasPage {

  public wpPosts;
  morePagesAvailable:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private wp:WordpressProvider) {
  }

  ionViewDidLoad() {
    this.getPosts();
   
  }
  ionViewDidEnter() {
    this.morePagesAvailable = true;
  }
  

  getPosts(){
    this.wp.getRecentPosts(1).subscribe(data =>{
      this.wpPosts = data;
      data
      console.log(this.wpPosts)
    })

  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.wpPosts.length/10)) + 1;
    let loading = true;
  
    this.wp.getRecentPosts(page)
    .subscribe(data => {
      
      
      for(let post of data[0]){
        if(!loading){
          infiniteScroll.complete();
          }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.wpPosts.push(post);
        loading = false;
        }
      }, err => {
      this.morePagesAvailable = false;
      })
    }

    postTapped(event, post) {
      this.navCtrl.push(PostPage, {
        item: post
      });
    }

}
