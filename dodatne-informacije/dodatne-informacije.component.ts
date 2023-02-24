import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kasa } from 'src/models/kasa';
import { MagacinObjekat } from 'src/models/magacin_objekat';
import { Preduzece } from 'src/models/preduzece';
import { ZiroRacun } from 'src/models/ziro_racun';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-dodatne-informacije',
  templateUrl: './dodatne-informacije.component.html',
  styleUrls: ['./dodatne-informacije.component.css']
})
export class DodatneInformacijeComponent implements OnInit {

  constructor(private router: Router, private preduzeceServis: PreduzeceService) { }

  kategorija: String = "prodavnica"
  sifre_delatnosti: Array<Number> = []
  u_sistemu_pdv: Boolean
  ziro_racuni: Array<ZiroRacun> = []
  ime_banke: String = ""
  ziro_racun: Number

  preduzece: Preduzece

  ngOnInit(): void {
    if (localStorage.getItem('preduzece') != null) {
      this.preduzece = JSON.parse(localStorage.getItem('preduzece'))
    } else {
      this.router.navigate(['prijava'])
    }
  }

  odjava() {
    localStorage.clear()
    this.router.navigate([''])
  }

  dodajSifruDelatnosti() {
    console.log(this.sifre_delatnosti)
  }

  dodajZiroRacun() {
    if (this.ime_banke == "") {
      this.poruke = []
      this.poruke.push("Unesite ime banke")
      this.otvori()
      return
    }

    if (!/^\d\d\d\-\d\d\d\d\d\d\d\d\d\d\d\d\-\d\d$/.test(this.ziro_racun + "")) {
      this.poruke = []
      this.poruke.push("Ziro racun mora biti oblika [3_cifre]-[12_cifara]-[2_cifre]")
      this.otvori()
      return
    }

    this.ziro_racuni.push({ banka: this.ime_banke, broj_racuna: this.ziro_racun })
    this.ime_banke = ""
    this.ziro_racun = null
    console.log(this.ziro_racuni)
  }

  magacini: Array<MagacinObjekat> = []
  broj_magacina: number = 0;
  naziv_magacina: String = ""

  dodajMagacin() {
    if (this.naziv_magacina == "") {
      this.poruke = []
      this.poruke.push("Unesite naziv magacina")
      this.otvori()
      return
    }

    this.magacini.push({ id: ++this.broj_magacina, naziv: this.naziv_magacina })
    this.naziv_magacina = ""
    console.log(this.magacini)
  }

  lokacija_objekta: String = ""
  tip_kase: String = "tip1"
  kase: Array<Kasa> = []

  dodajKasu() {
    if (this.lokacija_objekta == "") {
      this.poruke = []
      this.poruke.push("Unesite lokaciju objekta")
      this.otvori()
      return
    }

    this.kase.push({ lokacija: this.lokacija_objekta, tip: this.tip_kase })
    this.lokacija_objekta = ""
  }

  poruke: Array<String> = []

  unesiPodatke() {
    this.poruke = []

    if (this.sifre_delatnosti.length == 0) {
      this.poruke.push("Morate imati makar jednu sifru djelatnosti")
    }

    if (this.broj_magacina == 0) {
      this.poruke.push("Morate imati makar jedan magacin")
    }

    if (this.kase.length == 0) {
      this.poruke.push("Morate imati makar jednu kasu")
    }

    if (this.ziro_racuni.length == 0) {
      this.poruke.push("Morate imati makar jedan ziro racun")
    }

    if (this.poruke.length == 0) {

      let kat: Number = 0
      if (this.kategorija == "ugostitelj") kat = 1

      this.preduzeceServis.posaljiDodatneInformacije({
        korisnicko_ime: this.preduzece.korisnicko_ime,
        kategorija: kat,
        sifra_delatnosti: this.sifre_delatnosti,
        u_pdv_sistemu: this.u_sistemu_pdv,
        ziro_racuni: this.ziro_racuni,
        broj_fiskalnih_kasa: this.kase.length,
        broj_magacina: this.broj_magacina,
        magacini_objekti: this.magacini,
        kase: this.kase
      }).subscribe((res) => {
        if (res['stat'] == 'ok') {
          this.preduzeceServis.dohvatiKorisnika({ korisnicko_ime: this.preduzece.korisnicko_ime, lozinka: this.preduzece.lozinka })
            .subscribe((pred: Preduzece) => {
              this.preduzece = pred
              localStorage.clear()
              localStorage.setItem("preduzece", JSON.stringify(this.preduzece))
              this.router.navigate(['preduzece'])
            })
        } else {
          this.msg = "Greska u radu sistema"
        }
      })
    } else {
      this.otvori()
    }

  }

  msg: String = ""

  displayStyle = "none"

  zatvori() {
    this.displayStyle = "none"
  }
  otvori() {
    this.displayStyle = "block"
  }

  brisiMagacin(i){
    this.magacini.splice(i,1)
  }

  brisiRacun(i){
    this.ziro_racuni.splice(i,1)
  }
}
