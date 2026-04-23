import { SlicePipe } from '@angular/common';
import {HostListener, Pipe, PipeTransform} from '@angular/core';
import { ICity } from 'src/app/models/main/city';

@Pipe({
    name: 'triptitle'
})

export class TripTitlePipe implements PipeTransform {


    city_artifacts: IArtifact<ICity>[];
    cityTitles: string = '';
    slice_param: number;


    constructor(
        private slicePipe: SlicePipe
    ) {        
    }


    transform(title: string, 
                window_size: number, 
                ): any {


        // >1700 
        // px
        if (window_size > 1700) {
            this.slice_param = 47;
        }

        // >1170 
        // px
        if (window_size > 1400 && window_size <= 1700) {
            this.slice_param = 39;
        }

        // 1100 - 1400 
        // px
        if (window_size > 1100 && window_size <= 1400) {
            this.slice_param = 30;
        }

        // 980 - 1100
        // px
        if (window_size > 980 && window_size <= 1100) {
            this.slice_param = 21;
        }

        // 900 - 980
        // px
        if (window_size > 900 && window_size <= 980) {
            this.slice_param = 27;
        }


        // 800 - 900
        // px
        if (window_size > 800 && window_size <= 900) {
            this.slice_param = 26;
        }

        // 768 - 800
        // px
        if (window_size > 767 && window_size <= 800) {
            this.slice_param = 23;
        }

        // 450 - 768
        // px
        if (window_size > 450 && window_size <= 768) {
            this.slice_param = 26;
        }


        // 400 - 450
        // px
        if (window_size > 400 && window_size <= 450) {
            this.slice_param = 19;
        }



        // 390 - 400
        // px
        if (window_size > 390 && window_size <= 400) {
            this.slice_param = 24;
        }


        // 350 - 390
        // px
        if (window_size > 350 && window_size <= 390) {
            this.slice_param = 16;
        }

        // 319 - 350
        // px
        if (window_size > 319 && window_size <= 350) {
            this.slice_param = 12;
        }
        
        if (current_trip.attributes.name === "") {
            const title = this.getTripName(citys);
            return title;
        } else {
            const result = current_trip.attributes.name;
            return ((result.length>this.slice_param) ? (this.slicePipe.transform(result, 0, this.slice_param))+'...':(result))
        }


    }





    // getTripName(citys: IArtifact<ICity>[]): string {
    // let cityTitles = '';
    // for (let index = 0; index < citys.length; index++) {
    //     const element: IArtifact<ICity> = citys[index];
    //     if (index >= 0 && index < (citys.length - 1)) {
    //         cityTitles = cityTitles + (element.attributes.city_name + ', ');      
    //     }

    //     if (index === (citys.length - 1)) {
    //         cityTitles = cityTitles + (element.attributes.city_name);      
    //     }

    // }
    
    // return ((cityTitles.length>this.slice_param)? (this.slicePipe.transform(cityTitles, 0, this.slice_param))+'...':(cityTitles));
    // }

}