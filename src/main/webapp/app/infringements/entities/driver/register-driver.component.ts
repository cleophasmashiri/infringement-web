import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-register-driver',
    templateUrl: './register-driver.component.html',
})
export class RegisterDriverComponent implements OnInit {

    background: any = undefined;
    links = [{
        url: 'infringements/user',
        name: 'User Details'
    }, {
        url: 'infringements/drivers',
        name: 'Driver Details'
    }
    ];
    activeLink = this.links[0];

    ngOnInit(): void {
    }

}