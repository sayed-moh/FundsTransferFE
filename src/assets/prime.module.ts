import { NgModule } from "@angular/core";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputMaskModule } from 'primeng/inputmask';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        InputMaskModule,
        FloatLabelModule,
        InputNumberModule,
        ToastModule,
        PasswordModule,
        SkeletonModule,
    ],
})
export class PrimeModule {}