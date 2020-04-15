import { Component, OnInit } from '@angular/core';
import { Seal } from '../seal';
import { SealService } from '../seal.service';

@Component({
  selector: 'app-seal-gen',
  templateUrl: './seal-gen.component.html',
  styleUrls: ['./seal-gen.component.css']
})
export class SealGenComponent implements OnInit {
  seal: Seal;
  submitted = false;

  constructor(private sealService: SealService) { }

  ngOnInit(): void {
    this.newSeal();
  }

  onSubmit() {
    this.sealService.createSeal(this.seal).then((newSeal: Seal) => {
      this.submitted = true;
      this.seal = newSeal;
    });
  }

  newSeal() {
    this.seal = new Seal();
  }

}
