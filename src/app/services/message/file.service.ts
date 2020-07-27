import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }
  /**
   * Gửi file lên server của Stringee
   * @param file Thêm trường file form data
   * @param token Token được trả về tử server
   */
  postFile(file: FormData, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-STRINGEE-AUTH': token,
      })
    };
    return this.http.post(`https://api.stringee.com/v1/file/upload?uploadType=multipart`, file, httpOptions);
  }
  /**
   * Gửi file lên server net core
   * @param convId Id của cuộc trò chuyện
   * @param content Nội dung của file
   * @param filePath Đường dẫn của file được trả về từ Stringee
   * @param type Loại của file, 2 là ảnh 5 là file
   * @param typeOf Lấy ra đuôi như docx, pptx....
   */
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

  /**
   * Lấy ra file từ server
   * @param convId Id của cuộc trò chuyện
   */
  getAllFile(convId: string) {
    return this.http.get<any>('https://localhost:44378/api/Files/getAllFiles?convId=' + convId);
  }
  getAllImages(convId: string) {
    return this.http.get<any>('https://localhost:44378/api/Files/getAllImages?convId=' + convId);
  }
  getTakeFiles(convId: string) {
    return this.http.get<any>('https://localhost:44378/api/Files/getFiles?convId=' + convId);
  }
  getTakeImages(convId: string) {
    return this.http.get<any>('https://localhost:44378/api/Files/getImages?convId=' + convId);
  }
}
