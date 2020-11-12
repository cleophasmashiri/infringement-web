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
    { title: 'All Infringements', icon: 'clear_all', count: 0, activityId: '' },
    { title: 'Awaiting Driver Tasks', icon: 'face', count: 0, activityId: 'driverNominations' },
    { title: 'Awaiting Admin Tasks', icon: 'gavel', count: 0, activityId: 'reviewDriverInfrigement' },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getInstanceCountsByActivityId('').subscribe(
      allCounts => {
        /* eslint-disable no-console */
        console.log(allCounts);
        this.items[0].count = allCounts['count'];
      },
      () => (this.items[0].count = 10)
    );
    this.dashboardService.getInstanceCountsByActivityId('driverNominations').subscribe(
      allDriverNominationsCounts => (this.items[1].count = allDriverNominationsCounts['count']),
      () => (this.items[1].count = 0)
    );
    this.dashboardService.getInstanceCountsByActivityId('reviewDriverInfrigement').subscribe(
      reviewDriverInfrigement => (this.items[2].count = reviewDriverInfrigement['count']),
      () => (this.items[2].count = 20)
    );
  }
}
