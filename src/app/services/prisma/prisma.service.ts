import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';

import { PlaceHolderConfig, PrismaConfiguration, PrismaOptions } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PrismaService {
  private prismaGlobal?: { load: (server: string, port: string, app_token: string, customer_id: string, placeholders_vector: PlaceHolderConfig[], protocol: string, options?: PrismaOptions) => void };
  private currentPrismaConfiguration!: PrismaConfiguration;

  constructor(private http: HttpClient) { }

  public ConfigurePrisma(config: PrismaConfiguration): Promise<boolean> {
    this.prismaGlobal = undefined;

    return new Promise((res, rej) => {
      this.http.jsonp(`${config.protocol}${config.server}:${config.port}/sdk/javascript/prisma.js`, '')
        .pipe(finalize(() => {
          this.prismaGlobal = (window as any).prisma;
          this.currentPrismaConfiguration = config;
          res(!!this.prismaGlobal);
        })).subscribe(() => { });
    })
  }

  public LoadPlaceHolder(placeHolderConf: PlaceHolderConfig, extraOption?: PrismaOptions) {
    if (!this.currentPrismaConfiguration || !this.prismaGlobal) {
      throw "Configuración de Prisma inválida."
    }

    placeHolderConf = this.createPrismaContainer(placeHolderConf);
    this.prismaGlobal.load(
      this.currentPrismaConfiguration.server,
      this.currentPrismaConfiguration.port,
      this.currentPrismaConfiguration.app_token,
      this.currentPrismaConfiguration.customer_id,
      [placeHolderConf],
      this.currentPrismaConfiguration.protocol,
      extraOption);
  }

  private createPrismaContainer(placeholders: PlaceHolderConfig): PlaceHolderConfig {
    const ELEMENT_ID = 'prisma-content'

    let container = document.querySelector(`#${ELEMENT_ID}`);
    placeholders.elementId = ELEMENT_ID;
    if (!container) {
      const div = document.createElement("div");
      div.id = ELEMENT_ID;
      document.body.appendChild(div);
    }
    else {
      container.innerHTML = '';
    }
    return placeholders;
  }
}
