import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsLindasPageRoutingModule } from './stats-lindas-routing.module';

import { StatsLindasPage } from './stats-lindas.page';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsLindasPageRoutingModule,
    RouterLink
  ],
  declarations: [StatsLindasPage]
})
export class StatsLindasPageModule {}
