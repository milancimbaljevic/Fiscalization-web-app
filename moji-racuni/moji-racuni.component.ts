import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kupac } from 'src/models/kupac';
import { Racun } from 'src/models/racun';
import { KupacService } from '../kupac.service';

@Component({
  selector: 'app-moji-racuni',
  templateUrl: './moji-racuni.component.html',
  styleUrls: ['./moji-racuni.component.css']
})
export class MojiRacuniComponent implements OnInit {

  constructor(private router: Router, private kupacService: KupacService) { }

  kupac: Kupac
  moji_racuni: Array<Racun> = []
  izabran_racun: Racun

  ngOnInit(): void {
    if(localStorage.getItem('kupac') == null){
      this.router.navigate([''])
      return
    }
    this.kupac = JSON.parse(localStorage.getItem('kupac'))
    this.kupacService.dohvatiMojeRacune({broj_licne_karte_kupca: this.kupac.broj_licne_karte}).subscribe((r: Array<Racun>) => this.moji_racuni = r)
  }

  pregledStavkiModal: String = 'none'

  otvoriPregledStavki(){
    this.pregledStavkiModal = 'block'
  }

  zatvoriPregledStavki(){
    this.pregledStavkiModal = 'none'
  }

  izaberiRacun(r){
    this.izabran_racun = r
    this.otvoriPregledStavki()
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
