import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DaUser } from '../../DaUser';
import {Observable} from 'rxjs'
import { RequestDTO } from '../../interfaces/RequestDTO';
import { ResponseDTO } from '../../interfaces/ResponseDto';
@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private httpClient:HttpClient) {

   }
   public GetObjects(Request:RequestDTO,url:string):Observable<ResponseDTO>{
    return this.httpClient.post<ResponseDTO>(url,Request)
   }
}
