import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  teste() {
    console.log("entrei em api teste");
    this.http.get("https://api-elton.herokuapp.com/api/users").subscribe(data =>{
      console.log(data);
    })
  }
}
