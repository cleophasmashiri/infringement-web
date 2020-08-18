import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'app/core/user/user.model';

@Component({
    selector: 'jhi-register-driver',
    templateUrl: './register-driver.component.html',
})
export class RegisterDriverComponent implements OnInit {

    @Input()
    driverEmail?: string;
    
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

    handleRegisterUser(email: string){
        this.driverEmail = email;
    }
    driverCreated(){

    }

    ngOnInit(): void {
    }

}