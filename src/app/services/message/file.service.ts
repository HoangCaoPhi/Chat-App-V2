import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  postFile(file: FormData, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-STRINGEE-AUTH': token,
      })
    };
    return this.http.post(`https://api.stringee.com/v1/file/upload?uploadType=multipart`, file, httpOptions);
  }

  postFileDatabase(convId: string, content: string, filePath: string, type: number, typeOf: string): Observable<any> {
    var options = {
      convId: convId,
      content: content,
      filePath: filePath,
      type: type,
      typeOf: typeOf
    }
    console.log(options)
    return this.http.post<any>('https://localhost:44378/api/Files', options);
  }

  getAllFile(convId: string) {
    return this.http.get<any>('https://localhost:44378/api/Files/' + convId);
  }

}
