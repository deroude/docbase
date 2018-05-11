import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatListModule, MatTabsModule, MatIconRegistry } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatListModule,
        MatTabsModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule,
        MatListModule,
        MatTabsModule
    ],
    providers: [
        MatIconRegistry
    ]
})
export class AppMaterialModule {
    constructor(public matIconRegistry: MatIconRegistry) {
        // matIconRegistry.registerFontClassAlias('fontawesome-solid', 'fas');
        // matIconRegistry.registerFontClassAlias('fontawesome-brand', 'fab');
        matIconRegistry.setDefaultFontSetClass('fas');
    }
}