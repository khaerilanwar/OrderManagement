import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Order Management by
        <a href="#" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Asaa Team</a>
    </div>`
})
export class AppFooter { }
