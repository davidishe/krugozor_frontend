import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/models/main/city';
import { ICountry } from 'src/app/models/main/country';
import { IStrapiAbstractFieldDto, IStrapiDto } from 'src/app/models/main/dtos';
import { IEntity } from 'src/app/models/main/proposal';
import { IAlertSettings, IAlertType } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert';
import { TwAlertService } from 'src/app/modules/tw-ui-kit-local/tw-alert/tw-alert.service';
import { CompanyService } from 'src/app/services/company.service';
import { ProposalsService } from 'src/app/services/proposals.service';

@Component({
  selector: 'app-dashboard-company-edit-cities',
  templateUrl: './dashboard-company-edit-cities.component.html',
  styleUrls: ['./dashboard-company-edit-cities.component.css']
})
export class DashboardCompanyEditCitiesComponent implements OnInit {

  @Input() currentProposal: IEntity;
  @Input() selectedCities: ICity[];
  @Input() initialCities: ICity[] = [];
  @Input() initialCountries: ICountry[] = [];
  @Output() emitSelectedCitites = new EventEmitter<IStrapiAbstractFieldDto[]>();
  countrys$: Observable<ICountry[]>;
  queryParams$: Observable<any>;
  citiesForDropDown: ICity[] = [];
  selectedCountries: ICountry[] = [];
  isPending: boolean = false;


  constructor(
    private proposalService: ProposalsService,
    private companyService: CompanyService,
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
    this.updateCitiesData();
  }




  deleteImage(entity: any) {
    this.isPending = true;
    console.log(entity);
    this.selectedCities = this.selectedCities.filter(z => z.id !== entity.id);
    this.updateCitiesData();
  }


  updateCitiesData() {
    // this.isPending = true;
    let citiesToUpdate: IStrapiAbstractFieldDto[] = [];
    this.selectedCities.forEach(city => {
      citiesToUpdate.push({ id: city.id });
    });

    this.emitSelectedCitites.next(citiesToUpdate);

    // const strapiDto: IStrapiDto = {
    //   strapiProposalId: this.currentProposal.data.id,
    //   name: this.currentProposal.data.attributes.name,
    //   description: this.currentProposal.data.attributes.description,
    //   price: this.currentProposal.data.attributes.price,
    //   cities: citiesToUpdate
    // }

    // this.companyService.createOrUpdateItemWithStrapi(strapiDto).subscribe((res: any) => {
    //   if (res) {
    //     let message = "Данные успешно сохранены";     
    //     let alertSettings: IAlertSettings = {
    //           isVisible: true,
    //           message: message,
    //           icon: "thumb_up_white",
    //           timeout: 4500,
    //           color: IAlertType.green
    //     };
    //     this.alertService.apearAlert(alertSettings);
    //     this.isPending = false;
    //   }
    // })
    
  }

}
