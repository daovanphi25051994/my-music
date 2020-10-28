import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Image } from './../../model/image';
import { ImageService } from './../../service/image.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ProfileForm: FormGroup;
  fileToUpload: File = null;
  listFileToUpload: File[] = [];
  imgURL: string;
  listImgURL: string[] = [];
  listUser: User[] = [];

  constructor(private imageService : ImageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.ProfileForm = new FormGroup({
      username: new FormControl(),
      avatar: new FormControl()
    });
    // this.userService.getUserProfile(5).subscribe(res => {
    //   this.user = res
    // }, err => {
    //   console.log(err)
    // })
  }
  
   previewImage(files: FileList): void {
     if(files.item(0).type.indexOf("image") >= 0){
      this.fileToUpload = files.item(0)
      const reader = new FileReader();
       reader.readAsDataURL(this.fileToUpload);
       reader.onload = (_event) => { 
         this.imgURL = reader.result.toString(); 
       }  
     } else {
       console.log("not image")
     }
  
  }
  async onSubmit(): Promise<void> {
   await this.uploadImage();
    this.userService.createUser(this.ProfileForm.value).subscribe(res => {
      this.listUser.push(res)
      this.ProfileForm.reset()
      this.imgURL = null
    }, err => {
      console.log("err")
    })
  }
 async uploadImage(): Promise<void> {
   return new Promise(resolve => {
    this.imageService.createImage(this.fileToUpload).subscribe(res => {
        this.ProfileForm.get("avatar").setValue(res)
        resolve();
      }, (err) => {
        console.log(err)
      })
   })
    
  }
  previewMultiImage(files: FileList) {
    if(files.item(0).type.indexOf("image") >= 0){
      this.listFileToUpload.push(files.item(0));
      const reader = new FileReader();
      reader.readAsDataURL(this.listFileToUpload[this.listFileToUpload.length - 1]);
      reader.onload = (_event) => { 
        this.listImgURL.push(reader.result.toString());  
      }  
     } else {
       console.log("not image")
     }
     console.log(this.listImgURL)
     console.log(this.listFileToUpload)
  }
  }
