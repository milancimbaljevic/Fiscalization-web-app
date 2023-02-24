import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from 'src/models/preduzece';
import { Racun } from 'src/models/racun';
import { Res } from 'src/models/res';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-pregled-izvjestaja',
  templateUrl: './pregled-izvjestaja.component.html',
  styleUrls: ['./pregled-izvjestaja.component.css']
})
export class PregledIzvjestajaComponent implements OnInit {

  constructor(private router: Router, private preduzeceService: PreduzeceService) { }

  preduzece: Preduzece
  logo_link: String
  active: Number
  datum: String
  res: Res

  svi_racuni: Array<Racun> = []

  ngOnInit(): void {
    if(localStorage.getItem('preduzece') != null){
      this.preduzece = JSON.parse(localStorage.getItem('preduzece'))
      this.logo_link = "http://localhost:4000/"+this.preduzece.logo
      if(this.preduzece.prvi_login){
        this.router.navigate(['dodatne_informacije'])
      }
    }else{
      this.router.navigate(['prijava'])
    }
  }

  datumIzabran(){
    const a = this.datum.split('-')[0]
    const b = this.datum.split('-')[1]
    const c = this.datum.split('-')[2]

    const dat = a + '-' + (+b) + '-' + c

    this.preduzeceService.dohvatiUkupanIznosRacunaZaDatum({datum: dat, korisnicko_ime_preduzeca:this.preduzece.korisnicko_ime}).subscribe((r: Res)=>{
      this.res = r
    })

    this.preduzeceService.dohvatiRacunePreduzecaZaDatum({datum: dat, korisnicko_ime_preduzeca:this.preduzece.korisnicko_ime},)
      .subscribe((r: Array<Racun>) => this.svi_racuni = r) 

  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
