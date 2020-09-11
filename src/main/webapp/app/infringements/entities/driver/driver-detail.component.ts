import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDriver } from 'app/shared/model/driver.model';

@Component({
  selector: 'jhi-driver-detail',
  templateUrl: './driver-detail.component.html',
})
export class DriverDetailComponent implements OnInit {
  @Input()
  driver: IDriver | null = null;

  @Output()
  goBackToList = new EventEmitter();

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ driver }) => (this.driver = driver));
  }

  previousState(): void {
    this.goBackToList.emit();
  }
}
