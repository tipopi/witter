import {Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import { BlogAddMsgService } from './blog-add-msg.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogAddService} from "./blog-add.service";
import {Tag} from "../../../../model/tag";
import { Blog } from 'src/app/model/blog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css'],
  providers:[BlogAddService]
})
export class BlogAddComponent implements OnInit {
  @Input()
  item:Blog;
  @Output()
  closeWindow = new EventEmitter<boolean>();
  public Editor = ClassicEditor;
  public config = {
    language: 'zh-cn'
  };
  isAdd=false;
  group:FormGroup;
  tags:Tag[]=[];

  constructor(private blogAddMsgService:BlogAddMsgService,
              private fb: FormBuilder,
              private service:BlogAddService) {
  }
  setEditForm(){
    this.group=this.fb.group({
      content: [this.item.content,Validators.required],
      description: [this.item.description],
      tagIn:['']
    });
    this.tags=this.item.tags;
  }

  setAddForm(){
      this.group=this.fb.group({
        title: [null, [Validators.required]],
        content: [null,Validators.required],
        description: [null],
        tagIn:['']
      });
  }
  addTag(){
    let tag=this.group.get("tagIn").value;
    if(tag.length>10){
      // this.erro='字符不能超过10';
      return;
    }else if(this.tags.length>=3){
      // this.erro='最多加三个标签';
    }else if(!this.tags.find(t=>t.name==tag)&&tag!=''){
      this.tags.push({id:0,name:tag});
    }
    this.group.get("tagIn").setValue('');

  }


  ngAfterViewInit() {
  }
  ngOnInit() {
    if(this.item){
      this.setEditForm();
    }else{
      this.isAdd=true;
      this.setAddForm();
    }
  }
  onSubmit(){
    for (const key in this.group.controls) {
      this.group.controls[key].markAsDirty();
      this.group.controls[key].updateValueAndValidity();
    }
    if(this.group.invalid){
      return;
    }
    const blog={
      ...this.group.value,
      tags:this.tags
    };
    this.compare(blog);
    if(this.isAdd){
      this.service.addBlog(blog).subscribe((result:any)=>{
        if(result.meta.code==1){
          this.close();
        }
      });
    }else {
      this.service.updateBlog(this.compare(blog)).subscribe((result : any) => {
        if(result.meta.code==1){
          console.log();//TODO提示
        }
      });
    }
  }
  compare(blog:Blog){
    blog.description=blog.description==this.item.description?null:blog.description;
    blog.content = blog.content == this.item.content?null : blog.content;
    blog.tags = blog.tags.filter(tag=>tag.id==0);
    blog.blogId=this.item.blogId;
    blog.contentId=this.item.contentId;
    console.log(blog);
    return blog;
  }
  close(){
    this.isAdd=false;
    this.item=null;
    this.tags=[];
    this.group.reset();
    this.closeWindow.emit();
  }
}
