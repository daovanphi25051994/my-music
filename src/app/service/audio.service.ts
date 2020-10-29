import { Audio } from '../model/audio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const api = 'http://localhost:8082';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient) { }

  createAudio(file: File): Observable<Audio> {
    const formData: FormData = new FormData();
    formData.append('audio', file);
    return this.http.post(`${api}/api/audio`, formData);
  }
}
