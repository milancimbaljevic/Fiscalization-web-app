import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artikal } from 'src/models/artikal';
import { Narucioc } from 'src/models/narucioc';
import { Preduzece } from 'src/models/preduzece';
import { Stavka } from 'src/models/stavka';
import { ArtikalService } from '../artikal.service';
import { IzdavanjeRacunaService } from '../izdavanje-racuna.service';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-izdavanje-racuna',
  templateUrl: './izdavanje-racuna.component.html',
  styleUrls: ['./izdavanje-racuna.component.css']
})
export class IzdavanjeRacunaComponent implements OnInit {

  constructor(private router: Router, public racunService: IzdavanjeRacunaService, private preduzeceService: PreduzeceService,
    private artikalService: ArtikalService) { }

  preduzece: Preduzece
  izabrani_magacin_objekat: String
  trenutni_artikli: Array<Artikal> = []
  izabrani_artikal_string: String

  sto_selektovan: Boolean = false

  ngOnInit(): void {
    if (localStorage.getItem('preduzece') != null) {
      this.preduzece = JSON.parse(localStorage.getItem('preduzece'))
      console.log(this.preduzece)
      if (this.preduzece.prvi_login) {
        this.router.navigate(['dodatne_informacije'])
      } else {
        this.izabrani_magacin_objekat = this.preduzece.magacini_objekti[0].naziv
        this.artikalService.dohvatiSveArtikle({
          korisnicko_ime_preduzeca: this.preduzece.korisnicko_ime
        }).subscribe((art: Array<Artikal>) => {
          for (let a of art) {
            for (let st of a.stanja) {
              if (st.naziv_magacina_objekta == this.izabrani_magacin_objekat && st.tekuce_stanje_lagera > 0) {
                this.trenutni_artikli.push(a)
              }
            }
          }
          this.izabrani_artikal_string = this.trenutni_artikli[0].naziv
          if (this.racunService.izabrani_sto) {
            this.racunService.izabrani_sto.id_stola as number
            this.sto_selektovan = true
            this.id_stola = this.racunService.izabrani_sto.id_stola as number
          }

        })
      }
    } else {
      this.router.navigate(['prijava'])
    }
  }

  odjava() {
    localStorage.clear()
    this.router.navigate([''])
  }


  promijeniMagacinObjekat() {
    this.trenutni_artikli = []

    console.log(this.izabrani_magacin_objekat)
    this.artikalService.dohvatiSveArtikle({
      korisnicko_ime_preduzeca: this.preduzece.korisnicko_ime
    }).subscribe((art: Array<Artikal>) => {
      for (let a of art) {
        for (let st of a.stanja) {
          if (st.naziv_magacina_objekta == this.izabrani_magacin_objekat) {
            this.trenutni_artikli.push(a)
          }
        }
      }
      this.izabrani_artikal_string = this.trenutni_artikli[0].naziv
    })
  }


  dodajStavku() {
    this.poruka = ""
    if (this.preduzece.kategorija == 1 && !this.racunService.izabrani_sto_id) return

    this.poruke_za_modal = []

    // radi provjeru polja

    let broj_reg = /^\d+$/

    if (!broj_reg.test(this.kolicina + "")) {
      this.poruke_za_modal.push("Kolicina mora biti broj")
      this.otvori()
      return
    }


    let izabrani_artikal

    // uzimam objekat izabranog artikla
    for (let a of this.trenutni_artikli) {
      if (a.naziv == this.izabrani_artikal_string) {
        izabrani_artikal = a
      }
    }

    let st

    console.log("Kolicina: ", this.kolicina)

    // cijena: Number
    // magacin_ili_objekat: String
    // kolicina: Number
    // porez: Number
    // naziv_artikla: String

    for (let stanje of izabrani_artikal.stanja) {
      if (stanje.naziv_magacina_objekta == this.izabrani_magacin_objekat) {
        if (this.preduzece.u_pdv_sistemu) stanje.porez = 0
        st = {
          cijena: (+stanje.prodajna_cijena) * (+this.kolicina),
          magacin_ili_objekat: stanje.naziv_magacina_objekta,
          kolicina: this.kolicina,
          porez: izabrani_artikal.stopa_poreza,
          naziv_artikla: this.izabrani_artikal_string
        }
        break
      }
    }

    if (this.preduzece.kategorija == 1) { // ugostitelj
      this.racunService.stavke_stolova[+this.racunService.izabrani_sto.id_stola].push(st)
      console.log(this.racunService.stavke_stolova[+this.racunService.izabrani_sto.id_stola])
    } else {
      this.racunService.glavne_stavke.push(st)
      console.log(this.racunService.glavne_stavke)
    }

  }

  kolicina: number
  id_stola: number
  nacin_placanja: String = "gotovina"
  vrijednost_koju_je_kupac_dao: Number
  kusur: Number
  licna_karta: Number
  ime_kupca: String
  prezime_kupca: String
  broj_licne_karte_kupca: String
  broj_slip_racuna: Number
  narucioc_email: String

  brisiStavku(i) {
    if (this.preduzece.kategorija == 1) this.racunService.stavke_stolova[this.id_stola].splice(i, 1)
    else this.racunService.glavne_stavke.splice(i, 1)
  }

  poruka: String = ""
  broj_reg = /^\d+$/
  ime_prezime_reg = /^[A-Z][a-z]*$/

