import { CollectionImage } from './../model/collection-image';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const api = "http://localhost:8082"

@Injectable({
  providedIn: 'root'
})
export class CollectionImageService {

  constructor(private http: HttpClient) { }

  createCollection(collectionImage: CollectionImage): Observable<CollectionImage> {
    return this.http.post(`${api}/api/collections`, collectionImage)
  }
}
