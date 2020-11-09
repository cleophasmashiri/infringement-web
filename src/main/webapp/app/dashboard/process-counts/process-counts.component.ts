import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'jhi-process-counts',
  templateUrl: './process-counts.component.html',
  styleUrls: ['./process-counts.component.scss'],
})
export class ProcessCountsComponent implements OnInit {
  allCounts = 0;
  allDriverNominationsCounts = 0;
  reviewDriverInfrigement = 0;

  items = [
    { title: 'All Infringements', icon: 'clear_all', count: this.allCounts, activityId: '' },
    { title: 'Awaiting Driver Tasks', icon: 'face', count: this.allDriverNominationsCounts, activityId: 'driverNominations' },
    { title: 'Awaiting Admin Tasks', icon: 'gavel', count: this.reviewDriverInfrigement, activityId: 'reviewDriverInfrigement' },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getInstanceCountsByActivityId('').subscribe(
      allCounts => (this.items[0].count = allCounts),
      () => (this.items[0].count = 0)
    );
    this.dashboardService.getInstanceCountsByActivityId('driverNominations').subscribe(
      allDriverNominationsCounts => (this.items[1].count = allDriverNominationsCounts),
      () => (this.items[1].count = 0)
    );
    this.dashboardService.getInstanceCountsByActivityId('reviewDriverInfrigement').subscribe(
      reviewDriverInfrigement => (this.items[2].count = reviewDriverInfrigement),
      () => (this.items[2].count = 0)
    );
  }
}
