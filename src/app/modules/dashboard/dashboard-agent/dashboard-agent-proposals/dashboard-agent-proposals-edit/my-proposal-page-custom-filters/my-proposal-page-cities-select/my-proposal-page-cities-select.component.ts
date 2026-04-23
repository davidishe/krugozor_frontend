import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ICity } from 'src/app/models/main/city';
import { ICountry } from 'src/app/models/main/country';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-my-proposal-page-cities-select',
  templateUrl: './my-proposal-page-cities-select.component.html',
  styleUrls: ['./my-proposal-page-cities-select.component.css']
})
export class MyProposalPageCitiesSelectComponent implements OnInit {

  @Input() items: any[];
  @Input() selectedCitiesForCheck: ICity[] = [];
  @Input() initialCities: ICity[] = [];
  @Input() initialCountries: ICountry[] = [];
  @Output() setSelectedCities = new EventEmitter();
  isOpened: boolean = false
  curentHoverElementId: number = 0;
  selectedCities: ICity[] = [];


  constructor(
    // private proposalService: ProposalsService
  ) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event) {
    
    if (event?.target?.attributes.id?.nodeValue === 'dropdowncustom')
      this.isOpened = !this.isOpened;      

    if (event?.target?.attributes?.id?.nodeValue !== 'dropdowncustom')
      this.isOpened = false;      
  }


  ngOnInit() {
    this.selectedCities = this.initialCities;
  }

  openAutoconplete() {
    this.isOpened = !this.isOpened;
  }

  isHovered(event) {
    this.curentHoverElementId = +event.target?.id;
  }

  setCity(city: ICity) {

    const isAlreadyChoised = this.selectedCities.filter(z => +z?.id === city.id).length;
    if(isAlreadyChoised > 0)
      this.selectedCities = this.selectedCities.filter(z => z.id !== city.id);
      
    else
      this.selectedCities.push(city);

    this.setSelectedCities.emit(this.selectedCities);
  }

  removeSpecificCity(city: ICity) {
    this.selectedCities = this.selectedCities.filter(z => z.id !== city.id);
    this.setSelectedCities.emit(this.selectedCities);
  }


  isSelected(cityId: number) {

    const isExist = this.selectedCitiesForCheck.filter(z => z.id === cityId).length;
    if(isExist > 0)
      return true;
    else
      return false;
  }
}
