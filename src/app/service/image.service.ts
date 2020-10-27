import { Image } from './../model/image';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const api = "http://localhost:8082"

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  createImage(file: File): Observable<Image> {
    const formData: FormData = new FormData()
    formData.append('file', file)
    return this.http.post(`${api}/api/images`, formData)
  }
}
