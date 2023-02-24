import { Component, OnInit } from '@angular/core';
import { Racun } from 'src/models/racun';
import { PreduzeceService } from '../preduzece.service';

@Component({
  selector: 'app-naslovna',
  templateUrl: './naslovna.component.html',
  styleUrls: ['./naslovna.component.css']
})
export class NaslovnaComponent implements OnInit {

  constructor(private preduzeceService: PreduzeceService) { }

  ngOnInit(): void {
    this.dohvatiPetRacuna()
  }

  racuni: Array<Racun> = []

  dohvatiPetRacuna(){
    this.preduzeceService.dohvatiPetRacuna().subscribe((r: Array<Racun>) => {
      this.racuni = r
    })
  }

}
