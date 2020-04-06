import {Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import { BlogAddMsgService } from './blog-add-msg.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogAddService} from "./blog-add.service";
import {Tag} from "../../../../model/tag";
import { Blog } from 'src/app/model/blog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
import {NzMessageService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";
import { UserService } from 'src/app/framework/service/user.service';
import {mergeMap} from "rxjs/operators";
export class FileUploadAdapter{
  service:BlogAddService;
  constructor(private loader,private editor) {
    this.service=editor.config.get("service");
  }

  upload() {
    return this.loader.file
      .then( file => {
        return new Promise((resolve, reject) => {
           this.service.getToken().pipe(mergeMap((res: any) => {
            return this.service.upload(file, res.token);
          })).subscribe(
             (resp: any) => {
               this.service.putImg(resp.key);
               resolve({
                 default: "http://q6oagnj2q.bkt.clouddn.com/"+resp.key
               });
             },
             (err) => reject(err));

        });
      })
  }

  abort() {
    // Abort current upload process.
  }
}
export function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new FileUploadAdapter(loader,editor);
  };
}

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
  closeWindow = new EventEmitter<Blog>();
  public editor = ClassicEditor;
  public config;
  isAdd=false;
  group:FormGroup;
  tags:Tag[]=[];
  imgKeys:string[]=[];
  tagColor=new Map([
    [0,'magenta'],
    [1,'purple'],
    [2,'blue'],
    [3,'volcano']
  ]);
  token;

  constructor(private blogAddMsgService:BlogAddMsgService,
              private fb: FormBuilder,
              private service:BlogAddService,
              private nzMessage:NzMessageService,
              private userService:UserService
  ) {
      this.config = {
      language: 'zh-cn',
      service,
      extraPlugins: [CustomUploadAdapterPlugin]
    };
    this.userService.tokenObs$.subscribe(token=>this.token=token);
    this.service.imgObs$.subscribe(key=>{
      this.imgKeys.push(key);
    })
  }

  setEditForm(){
    this.group=this.fb.group({
      content: [this.item.content,Validators.required],
      description: [this.item.description],
      tagIn:['']
    });
    this.tags=[...this.item.tags];
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
      tags:this.tags,
      images:this.imgKeys
    };
    if(this.isAdd){
      this.service.addBlog(blog,this.token).subscribe((result:any)=>{
        if(result){
          this.close();
          this.nzMessage.info("发布成功");
        }else {
          this.nzMessage.error("服务器错误");
        }
        this.userService.setToken(result.meta.token);
      });
    }else {
      this.service.updateBlog(this.compare(blog)).subscribe((result : any) => {
        if(result){
            this.close(result.data);
            this.nzMessage.info("编辑成功");
        }else {
          this.nzMessage.error("服务器错误");
        }
        this.userService.setToken(result.meta.token);
      });
    }
  }
  compare(blog:Blog){
    blog.description=blog.description==this.item.description?null:blog.description;
    blog.content = blog.content == this.item.content?null : blog.content;
    blog.tags = blog.tags.filter(tag=>tag.id==0);
    blog.blogId=this.item.blogId;
    blog.contentId=this.item.contentId;
    return blog;
  }
  close(item?:Blog){
    this.isAdd=false;
    this.item=null;
    this.tags=[];
    this.group.reset();
    this.closeWindow.emit(item);
  }
}
