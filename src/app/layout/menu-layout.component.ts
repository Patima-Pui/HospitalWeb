import { Component } from '@angular/core';

@Component({
    selector: 'app-menu-layout',
    template: `
        <app-menu></app-menu>
        <router-outlet></router-outlet>
    `,
    styles: []
})
export class MenuLayoutComponent { }
