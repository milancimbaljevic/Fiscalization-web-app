import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kupac } from 'src/models/kupac';
import { Preduzece } from 'src/models/preduzece';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  korisnicko_ime: string
  lozinka: string

  korisnicko_ime_reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
  lozinka_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/

  poruke_za_modal: Array<String> = []

  ngOnInit(): void {
  }

  uloguj() {
    this.poruke_za_modal = []

    if (!this.lozinka_reg.test(this.lozinka)) {
      this.poruke_za_modal.push("Sifra mora imati minimalno 8, maksimalno 12 karaktera. Bar jedno veliko slovo, specijalni karakter i broj. Mora pocinjati velikim slovom.")
    }

    if (!this.korisnicko_ime_reg.test(this.korisnicko_ime)) {
      this.poruke_za_modal.push("Korisnicko ime nije u ispravnom obliku")
    }

    if (this.poruke_za_modal.length == 0) {
      this.authService.uloguj({ korisnicko_ime: this.korisnicko_ime, lozinka: this.lozinka }).subscribe((pred: Preduzece) => {
        console.log(pred)
        if (pred['stat'] == 'not') {
          this.poruke_za_modal.push(pred['message'])
          this.otvori()
        } else {

          console.log("pred",pred.tip_korisnika)

          if(pred["tip_korisnika"] != "preduzece"){ // znaci da je u pitanju kupac
            console.log("cao")
            localStorage.setItem('kupac', JSON.stringify(pred))
            this.router.navigate(['kupac'])
            return
          }

          localStorage.setItem('preduzece', JSON.stringify(pred))
          if (pred.prvi_login) {
            this.router.navigate(['dodatne_informacije'])
          } else {
              this.router.navigate(['preduzece'])
          }
        }
      })
    } else {
      this.otvori()
    }

  }

  displayStyle: String = "none"

  zatvori() {
    this.displayStyle = "none"
  }
  otvori() {
    this.displayStyle = "block"
  }

}
