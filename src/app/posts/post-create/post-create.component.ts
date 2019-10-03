import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  mode: string = 'new';

  constructor(public postsService: PostsService, 
              public route: ActivatedRoute,
              public router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.get('postId')) {
        this.mode = 'edit';
        this.postsService.getPostById(params.get('postId')).subscribe(post => {
          this.post = {id: post.post._id, title: post.post.title, content: post.post.content};
        });
      } else {
        this.mode = 'new';
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if(this.mode == 'new') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost({id: this.post.id, title: form.value.title, content: form.value.content});
      
    }
    form.resetForm();
  }
}
