import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './telas/home/home.component';
import { EditComponent } from './telas/edit/edit.component';
import { SocioComponent } from './telas/socio/socio.component';
import {HttpClientModule} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbar} from "@angular/material/toolbar";
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import { MatDialogModule } from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CpfCnpjPipe } from './pipes/cpf_cnpj/cpf-cnpj.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditComponent,
    SocioComponent,
    CpfCnpjPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbar,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatIconButton,
    MatRowDef,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatTooltip,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgxMaskDirective,
    MatToolbarModule,
    MatSnackBarModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
