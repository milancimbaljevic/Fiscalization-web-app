import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preduzece } from 'src/models/preduzece';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  constructor(private router: Router) { }

  preduzece: Preduzece

  logo_link: String

  active: Number

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

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
