import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/main/city';
import { ICountry } from 'src/app/models/main/country';
import { IStrapiAbstractFieldDto, IStrapiDto } from 'src/app/models/main/dtos';
import { ProposalsService } from 'src/app/services/proposals.service';
import { MyProposalsService } from '../../dashboard-agent-proposals.service';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';

@Component({
  selector: 'app-my-proposal-page-cities',
  templateUrl: './my-proposal-page-cities.component.html',
  styleUrls: ['./my-proposal-page-cities.component.css']
})
export class MyProposalPageCitiesComponent implements OnInit {

  @Input() currentProposal: any;
  @Input() selectedCities: ICity[];
  countrys$: Observable<ICountry[]>;
  queryParams$: Observable<any>;
  citiesForDropDown: ICity[] = [];
  selectedCountries: ICountry[] = [];
  isPending: boolean = false;


  constructor(
    private proposalService: ProposalsService,
    private myProposalsService: MyProposalsService,
    private alertService: TwAlertService
  ) { }

  ngOnInit() {
    this.setInitalSettings();
    this.setInitialCountrys();
  }

  
  setInitalSettings()  {
    this.countrys$ = this.proposalService.countrys$;

    if (this.selectedCities.length > 0) {
      this.selectedCities.forEach(city => {
        this.selectedCountries.push(city.attributes.country.data);
      });
    }    
  }


  setInitialCountrys() {
    this.countrys$.subscribe((countries: any[]) => {
      if (countries) {
        countries.forEach(country => {
          const isExist = this.selectedCountries.filter(z => z.id === country.id).length;
          if(isExist === 0)
            return;

            this.citiesForDropDown = this.citiesForDropDown.concat(country.attributes.cities.data);
        });
      }
    })

  }


  isCountrySelected(country: any): boolean {
    const selectedCountryResult = this.selectedCountries.filter(z => z.id === country.id);
    if(selectedCountryResult.length > 0)
      return true;
    else
      return false;
  }

  setCountrys(event: any, country: ICountry) {
    const isChecked = event.param1.target.checked;

    if(isChecked) {
      this.selectedCountries.push(country);
      this.citiesForDropDown = this.citiesForDropDown.concat(country.attributes.cities.data);
    }

    if(!isChecked) {
      this.selectedCountries = this.selectedCountries.filter(z => z.id !== country.id);
      country.attributes.cities.data.forEach(city => {
        this.citiesForDropDown = this.citiesForDropDown.filter(z => z.id !== city.id);
      });
    }

  }


  setSelectedCities(event: any) {
    if(this.selectedCities === null)
      this.selectedCities = [];

      this.selectedCities = event;
  }




  deleteImage(entity: any) {
    this.isPending = true;
    console.log(entity);
    this.selectedCities = this.selectedCities.filter(z => z.id !== entity.id);
    this.updateCitiesData();
  }


  updateCitiesData() {
    this.isPending = true;

    let citiesToUpdate: IStrapiAbstractFieldDto[] = [];
    this.selectedCities.forEach(city => {
      citiesToUpdate.push({ id: city.id });
    });
    

    const strapiDto: IStrapiDto = {
      strapiProposalId: this.currentProposal.data.id,
      name: this.currentProposal.data.attributes.name,
      description: this.currentProposal.data.attributes.description,
      price: this.currentProposal.data.attributes.price,
      cities: citiesToUpdate
    }

    this.myProposalsService.createOrUpdateItemWithStrapi(strapiDto).subscribe((res: any) => {
      if (res) {
        let message = "Данные успешно обновлены";
        let alertSettings: IAlertSettings = {
              isVisible: true,
              message: message,
              icon: "thumb_up_white",
              timeout: 4500,
              color: IAlertType.green
        };
        this.alertService.apearAlert(alertSettings);
        this.isPending = false;
      }
    })
    
  }

}
