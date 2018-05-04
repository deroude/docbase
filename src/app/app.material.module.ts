import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatListModule, MatTabsModule } from '@angular/material';
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
})
export class AppMaterialModule { }