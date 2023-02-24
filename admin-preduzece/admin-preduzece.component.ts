import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/models/admin';

@Component({
  selector: 'app-admin-preduzece',
  templateUrl: './admin-preduzece.component.html',
  styleUrls: ['./admin-preduzece.component.css']
})
export class AdminPreduzeceComponent implements OnInit { 
  
  constructor(private router: Router) { }

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
}
