import {AudioService} from '../../service/audio.service';
import {CollectionImage} from './../../model/collection-image';
import {CollectionImageService} from './../../service/collection-image.service';
import {UserService} from './../../service/user.service';
import {User} from './../../model/user';
import {Image} from './../../model/image';
import {ImageService} from './../../service/image.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ProfileForm: FormGroup;
  CollectionImageForm: FormGroup;
  AudioForm: FormGroup;
  fileToUpload: File = null;
  listFileToUpload: File[] = [];
  imgURL = '';
  listImgURL: string[] = [];
  listUser: User[] = [];
  collectionImage: CollectionImage;
  audioURL: string;
  listImageRes: Image[] = [];
  audio = new Audio();

  constructor(private imageService: ImageService,
              private userService: UserService,
              private collectionImageService: CollectionImageService,
              private audioService: AudioService) {
  }

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
    this.AudioForm = new FormGroup({
      audioName: new FormControl(),
    });
    // this.userService.getUserProfile(5).subscribe(res => {
    //   this.user = res
    // }, err => {
    //   console.log(err)
    // })
  }

  previewImage(files: FileList): void {
    if (files.item(0).type.indexOf('image') >= 0) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.imgURL = reader.result.toString();
      };
    } else {
      console.log('not image');
    }

  }

  async onSubmit(): Promise<void> {
    await this.uploadImage();
    this.userService.createUser(this.ProfileForm.value).subscribe(res => {
      // this.listUser.push(res)
      this.ProfileForm.reset();
      this.imgURL = '';
    }, err => {
      console.log('err');
    });
  }

  async uploadImage(): Promise<void> {
    return new Promise(resolve => {
      this.imageService.createImage(this.fileToUpload).subscribe(res => {
        this.ProfileForm.get('avatar').setValue(res);
        resolve();
      }, (err) => {
        console.log(err);
      });
    });
  }

  previewMultiImage(files: FileList): void {
    if (files.item(0).type.indexOf('image') >= 0) {
      this.listFileToUpload.push(files.item(0));
      const reader = new FileReader();
      reader.readAsDataURL(this.listFileToUpload[this.listFileToUpload.length - 1]);
      reader.onload = () => {
        this.listImgURL.push(reader.result.toString());
      };
    } else {
      console.log('not image');
    }
  }

  async uploadMultiImage(): Promise<void> {
    return new Promise(resolve => {
      for (const file of this.listFileToUpload) {
        this.imageService.createImage(file).subscribe(res => {
          this.listImageRes.push(res);
        }, (err) => {
          console.log(err);
        });
      }
      // this.CollectionImageForm.get('listImage').setValue(this.listImageRes);
      console.log(this.listImageRes);
      resolve();
    });
  }


  previewAudio(files: FileList): void {
    console.log((files.item(0).size));
    if (files.item(0).type.indexOf('audio') >= 0 && files.item(0).size < 1000000) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.audioURL = reader.result.toString();
      };
    } else {
      console.log('not audio or size large');
    }
  }

  openAudio(): void {
    this.audio.src = this.audioURL;
    this.audio.load();
    this.audio.play();
  }

  pauseAudio(): void {
    this.audio.pause();
  }

  playAudio(): void {
    this.audio.play();
  }

  uploadAudio(): void {
    this.audioService.createAudio(this.fileToUpload).subscribe(res => {
      console.log('ok');
      console.log(res);
    }, err => {
      console.log('err');
    });
  }

  // async createCollection(): Promise<void> {
  //   return new Promise(resolve => {
  //     this.collectionImageService.createCollection(this.CollectionImageForm.value).subscribe(res => {
  //       // this.CollectionImageForm.reset()
  //       // this.listImgURL = []
  //       this.collectionImage = res;
  //       resolve();
  //     }, err => {
  //       console.log("err")
  //     })
  //  })
  // }
}
