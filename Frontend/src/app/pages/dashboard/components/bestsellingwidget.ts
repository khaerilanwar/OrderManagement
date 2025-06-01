import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [CommonModule, ButtonModule, MenuModule],
    template: `
    @if (data) {
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Best Selling Products</div>
        </div>
        <ul class="list-none p-0 m-0">
            @for (item of data; track $index) {
                <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                        <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"> {{item.category.name}} </span>
                        <div class="mt-1 text-muted-color"> {{item.category.product_category.name}} </div>
                    </div>
                    <div class="mt-2 md:mt-0 flex items-center">
                        <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                            <div class="bg-orange-500 h-full" style="width: 50%"></div>
                        </div>
                        <span class="text-orange-500 ml-4 font-medium"> {{item.totalOrders}} </span>
                    </div>
                </li>
            }
        </ul>
    </div>}`
})
export class BestSellingWidget implements OnChanges {
    @Input() data: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.data = changes['data'].currentValue;
        }
    }
}
