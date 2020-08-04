import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInfringementAction, InfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionService } from './infringement-action.service';
import { IInfringement } from 'app/shared/model/infringement.model';
import { InfringementService } from '../infringement/infringement.service';

@Component({
  selector: 'jhi-infringement-action-update',
  templateUrl: './infringement-action-update.component.html',
})
export class InfringementActionUpdateComponent implements OnInit {
  isSaving = false;
  infringements: IInfringement[] = [];

  editForm = this.fb.group({
    id: [],
    processInstanceId: [],
    notes: [],
    infringementActionType: [],
    dateDone: [],
    doneBy: [],
    infringement: [],
  });

  constructor(
    protected infringementActionService: InfringementActionService,
    protected infringementService: InfringementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infringementAction }) => {
      if (!infringementAction.id) {
        const today = moment().startOf('day');
        infringementAction.dateDone = today;
      }

      this.updateForm(infringementAction);

      this.infringementService.query().subscribe((res: HttpResponse<IInfringement[]>) => (this.infringements = res.body || []));
    });
  }

  updateForm(infringementAction: IInfringementAction): void {
    this.editForm.patchValue({
      id: infringementAction.id,
      processInstanceId: infringementAction.processInstanceId,
      notes: infringementAction.notes,
      infringementActionType: infringementAction.infringementActionType,
      dateDone: infringementAction.dateDone ? infringementAction.dateDone.format(DATE_TIME_FORMAT) : null,
      doneBy: infringementAction.doneBy,
      infringement: infringementAction.infringement,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const infringementAction = this.createFromForm();
    if (infringementAction.id !== undefined) {
      this.subscribeToSaveResponse(this.infringementActionService.update(infringementAction));
    } else {
      this.subscribeToSaveResponse(this.infringementActionService.create(infringementAction));
    }
  }

  private createFromForm(): IInfringementAction {
    return {
      ...new InfringementAction(),
      id: this.editForm.get(['id'])!.value,
      processInstanceId: this.editForm.get(['processInstanceId'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      infringementActionType: this.editForm.get(['infringementActionType'])!.value,
      dateDone: this.editForm.get(['dateDone'])!.value ? moment(this.editForm.get(['dateDone'])!.value, DATE_TIME_FORMAT) : undefined,
      doneBy: this.editForm.get(['doneBy'])!.value,
      infringement: this.editForm.get(['infringement'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInfringementAction>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IInfringement): any {
    return item.id;
  }
}
