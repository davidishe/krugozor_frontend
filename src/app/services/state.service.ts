import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

    private navbarMenuStatusSource = new BehaviorSubject<Boolean>(null);
    navbarMenuStatus$ = this.navbarMenuStatusSource.asObservable();

    private profileMenuStatusSource = new BehaviorSubject<Boolean>(null);
    profileMenuStatus$ = this.profileMenuStatusSource.asObservable();

    private filtersMenuStatusSource = new BehaviorSubject<boolean>(null);
    filtersMenuStatus$ = this.filtersMenuStatusSource.asObservable();

    private shadersStatusSource = new BehaviorSubject<Boolean>(null);
    shadersStatus$ = this.shadersStatusSource.asObservable();

    private sliderStatusSource = new BehaviorSubject<boolean>(null);
    sliderStatus$ = this.sliderStatusSource.asObservable();

    private videoPreviewStatusSource = new BehaviorSubject<boolean>(null);
    videoPreviewStatus$ = this.videoPreviewStatusSource.asObservable();

    private bodyElementRefSource = new BehaviorSubject<ElementRef>(null);
    bodyElementRef$ = this.bodyElementRefSource.asObservable();


    


    constructor(

    ) { }



    setBodyElement(element: ElementRef) {
      this.bodyElementRefSource.next(element);
    }


    getBodyElement() {
      return this.bodyElementRefSource.value;
    }


    setNavbarMenuStatusSpecific(status: boolean) {
      this.scrollToTop();
      this.navbarMenuStatusSource.next(null);
      this.navbarMenuStatusSource.next(status);
    }


    setNavbarMenuStatus() {
      this.scrollToTop();
      const STATUS = this.navbarMenuStatusSource.value;
      this.navbarMenuStatusSource.next(!STATUS);
    }


    setShadersStatus(status: boolean) {
      this.scrollToTop();
      this.shadersStatusSource.next(status);
    }


    setVideoPreviewStatus(status: boolean) {
      this.scrollToTop();
      this.videoPreviewStatusSource.next(status);
    }


    setSliderStatus(status: boolean) {
      this.scrollToTop();
      this.sliderStatusSource.next(status);
    }


    setFiltersMenuStatus() {
      this.scrollToTop();
      const STATUS = this.filtersMenuStatusSource.value;
      this.filtersMenuStatusSource.next(!STATUS);
    }


    setFiltersMenuStatusSpecific(status: boolean) {
      this.scrollToTop();
      this.filtersMenuStatusSource.next(status);
    }


    setProfileMenuStatus() {
      this.scrollToTop();
      const status = this.profileMenuStatusSource.value;
      this.profileMenuStatusSource.next(!status);
    }


    setProfileMenuStatusSpecific(status: boolean) {
      this.scrollToTop();
      this.profileMenuStatusSource.next(status);
    }


    scrollToTop() {
      window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
      });
    }

}
