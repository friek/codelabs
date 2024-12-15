import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
    selector: 'app-home',
    imports: [CommonModule, HousingLocationComponent],
    standalone: true,
    template: `
			<section>
				<form>
					<input type="text" placeholder="Filter by city" #filter>
					<button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
				</form>
			</section>
			<section class="results">
				@for (housingLocation of filteredLocationList; track housingLocation.id) {
					<app-housing-location [housingLocation]="housingLocation"></app-housing-location>
				}
			</section>
    `,
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    housingLocationList: HousingLocation[] = [];
    filteredLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);

    constructor() {
        this.housingService.getHousingLocations()
            .then(housingLocations => {
                this.housingLocationList = housingLocations;
                this.filteredLocationList = housingLocations;
            })
    }

    filterResults(text: string) {
        if (!text) {
            this.filteredLocationList = this.housingLocationList;
        } else {
            this.filteredLocationList = this.housingLocationList.filter(location =>
                location?.city.toLowerCase().includes(text.toLowerCase())
            );
        }
    }
}
