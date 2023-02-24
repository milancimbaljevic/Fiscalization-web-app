import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Narucioc } from 'src/models/narucioc';
import { Preduzece } from 'src/models/preduzece';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-narucioci',
  templateUrl: './narucioci.component.html',
  styleUrls: ['./narucioci.component.css']
})
export class NaruciociComponent implements OnInit {

  constructor(private router: Router, private preduzeceServis: PreduzeceService) { }

  preduzece: Preduzece

  logo_link: String
  active: Number
  tip_unosa: String = "pib"
  pib_za_trazenje: String
  preduzece_unos: Preduzece

  ngOnInit(): void {
    if (localStorage.getItem('preduzece') != null) {
      this.preduzece = JSON.parse(localStorage.getItem('preduzece'))
      this.logo_link = "http://localhost:4000/" + this.preduzece.logo
      if (this.preduzece.prvi_login) {
        this.router.navigate(['dodatne_informacije'])
      }
    } else {
      this.router.navigate(['prijava'])
    }
  }

  odjava() {
    localStorage.clear()
    this.router.navigate([''])
  }

  poruka: String = ""

  trazi() {
    if (this.pib_za_trazenje == this.preduzece.PIB + "") {
      this.poruka = "Ne mozete dodati sami sebe"
      return
    }

    this.preduzeceServis.traziPIB({ PIB: this.pib_za_trazenje }).subscribe((pred: Preduzece) => {
      if (pred) {
        this.preduzece_unos = pred
        this.poruka = ""
      } else {
        this.poruka = "Ne postoji preduzece sa trazenim PIB-om"
      }
    })
  }

  broj_dana_z_p: Number
  procenat_rabata: Number
  poruka_za_uspjeh: String = ""

  dodajUNarucioce() {
    this.poruka = ""
    this.poruka_za_uspjeh = ""

    if (this.tip_unosa != 'pib') {
      this.poruke_za_modal = []
      if (!this.ime_prezime_reg.test(this.ime)) {
        this.poruke_za_modal.push("Ime mora pocinjati velikim slovom i smije sadrzati samo slova")
      }

      if (!this.ime_prezime_reg.test(this.prezime)) {
        this.poruke_za_modal.push("Prezime mora pocinjati velikim slovom i smije sadrzati samo slova")
      }

      if (!this.korisnicko_ime_reg.test(this.korisnicko_ime)) {
        this.poruke_za_modal.push("Korisnicko ime mora pocinjati slovom")
      }

      if (!this.telefon_reg.test(this.telefon)) {
        this.poruke_za_modal.push("Kontakt telefon pocinje znakom + i mora imati 9 ili vise cifara")
      }

      if (!this.email_reg.test(this.email)) {
        this.poruke_za_modal.push("Email nije u ispravnom obliku (pr. mail@service.com)")
      }

      if (!this.postanski_broj_reg.test(this.postanski_broj + "")) {
        this.poruke_za_modal.push("Postanski broj mora imati jednu ili vise cifara")
      }

      if (!this.ulica_i_broj_reg.test(this.ulica_i_broj)) {
        this.poruke_za_modal.push("Ulica i broj mora biti obilika IME_ULICE BROJ")
      }

      if (!this.pib_reg.test(this.pib + "")) {
        this.poruke_za_modal.push("PIB je devetocifreni broj koji ne smije pocinjati nulom")
      }
      
      if (!this.maticni_broj_reg.test(this.maticni_broj + "")) {
        this.poruke_za_modal.push("Maticni broj je desetocifreni broj")
      }

      if (!this.broj_reg.test(this.procenat_rabata + "")) {
        this.poruke_za_modal.push("Procenat rabata mora biti broj")
      }

      if (!this.broj_reg.test(this.broj_dana_z_p + "")) {
        this.poruke_za_modal.push("Broj dana za placanje mora biti broj")
      }

      if (this.ekstenzija != 'png' && this.ekstenzija != 'jpg') {
        this.poruke_za_modal.push("Logo mora biti png ili jpg")
      }

      if (this.visina > 300 || this.visina < 100 || this.sirina > 300 || this.sirina < 100) {
        this.poruke_za_modal.push("Min velicina grba 100x100px, maks velicina grb 300x300px")
      }

      if (!this.selektovana) {
        this.poruke_za_modal.push("Morate izabrati logo")
      }

      if (this.poruke_za_modal.length != 0) {
        this.otvori()
        return
      }
    }

    if (this.tip_unosa != "pib") {

      const formData = new FormData()

      formData.append("ime", this.ime)
      formData.append("prezime", this.prezime)
      formData.append("korisnicko_ime", this.preduzece.korisnicko_ime + "")
      formData.append("lozinka", this.preduzece.lozinka + "")
      formData.append("telefon", this.telefon)
      formData.append("email", this.email)
      formData.append("naziv_preduzeca_porucioca", this.naziv_preduzeca)
      formData.append("drzava", this.drzava)
      formData.append("naziv", this.naziv_preduzeca)
      formData.append("grad", this.grad)
      formData.append("postanski_broj", this.postanski_broj + "")
      formData.append("ulica_i_broj", this.ulica_i_broj)
      formData.append("maticni_broj", this.maticni_broj + "")
      formData.append("PIB", this.pib + "")
      formData.append("broj_dana_za_placanje", this.broj_dana_z_p + "")
      formData.append("procenat_rabata", this.procenat_rabata + "")
      formData.append("logo", this.logo, this.email)

      this.preduzeceServis.dodajUNarucioceRucno(formData).subscribe((res) => {
        if (res['stat'] != "ok") {
          this.poruka = res['message']
          return
        }

        this.poruka_za_uspjeh = "Uspjesno ste dodali preduzece u narucioce"

        this.preduzeceServis.dohvatiKorisnika({ korisnicko_ime: this.preduzece.korisnicko_ime, lozinka: this.preduzece.lozinka }).subscribe((pred: Preduzece) => {
          this.preduzece = pred
          localStorage.setItem('preduzece', JSON.stringify(this.preduzece))
        })
      })

    }



    else {
      this.preduzeceServis.dodajUNarucioce({
        korisnicko_ime: this.preduzece.korisnicko_ime,
        lozinka: this.preduzece.lozinka,
        narucioc: {
          naziv: this.preduzece_unos.naziv,
          broj_dana_za_placanje: this.broj_dana_z_p,
          procenat_rabata: this.procenat_rabata,
          ime: this.preduzece_unos.ime,
          prezime: this.preduzece_unos.prezime,
          telefon: this.preduzece_unos.telefon,
          email: this.preduzece_unos.email,
          naziv_preduzeca_porucioca: this.preduzece_unos.naziv,
          drzava: this.preduzece_unos.drzava,
          grad: this.preduzece_unos.grad,
          postanski_broj: this.preduzece_unos.postanski_broj,
          ulica_i_broj: this.preduzece_unos.ulica_i_broj,
          maticni_broj: this.preduzece_unos.maticni_broj,
          logo: this.preduzece_unos.logo,
          PIB: this.pib_za_trazenje
        }
      }).subscribe((res) => {
        if (res['stat'] != "ok") {
          this.poruka = res['message']
          return
        }

        this.poruka_za_uspjeh = "Uspjesno ste dodali preduzece u narucioce"

        this.preduzeceServis.dohvatiKorisnika({ korisnicko_ime: this.preduzece.korisnicko_ime, lozinka: this.preduzece.lozinka }).subscribe((pred: Preduzece) => {
          this.preduzece = pred
          localStorage.setItem('preduzece', JSON.stringify(this.preduzece))
        })
      })
    }
  }

