import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatIconModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatIconModule],
})
export class AppMaterialModule { }