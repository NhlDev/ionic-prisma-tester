import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { PreconfiguredPrisma } from '../../data/preconfigured-prisma';
import { PrismaService } from '../../services';

@Component({
  selector: 'app-prisma-config',
  templateUrl: './prisma-config.page.html',
  styleUrls: ['./prisma-config.page.scss'],
})
export class PrismaConfigPage implements OnInit {

  public prismaNames = Object.keys(PreconfiguredPrisma);
  public prismaForm: FormGroup = this.fb.group({
    server: ['', [Validators.required]],
    protocol: ['https://', [Validators.required]],
    port: ['443', [Validators.required]],
    app_token: ['', [Validators.required]],
    customer_id: ['', []],
    placeholder: ['', [Validators.required]]
  });

  private currentConfigName = 'custom';

  constructor(
    private prismaSrv: PrismaService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) { }

  public ngOnInit(): void { }

  public async submitForm(): Promise<void> {
    if (this.prismaForm.valid) {
      const loader = await this.loadingController.create();
      loader.present();
      this.prismaSrv.ConfigurePrisma(this.prismaForm.value)
        .then(async (loaded: boolean) => {

          // Si no se carga Prisma, aviso el error
          if (!loaded) {
            const alert = await this.alertCtrl.create({ message: 'No se pudo cargar prisma. Por favor, revise la configuración.' })
            alert.present();
            return false;
          }

          // Guardo los datos personalizados
          localStorage.setItem(this.currentConfigName,
            JSON.stringify({
              app_token: this.prismaForm.value.app_token,
              customer_id: this.prismaForm.value.customer_id ?? '',
              placeholder: this.prismaForm.value.placeholder
            }));

          return loaded;
        }).then((loaded) => {
          if (loaded) {
            return this.router.navigate(['/banner-view'], { state: { placeholder: this.prismaForm.value.placeholder } });
          }
          return loaded;
        }).finally(() => loader.dismiss());
    }
  }

  public changeAmbient(name: string) {
    this.currentConfigName = name;
    const storedData = JSON.parse(localStorage.getItem(name) as any);
    let prisma = (PreconfiguredPrisma as any)[name];

    if (storedData) prisma = Object.assign(prisma, storedData);

    for (const key in prisma) {
      if (Object.prototype.hasOwnProperty.call(prisma, key)) {
        this.prismaForm.controls[key].setValue(prisma[key]);
      }
    }
    this.prismaForm.setValue(prisma);
  }
}
