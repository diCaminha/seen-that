import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  
  constructor(private _http: HttpClient){}

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {  
    this._http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
      .pipe(map((resData) => {
          return resData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
      }))
      .subscribe((posts) => {
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id:null, title: title, content: content};
    this._http.post<{message:string, post: Post}>('http://localhost:3000/api/posts', post).subscribe((resData) => {
      console.log(resData.message);
      this.posts.push(resData.post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(id: string) {
    this._http.delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe(() => {
        console.log('deleted!');
      });
  }
}
