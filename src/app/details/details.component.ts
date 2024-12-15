import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-details',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
			<article>
				<img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photo of {{ housingLocation?.name }}">
				<section class="listing-description">
					<h2 class="listing-heading">{{ housingLocation?.name }}</h2>
					<p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
				</section>
				<section class="listing-features">
					<h2 class="section-heading">About this location</h2>
					<ul>
						<li>Units available: {{ housingLocation?.availableUnits }}</li>
						<li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
						<li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
						<li></li>
					</ul>
				</section>
				<section class="listing-apply">
					<h2 class="section-heading">Apply to live here</h2>
					<form [formGroup]="applyForm" (submit)="submitApplication()">
						<label for="first-name">First Name</label> <input id="first-name" type="text" formControlName="firstName">

						<label for="last-name">last Name</label> <input id="last-name" type="text" formControlName="lastName">

						<label for="email">Email</label> <input id="email" type="text" formControlName="email">

						<button type="submit" class="primary">Apply</button>
					</form>
				</section>
			</article>
    `,
    styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingLocation: HousingLocation | undefined;
    housingService: HousingService = inject(HousingService);
    applyForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
    });

    constructor() {
        this.housingService.getHousingLocationById(Number(this.route.snapshot.params['id']))
            .then(housingLocation => {
                this.housingLocation = housingLocation;
            })
    }

    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? '',
        );
    }
}
