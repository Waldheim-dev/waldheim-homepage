import {Inject, Injectable} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {Medias} from "./enums/medias";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  MediaQueryList = {
    xs: this.mediaMatcher.matchMedia(Medias.xs),
    sm: this.mediaMatcher.matchMedia(Medias.sm),
    md: this.mediaMatcher.matchMedia(Medias.md),
    lg: this.mediaMatcher.matchMedia(Medias.lg),
    xl: this.mediaMatcher.matchMedia(Medias.xl),
    ltSm: this.mediaMatcher.matchMedia(Medias.ltSm),
    ltMd: this.mediaMatcher.matchMedia(Medias.ltMd),
    ltLg: this.mediaMatcher.matchMedia(Medias.ltLg),
    ltXl: this.mediaMatcher.matchMedia(Medias.ltXl),
    gtXs: this.mediaMatcher.matchMedia(Medias.gtXs),
    gtSm: this.mediaMatcher.matchMedia(Medias.gtSm),
    gtMd: this.mediaMatcher.matchMedia(Medias.gtMd),
    gtLg: this.mediaMatcher.matchMedia(Medias.gtLg)
  };

  constructor(private mediaMatcher: MediaMatcher, @Inject(DOCUMENT) private document: Document) {
    // create a service to handle size of screen based on Medias enum and MediaNames enum as Name for css-Class
    this.mobileQueryListener();

    this.mediaMatcher.matchMedia(Medias.xs).onchange = () => this.mobileQueryListener();
    this.mediaMatcher.matchMedia(Medias.sm).onchange = () => this.mobileQueryListener();
    this.mediaMatcher.matchMedia(Medias.md).onchange = () => this.mobileQueryListener();
    this.mediaMatcher.matchMedia(Medias.lg).onchange = () => this.mobileQueryListener();
    this.mediaMatcher.matchMedia(Medias.xl).onchange = () => this.mobileQueryListener();
  }


  private mobileQueryListener(): void {
    this.document.documentElement.removeAttribute('size');
    this.document.documentElement.removeAttribute('size-lt');
    this.document.documentElement.removeAttribute('size-gt');

    switch (true) {
      case this.MediaQueryList.xs.matches:
        this.document.documentElement.setAttribute('size', 'xs');
        break;
      case this.MediaQueryList.sm.matches:
        this.document.documentElement.setAttribute('size', 'sm');
        break;
      case this.MediaQueryList.md.matches:
        this.document.documentElement.setAttribute('size', 'md');
        break;
      case this.MediaQueryList.lg.matches:
        this.document.documentElement.setAttribute('size', 'lg');
        break;
      case this.MediaQueryList.xl.matches:
        this.document.documentElement.setAttribute('size', 'xl');
        break;
    }

    switch (true) {
      case this.MediaQueryList.ltSm.matches:
        this.document.documentElement.setAttribute('size-lt', 'sm');
        break;
      case this.MediaQueryList.ltMd.matches:
        this.document.documentElement.setAttribute('size-lt', 'md');
        break;
      case this.MediaQueryList.ltLg.matches:
        this.document.documentElement.setAttribute('size-lt', 'lg');
        break;
      case this.MediaQueryList.ltXl.matches:
        this.document.documentElement.setAttribute('size-lt', 'xl');
        break;
    }

    switch (true) {
      case this.MediaQueryList.gtLg.matches:
        this.document.documentElement.setAttribute('size-gt', 'lg');
        break;
      case this.MediaQueryList.gtMd.matches:
        this.document.documentElement.setAttribute('size-gt', 'md');
        break;
      case this.MediaQueryList.gtSm.matches:
        this.document.documentElement.setAttribute('size-gt', 'sm');
        break;
      case this.MediaQueryList.gtXs.matches:
        this.document.documentElement.setAttribute('size-gt', 'xs');
        break;
    }

  }
}
