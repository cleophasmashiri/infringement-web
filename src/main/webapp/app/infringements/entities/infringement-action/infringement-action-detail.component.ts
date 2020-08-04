import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInfringementAction } from 'app/shared/model/infringement-action.model';

@Component({
  selector: 'jhi-infringement-action-detail',
  templateUrl: './infringement-action-detail.component.html',
})
export class InfringementActionDetailComponent implements OnInit {
  infringementAction: IInfringementAction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infringementAction }) => (this.infringementAction = infringementAction));
  }

  previousState(): void {
    window.history.back();
  }
}
