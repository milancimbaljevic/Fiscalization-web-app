import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from 'src/models/preduzece';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-zahtjevi',
  templateUrl: './admin-zahtjevi.component.html',
  styleUrls: ['./admin-zahtjevi.component.css']
})
export class AdminZahtjeviComponent implements OnInit {

  svi_zahtjevi: Array<Preduzece> = []
  aktivni: Array<Preduzece> = []

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    if (localStorage.getItem('admin') == null) {
      this.router.navigate([''])
    }else{
      this.adminService.dohvatiZahtjeve().subscribe((zaht: Array<Preduzece>) => this.svi_zahtjevi = zaht)
      this.adminService.dohvatiAktivne().subscribe((a: Array<Preduzece>) => this.aktivni = a)

    }
  }

  prihvatiZahtjev(p: Preduzece){
    this.adminService.odbiIliPrihvatiPreduzece({korisnicko_ime: p.korisnicko_ime, status: "aktivan"}).subscribe((r)=>{
      this.adminService.dohvatiZahtjeve().subscribe((zaht: Array<Preduzece>) => this.svi_zahtjevi = zaht)
      this.adminService.dohvatiAktivne().subscribe((a: Array<Preduzece>) => this.aktivni = a)
    })
  }

  odbiZahtjev(p: Preduzece){
    this.adminService.odbiIliPrihvatiPreduzece({korisnicko_ime: p.korisnicko_ime, status: "neaktivan"}).subscribe((r)=>{
      this.adminService.dohvatiZahtjeve().subscribe((zaht: Array<Preduzece>) => this.svi_zahtjevi = zaht)
      this.adminService.dohvatiAktivne().subscribe((a: Array<Preduzece>) => this.aktivni = a)
    })
  }

  odjava() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
