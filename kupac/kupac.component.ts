import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from 'src/models/artikal';
import { Kupac } from 'src/models/kupac';
import { Preduzece } from 'src/models/preduzece';
import { ArtikalService } from '../artikal.service';
import { KupacService } from '../kupac.service';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css']
})
export class KupacComponent implements OnInit {

  constructor(private router: Router, private kupacService: KupacService, private artikalService: ArtikalService) { }

  kupac: Kupac
  sva_preduzeca: Array<Preduzece> = []
  artikli_za_prikaz: Array<Artikal> = []


  ngOnInit(): void {
    if (localStorage.getItem('kupac') != null) {
      this.kupac = JSON.parse(localStorage.getItem('kupac'))

      this.kupacService.dohvatiSvaPreduzeca().subscribe((pred: Array<Preduzece>) => this.sva_preduzeca = pred)

    }else this.router.navigate([''])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

  pretraga: String
  artikalModal: String = "none"
  izabrano_preduzece_k_i: String

  trazi(){
    this.kupacService.dohvatiArtikle({korisnicko_ime_preduzeca: this.izabrano_preduzece_k_i, pretraga: this.pretraga}).subscribe((res: Array<Artikal>) => {
      this.artikli_za_prikaz = res
      console.log(res)
    })
  }

  otvoriArtikal(){
    this.artikalModal = "block"
  }

  zatvoriArtikal(){
    this.artikalModal = "none"
  }

  prikaziArtikle(korisnicko_ime_preduzeca){
    this.izabrano_preduzece_k_i = korisnicko_ime_preduzeca
    this.artikalService.dohvatiSveArtikle({korisnicko_ime_preduzeca: korisnicko_ime_preduzeca}).subscribe((res: Array<Artikal>)=>{
      this.artikli_za_prikaz = res
      this.otvoriArtikal()
    })
  }

  izabran_artikal_za_pregled: Artikal

  prikaziStanja(art){
    this.izabran_artikal_za_pregled = art
    this.otvoriPregledStanja()
  }

  pregledStanjaModal: String = "none"

  otvoriPregledStanja(){
    this.pregledStanjaModal = "block"
  }

  zatvoriPregledStanja(){
    this.pregledStanjaModal = "none"
  }

}
