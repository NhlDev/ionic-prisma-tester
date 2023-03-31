import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { PrismaService } from '../../services';

@Component({
  selector: 'app-banner-view',
  templateUrl: './banner-view.page.html',
  styleUrls: ['./banner-view.page.scss'],
})
export class BannerViewPage implements OnInit {

  public pageName!: string;
  public channel:string = "web";

  public datosContexto: { key: string, value: string }[] = [];
  private placeholder!: string;

  constructor(private prismaSrv: PrismaService, private router: Router, private loadingController: LoadingController) { }


  public ngOnInit(): void {
    this.datosContexto = JSON.parse(localStorage.getItem("CONTEXT") as any) ?? [];
    this.placeholder = (this.router.getCurrentNavigation()?.extras.state as any)['placeholder'];
  }

  public async loadPlaceholder(): Promise<void> {
    const loader = await this.loadingController.create();
    loader.present();

    localStorage.setItem("CONTEXT", JSON.stringify(this.datosContexto));
    const context = this.datosContexto.reduce((a, v) => ({ ...a, [v.key]: v.value }), {});
    this.prismaSrv.LoadPlaceHolder({ placeholderId: this.placeholder, context }, { pageName: this.pageName ?? location.origin, onLoaded: () => loader.dismiss(), onLoadFailed: () => loader.dismiss(), channel: this.channel } as any);
  }

  public addRow(): void {
    this.datosContexto.push({ key: '', value: '' });
  }

  public removeRow(index: number): void {
    this.datosContexto.splice(index, 1);
  }
}
