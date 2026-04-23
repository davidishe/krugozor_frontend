import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ICity } from 'src/app/models/main/city';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-tw-autocomplete-select',
  templateUrl: './tw-autocomplete-select.component.html',
  styleUrls: ['./tw-autocomplete-select.component.css']
})
export class TwAutocompleteSelectComponent implements OnInit {
  @Input() items!: any[];
  isOpened: boolean = false
  curentHoverElementId: number = 0;

  constructor(
    private proposalService: ProposalsService
  ) { }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    
    if (event?.target?.attributes.id?.nodeValue === 'dropdowncustom')
      this.isOpened = !this.isOpened;      

    if (event?.target?.attributes?.id?.nodeValue !== 'dropdowncustom')
      this.isOpened = false;      
  }


  ngOnInit() {
  }

  openAutoconplete() {
    this.isOpened = !this.isOpened;
  }

  isHovered(event: any) {
    this.curentHoverElementId = +event.target?.id;
  }

  setCity(city: ICity) {
    // console.log(city);
    const params = this.proposalService.getQueryParams();

    console.log(city.id);
    
    const isAlreadyChoised = params!.selectedCities.filter(z => +z?.id === city.id).length;
    if(isAlreadyChoised > 0)
      params!.selectedCities = params!.selectedCities.filter(z => z.id !== city.id);
      
    else
      params!.selectedCities.push(city);

    this.proposalService.setQueryParams(params!);
    
    
  }


  isSelected(cityId: number) {
    const params = this.proposalService.getQueryParams();
    const isExist = params!.selectedCities.filter(z => z.id === cityId).length;
    if(isExist > 0)
      return true;
    else
      return false;
  }
}
