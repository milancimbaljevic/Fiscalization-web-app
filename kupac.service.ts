import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KupacService {

  constructor(private http: HttpClient) { }

  dohvatiSvaPreduzeca() {
    return this.http.get("http://localhost:4000/preduzece/dohvatiSvaPreduzeca")
  }

  dohvatiArtikle(data) {
    return this.http.post("http://localhost:4000/kupac/dohvatiArtikle", data)
  }

  dohvatiMojeRacune(data) {
    return this.http.post("http://localhost:4000/kupac/dohvatiMojeRacune", data)
  }

}
