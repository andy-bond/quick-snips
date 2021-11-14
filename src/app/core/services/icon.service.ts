import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry
  ) {
    this.iconRegistry.addSvgIconResolver((name, namespace) => {
      return namespace === ''
        ? this.sanitizer.bypassSecurityTrustResourceUrl(
            `assets/icons/${name}.svg`
          )
        : null;
    });
  }

  register(icons: { name: string; path: string }[]) {
    icons.forEach((icon: { name: string; path: string }) =>
      this.registerIcon(icon.name, icon.path)
    );
  }

  private registerIcon(name: string, path: string) {
    this.iconRegistry.addSvgIconLiteral(
      name,
      this.sanitizer.bypassSecurityTrustHtml(
        `<svg viewBox="0 0 24 24"><path d="${path}"/></svg>`
      )
    );
  }
}
