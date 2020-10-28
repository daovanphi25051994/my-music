import { CollectionImageService } from './../../service/collection-image.service';
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
  CollectionImageForm: FormGroup;
  fileToUpload: File = null;
  listFileToUpload: File[] = [];
  imgURL: string = "";
  listImgURL: string[] = [];
  listUser: User[] = [];
  audioURL: string;
  listImageRes: Image[] = [];

  constructor(private imageService : ImageService,
              private userService: UserService,
              private collectionImage: CollectionImageService) { }

  ngOnInit(): void {
    this.ProfileForm = new FormGroup({
      username: new FormControl(),
      avatar: new FormControl(),
      collectionImageList: new FormControl()
    });
    this.CollectionImageForm = new FormGroup({
      title: new FormControl(),
      listImage: new FormControl()
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
      // this.listUser.push(res)
      this.ProfileForm.reset()
      this.imgURL = ""
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
  }

  async uploadMultiImage(): Promise<void> {
    return new Promise(resolve => {
     
      for(let i = 0; i< this.listFileToUpload.length; i++) {
        this.imageService.createImage(this.listFileToUpload[i]).subscribe(res => {
          this.listImageRes.push(res);
        }, (err) => {
          console.log(err)
        })
      }
      this.CollectionImageForm.get("listImage").setValue(this.listImageRes);
      // console.log(this.CollectionImageForm.value)
      resolve();
    })
     
   }
  // previewAudio(files: FileList) {
  //   console.log(files)
  //   if(files.item(0).type.indexOf("audio") >= 0){
  //      this.fileToUpload = files.item(0)
  //      const reader = new FileReader();
  //      reader.readAsDataURL(this.fileToUpload);
  //      reader.onload = (_event) => { 
  //      this.audioURL = reader.result.toString(); 
  //      }
  //    } else {
  //      console.log("not audio")
  //    }
  // }
  // playAudio() {
  //   let audio = new Audio();
  //   audio.src = this.audioURL;
  //   audio.load();
  //   audio.play();
  // }

  async onSubmitCollectionImage() {
    // console.log(this.listFileToUpload)
    // console.log(this.CollectionImageForm.get("title").value)
    // await this.uploadImage();
    await this.uploadMultiImage();
    // console.log(this.CollectionImageForm.value)
    this.collectionImage.createCollection(this.CollectionImageForm.value).subscribe(res => {
      this.CollectionImageForm.reset()
      this.listImgURL = []
    }, err => {
      console.log("err")
    })

  }

  }
