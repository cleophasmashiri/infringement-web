import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInfringement } from 'app/shared/model/infringement.model';

@Component({
  selector: 'jhi-infringement-detail',
  templateUrl: './infringement-detail.component.html',
})
export class InfringementDetailComponent implements OnInit {
  infringement: IInfringement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infringement }) => (this.infringement = infringement));
  }

  previousState(): void {
    window.history.back();
  }
}
