import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'gradient'
})

export class ColorGradientPipe implements PipeTransform {

    constructor(
    ) {
    }

    transform(value: number): string {
        if (value < 10) {
            return 'red';
        }
        if (value < 20) {
            return 'yellow';
        }

        if (value < 30) {
            return '#ebc934';
        }
        if (value < 40)
            return 'darkgreen';
    
        if (value < 50)
            return 'darkgreen';

        if (value < 60)
            return 'darkgreen';

                if (value < 70) {
            return 'darkgreen';
        }
                if (value < 80) {
            return 'darkgreen';
        }
                if (value < 90) {
            return 'darkgreen';
        }
                if (value < 100) {
            return 'darkgreen';
        }

        return 'darkgreen';
    }

}