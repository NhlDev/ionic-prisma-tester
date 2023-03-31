import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrismaConfigPageRoutingModule } from './prisma-config-routing.module';

import { PrismaConfigPage } from './prisma-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PrismaConfigPageRoutingModule,
  ],
  declarations: [PrismaConfigPage]
})
export class PrismaConfigPageModule { }