  viseInformacija(naruc: Narucioc) {
    this.narucioc_vise_informacija = naruc
    this.otvoriViseInformacija()
  }


  ime: string
  prezime: string
  korisnicko_ime: string
  telefon: string
  email: string
  naziv_preduzeca: string
  drzava: string
  grad: string
  postanski_broj: Number
  ulica_i_broj: string
  pib: Number
  maticni_broj: Number
  path: String | ArrayBuffer

  selektovana: Boolean = false
  ekstenzija: string = ""
  logo: File

  sirina: Number
  visina: Number

  onChange(event) {
    this.selektovana = true
    this.logo = event.target.files[0]
    this.ekstenzija = this.logo.name.split('.').pop()

    console.log(this.logo.name)
    console.log(this.ekstenzija)


    const reader = new FileReader();
    reader.onload = (e) => {
      this.path = reader.result
    }

    reader.onloadend = (e) => {
      let img = new Image()
      img.src = reader.result! as string
      this.sirina = img.naturalWidth
      this.visina = img.naturalHeight

      console.log(this.sirina)
      console.log(this.visina)
    }
    reader.readAsDataURL(this.logo);

  }

  ime_prezime_reg = /^[A-Z][a-z]*$/
  korisnicko_ime_reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
  lozinka_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/
  telefon_reg = /^\+\d{9,}$/
  email_reg = /^[a-zA-Z][a-zA-Z0-9]*@[a-z]+\.([a-z]+\.)*[a-z]+$/
  postanski_broj_reg = /^\d{1,}$/
  ulica_i_broj_reg = /^[A-Z][A-Za-z ]+ \d{1,}$/
  pib_reg = /^[1-9][0-9]{8,8}$/
  maticni_broj_reg = /^\d{10,10}$/
  broj_reg = /^\d+$/

  poruke_za_modal = []

  displayStyle = "none"

  narucioc_vise_informacija: Narucioc

  zatvori() {
    this.displayStyle = "none"
  }
  otvori() {
    this.displayStyle = "block"
  }

  vise_informacija_modal: String = "none"

  otvoriViseInformacija() {
    this.vise_informacija_modal = "block"
  }

  zatvoriViseInformacija() {
    this.vise_informacija_modal = "none"
  }
}