  zatvoriRacun() {
    let racun

    let narucioc

    this.poruke_za_modal = []

    if(this.preduzece.kategorija == 0) this.id_stola = 0 

    if(this.racunService.glavne_stavke.length == 0 && this.preduzece.kategorija == 0) { this.poruke_za_modal.push("Racun nema stavki"); this.id_stola = 0 }
    if(this.racunService.stavke_stolova[this.id_stola].length == 0 && this.preduzece.kategorija == 1) this.poruke_za_modal.push("Racun nema stavki")

    if (this.nacin_placanja == "gotovina") {

      if(!this.broj_reg.test(this.vrijednost_koju_je_kupac_dao+"")){
        this.poruke_za_modal.push("Vrijednost uplate mora biti broj")
      }

      if (this.broj_licne_karte_kupca) {
        if (!this.broj_reg.test(this.broj_licne_karte_kupca + "")) {
          this.poruke_za_modal.push("Broj licne karte smiju biti samo cifre od 0 do 9")
        }
      }
    } else if (this.nacin_placanja == "cek") {
      if (!this.broj_reg.test(this.broj_licne_karte_kupca + "")) {
        this.poruke_za_modal.push("Broj licne karte smiju biti samo cifre od 0 do 9")
      }
      if (!this.ime_prezime_reg.test(this.ime_kupca + "")) {
        this.poruke_za_modal.push("Neispravan oblik za ime")
      }
      if (!this.ime_prezime_reg.test(this.prezime_kupca + "")) {
        this.poruke_za_modal.push("Neispravan oblik za prezime")
      }
    } else if (this.nacin_placanja == "kartica") {
      if (!this.broj_reg.test(this.broj_licne_karte_kupca + "")) {
        this.poruke_za_modal.push("Broj licne karte smiju biti samo cifre od 0 do 9")
      }
      if (!this.broj_reg.test(this.broj_slip_racuna + "")) {
        this.poruke_za_modal.push("Broj slipa racuna mora sadrati samo cifre od 0 do 9")
      }
    } else if (this.nacin_placanja == "virman") {
      if(!this.narucioc_email){
        this.poruke_za_modal.push("Morate odabrati narucioca")
      }
    }

    if(this.poruke_za_modal.length != 0){
      this.otvori()
      return
    }

    for (let n of this.preduzece.narucioci) {
      if (n.email == this.narucioc_email) {
        narucioc = n
        break
      }
    }

    console.log(this.narucioc_email)

    const d = new Date()

    const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    const time = d.getTime()

    if (this.preduzece.kategorija == 1) {
      racun = {
        stavke: this.racunService.stavke_stolova[this.id_stola],
        nacin_placanja: this.nacin_placanja,
        iznos: 0,
        naziv_preduzeca: this.preduzece.naziv,
        datum: date,
        korisnicko_ime_preduzeca: this.preduzece.korisnicko_ime,
        narucioc: narucioc,
        podaci_o_kupcu: {
          ime: this.ime_kupca,
          prezime: this.prezime_kupca,
          broj_licne_karte_kupca: this.broj_licne_karte_kupca
        },
        ukupan_porez: 0,
        time: time,
        naziv_objekta: this.izabrani_magacin_objekat
      }


      for (let st of this.racunService.stavke_stolova[this.id_stola]) {
        racun.ukupan_porez += ((+st.cijena) / 100) * (+st.porez)
        racun.iznos += st.cijena // bez poreza
      }

      // if(this.nacin_placanja == "virman"){
      //   racun.ukupan_porez += (+racun.iznos/100) * (+narucioc.procenat_rabata)
      // }

    } else {
      racun = {
        stavke: this.racunService.glavne_stavke,
        nacin_placanja: this.nacin_placanja,
        iznos: 0,
        naziv_preduzeca: this.preduzece.naziv,
        datum: date,
        korisnicko_ime_preduzeca: this.preduzece.korisnicko_ime,
        narucioc: narucioc,
        podaci_o_kupcu: {
          ime: this.ime_kupca,
          prezime: this.prezime_kupca,
          broj_licne_karte_kupca: this.broj_licne_karte_kupca
        },
        ukupan_porez: 0,
        time: time,
        naziv_objekta: this.izabrani_magacin_objekat
      }

      for (let st of this.racunService.glavne_stavke) {
        racun.ukupan_porez += ((+st.cijena) / 100) * (+st.porez)
        racun.iznos += st.cijena
      }

      // if(this.nacin_placanja == "virman"){
      //   racun.ukupan_porez += (+racun.iznos/100) * (+narucioc.procenat_rabata)
      // }
    }



    console.log(racun)

    this.racunService.sacuvajRacun(racun).subscribe((res) => {
      if (this.preduzece.kategorija == 1) this.racunService.stavke_stolova[this.id_stola] = []
      else this.racunService.glavne_stavke = []
      this.poruka = "Uspjesno ste zatvorili racun"
    })

  }

  izracunajKusur() {
    let u = 0

    if (this.preduzece.kategorija == 1) {
      for (let st of this.racunService.stavke_stolova[this.id_stola]) {
        u += +st.cijena
      }
    } else {
      for (let st of this.racunService.glavne_stavke) {
        u += +st.cijena
      }
    }

    this.kusur = +this.vrijednost_koju_je_kupac_dao - u

    if (this.kusur < 0) this.kusur = 0

  }

  displayStyle: String = "none"
  poruke_za_modal: Array<String> = []

  otvori() {
    this.displayStyle = "block"
  }

  zatvori() {
    this.displayStyle = "none"
  }

}
