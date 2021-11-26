import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PostService } from "../post.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(private postService: PostService, private router:Router) { }

  ngOnInit(): void {
    this.newForm();
  }

  // Validation for form
  newForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  // get controler value
  get f(){
    return this.form.controls;
  }

  // post data from form to api url post method
  submit() {
    this.postService.create(this.form.value).subscribe (res => {
      this.router.navigateByUrl('post/index')
    })
  }
}
