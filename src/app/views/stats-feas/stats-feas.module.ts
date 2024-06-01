import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsFeasPageRoutingModule } from './stats-feas-routing.module';

import { StatsFeasPage } from './stats-feas.page';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsFeasPageRoutingModule,
    RouterLink
  ],
  declarations: [StatsFeasPage]
})
export class StatsFeasPageModule {}
