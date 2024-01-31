import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

const API_URL = 'http://localhost:8080/api/music/';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  // add
  addMusic(formData : any): Observable<any>
  {
    return this.http.post(API_URL + 'add', formData,{ responseType: 'text' }).pipe(map((res: any) => JSON.parse(res)));
  }

  getAllMusic(data : any): Observable<any> {
    return this.http.post(API_URL + 'list' ,data,{ responseType: 'text' }).pipe(map((res: any) => JSON.parse(res)));
  }

  getOneMusic(id : any): Observable<any> {
    return this.http.get(API_URL + 'one/' + id)
  }

  getAllMusicCount(): Observable<any> {
    return this.http.get(API_URL + 'count')
  }

  deletemusic(id : any): Observable<any>
  {
    return this.http.delete(API_URL + 'delete/' +id,{ responseType: 'text' }).pipe(map(res => JSON.parse(res)));
  }

  updateMusic(formdata : any): Observable<any>
  {
    return this.http.put(API_URL + 'update',formdata,{ responseType: 'text' }).pipe(map(res => JSON.parse(res)));
  }

  getSearchMusic(data : any)
  {
    return this.http.post(API_URL + 'search',data,{ responseType: 'text' }).pipe(map(res => JSON.parse(res)));
  }
  

}
