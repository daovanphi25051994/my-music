import { Image } from './../../model/image';
import { ImageService } from './../../service/image.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
  src: any;
  constructor(private imageService : ImageService) { }

  ngOnInit(): void {
  }
  
  uploadImage(files: FileList): void {
    this.fileToUpload = files.item(0)
    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    this.imageService.createImage(this.fileToUpload).subscribe(res => {
      this.image = res
      this.src = reader.result
    }, (err) => {
      console.log(err)
    })
  }
  onSubmit(): void {

  }
  }
