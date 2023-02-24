import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/models/admin';
import { AdminRes } from 'src/models/AdminRes';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-pregled',
  templateUrl: './admin-pregled.component.html',
  styleUrls: ['./admin-pregled.component.css']
})
export class AdminPregledComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  active: Number
  datum: String
  res: AdminRes
  preduzeca_pregled: Array<AdminRes> = []

  admin: Admin

  ngOnInit(): void {
    if (localStorage.getItem('admin') != null) {
      this.admin = JSON.parse(localStorage.getItem('admin'))
    } else this.router.navigate([''])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

  datumIzabran(){
    const a = this.datum.split('-')[0]
    const b = this.datum.split('-')[1]
    const c = this.datum.split('-')[2]

    const dat = a + '-' + (+b) + '-' + c

    console.log(dat)

    this.adminService.dohvatiIzvjestaj({datum: dat}).subscribe((iz: Array<AdminRes>) => this.preduzeca_pregled = iz)

  }

}
