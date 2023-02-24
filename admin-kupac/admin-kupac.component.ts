import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/models/admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-kupac',
  templateUrl: './admin-kupac.component.html',
  styleUrls: ['./admin-kupac.component.css']
})
export class AdminKupacComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  admin: Admin

  poruke_za_modal: Array<String> = []

  ime: string
  prezime: string
  korisnicko_ime: string
  lozinka: string
  telefon: string
  broj_licne_karte: string

  ime_prezime_reg = /^[A-Z][a-z]*$/
  korisnicko_ime_reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
  lozinka_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
  telefon_reg = /^\+\d{9,}$/
  broj_reg = /^\d+/

  ngOnInit(): void {
    if (localStorage.getItem('admin') != null) {
      this.admin = JSON.parse(localStorage.getItem('admin'))
    } else this.router.navigate([''])
  }

  odjava() {
    localStorage.clear()
    this.router.navigate([''])
  }

  dodajKupca() {
    this.poruke_za_modal = []

    if (!this.ime_prezime_reg.test(this.ime)) {
      this.poruke_za_modal.push("Ime mora pocinjati velikim slovom i smije sadrzati samo slova")
    }

    if (!this.ime_prezime_reg.test(this.prezime)) {
      this.poruke_za_modal.push("Prezime mora pocinjati velikim slovom i smije sadrzati samo slova")
    }

    if (!this.lozinka_reg.test(this.lozinka)) {
      this.poruke_za_modal.push("Sifra mora imati minimalno 8, maksimalno 12 karaktera. Bar jedno veliko slovo, specijalni karakter i broj. Mora pocinjati velikim slovom.")
    }

    if (!this.korisnicko_ime_reg.test(this.korisnicko_ime)) {
      this.poruke_za_modal.push("Korisnicko ime mora pocinjati slovom")
    }

    if (!this.telefon_reg.test(this.telefon)) {
      this.poruke_za_modal.push("Kontakt telefon pocinje znakom + i mora imati 9 ili vise cifara")
    }

    if (!this.broj_reg.test(this.broj_licne_karte)) {
      this.poruke_za_modal.push("Broj licne karte mora sadrzati jednu ili vise cifara")
    }

    if (this.poruke_za_modal.length == 0) {
      this.adminService.dodajKupca({
        ime: this.ime,
        prezime: this.prezime,
        korisnicko_ime: this.korisnicko_ime,
        lozinka: this.lozinka,
        telefon: this.telefon,
        broj_licne_karte: this.broj_licne_karte,
        tip_korisnika: "kupac"
      }).subscribe((res) => {
        if (res['stat'] == 'not') {
          this.poruke_za_modal.push(res['message'])
          this.otvori()
        } else {
          this.poruka = res['message']
          this.otvori1()
        }
      })
    } else {
      this.otvori()
    }

  }



  displayStyle: String = "none"
  displayStyleSuccess: String = "none"

  poruka: String = ""

  zatvori() {
    this.displayStyle = "none"
  }
  otvori() {
    this.displayStyle = "block"
  }

  zatvori1() {
    this.displayStyleSuccess = "none"
  }
  otvori1() {
    this.displayStyleSuccess = "block"
  }


}


