import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/models/admin';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-prijava',
  templateUrl: './admin-prijava.component.html',
  styleUrls: ['./admin-prijava.component.css']
})
export class AdminPrijavaComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  displayStyle: String = "none"

  zatvori() {
    this.displayStyle = "none"
  }
  otvori() {
    this.displayStyle = "block"
  }

  korisnicko_ime: String
  lozinka: String
  poruke_za_modal: Array<String> = []

  korisnicko_ime_reg = /^[a-zA-Z][a-zA-Z0-9_]*$/
  lozinka_reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/

  uloguj() {
    this.poruke_za_modal = []

    if (!this.lozinka_reg.test(this.lozinka+"")) {
      this.poruke_za_modal.push("Sifra mora imati minimalno 8, maksimalno 12 karaktera. Bar jedno veliko slovo, specijalni karakter i broj. Mora pocinjati velikim slovom.")
    }

    if (!this.korisnicko_ime_reg.test(this.korisnicko_ime+"")) {
      this.poruke_za_modal.push("Korisnicko ime nije u ispravnom obliku")
    }

    if (this.poruke_za_modal.length == 0) {
      this.authService.ulogujAdmin({korisnicko_ime: this.korisnicko_ime, lozinka: this.lozinka}).subscribe((ad: Admin) => {
        if(ad['stat'] == 'not'){
          this.poruke_za_modal.push(ad['message'])
          this.otvori()
        }else{
          localStorage.setItem('admin', JSON.stringify(ad))
          this.router.navigate(['admin-zahtjevi'])
        }
      })
    } else {
      this.otvori()
    }

  }

}
