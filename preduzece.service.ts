import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private http: HttpClient) { }

  posaljiDodatneInformacije(data){
    return this.http.post("http://localhost:4000/preduzece/unesiDodatneInformacije", data)
  }

  dohvatiKorisnika(data){
    return this.http.post("http://localhost:4000/preduzece/dohvatiPreduzece", data)
  }

  promijeniLozinku(stara_lozinka, nova_lozinka, korisnicko_ime, tip_korisnika){
    return this.http.post("http://localhost:4000/preduzece/promijeniLozinku",{stara_lozinka: stara_lozinka, lozinka: nova_lozinka, korisnicko_ime: korisnicko_ime, tip_korisnika: tip_korisnika})
  }

  traziPIB(data){
    return this.http.post("http://localhost:4000/preduzece/dohvatiPIB", data)
  }

  dodajUNarucioce(data){
    return this.http.post("http://localhost:4000/preduzece/dodajNarucioca",data)
  }

  dodajUNarucioceRucno(data){
    return this.http.post("http://localhost:4000/preduzece/dodajNaruciocaRucno",data)
  }

  dohvatiSvaOdeljenja(data){
    return this.http.post("http://localhost:4000/preduzece/dohvatiSvaOdeljenja",data)
  }
  
  oznaciStoKaoSlobodan(data){
    return this.http.post("http://localhost:4000/preduzece/oznaciStoKaoSlobodan",data)
  }

  oznaciStoKaoZauzet(data){
    return this.http.post("http://localhost:4000/preduzece/oznaciStoKaoZauzet",data)
  }

  sacuvajNovuLokacijuStola(data){
    return this.http.post("http://localhost:4000/preduzece/sacuvajNovuLokacijuStola",data)
  }

  dohvatiPetRacuna(){
    return this.http.get("http://localhost:4000/preduzece/dohvatiPetRacuna")
  }

  dohvatiUkupanIznosRacunaZaDatum(data){
    return this.http.post("http://localhost:4000/preduzece/dohvatiUkupanIznosRacunaZaDatum",data)
  }

  dohvatiRacunePreduzecaZaDatum(data){
    return this.http.post("http://localhost:4000/preduzece/dohvatiRacunePreduzecaZaDatum",data)
  }

  dodajOdeljenje(data){
    return this.http.post("http://localhost:4000/preduzece/dodajOdaljenje",data)
  }

  
  dodajStoUOdaljenje(data){
    return this.http.post("http://localhost:4000/preduzece/dodajStoUOdaljenje",data)
  }

  promijeniStatusPreduzeca(data){
    return this.http.post("http://localhost:4000/preduzece/promijeniStatusPreduzeca",data)
  }

}
