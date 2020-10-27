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

  ProfileForm: FormGroup
  imageUploadUrl: any = 'faf'
  image: Image = null
  fileToUpload: File = null;
  src: any = null
  user: User;
  
  constructor(private imageService : ImageService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.ProfileForm = new FormGroup({
      username: new FormControl(),
      avatar: new FormControl()
    });
    this.userService.getUserProfile(5).subscribe(res => {
      this.user = res
    }, err => {
      console.log(err)
    })
  }
  
   uploadImage(files: FileList): void {
   this.fileToUpload = files.item(0)
   const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);    
      this.imageService.createImage(this.fileToUpload).subscribe(res => {
        this.src = reader.result
        this.ProfileForm.get("avatar").setValue(res)
      }, (err) => {
        console.log(err)
      })
  }
  onSubmit(): void {
    this.userService.createUser(this.ProfileForm.value).subscribe(res => {
      console.log(res)
    }, err => {
      console.log("err")
    })
  }
  }
