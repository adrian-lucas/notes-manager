import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// Componente (standalone)
import { CustomIconComponent } from './icons/custom-icon/custom-icon.component';

// Servicio
import { CustomIconService } from '../services/icon.service';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    CustomIconComponent 
  ],
  exports: [
    CustomIconComponent,
    MatIconModule
  ],
  providers: [
    CustomIconService
  ]
})
export class SharedModule {}