import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Odeljenje } from 'src/models/odeljenje';
import { Preduzece } from 'src/models/preduzece';
import { Racun } from 'src/models/racun';
import { Stavka } from 'src/models/stavka';
import { Sto } from 'src/models/sto';

@Injectable({
  providedIn: 'root'
})
export class IzdavanjeRacunaService {

  sva_odeljenja: Array<Odeljenje>
  izabrano_odeljenje: Odeljenje
  izabrano_odeljenje_string: String
  izabrani_sto: Sto
  preduzece: Preduzece
  izabrani_sto_id: number = -1

  glavne_stavke: Array<Stavka> = []
  stavke_stolova: Array<Array<Stavka>> = []

  constructor(private http: HttpClient) {
    for(let i=0; i<100; i++){
      this.stavke_stolova.push([])
    }
  }

  sacuvajRacun(data){
      return this.http.post("http://localhost:4000/preduzece/sacuvajRacun", data)
  }

}



