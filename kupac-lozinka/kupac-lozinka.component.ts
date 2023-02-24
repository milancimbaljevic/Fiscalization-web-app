import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kupac } from 'src/models/kupac';
import { Preduzece } from 'src/models/preduzece';
import { KupacService } from '../kupac.service';

@Component({
  selector: 'app-kupac-lozinka',
  templateUrl: './kupac-lozinka.component.html',
  styleUrls: ['./kupac-lozinka.component.css']
})
export class KupacLozinkaComponent implements OnInit {

  constructor(private router: Router, private kupacService: KupacService) { }

  kupac: Kupac

  ngOnInit(): void {
    if (localStorage.getItem('kupac') != null) {
      this.kupac = JSON.parse(localStorage.getItem('kupac'))
    }else this.router.navigate([''])
  }

  odjava(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
