import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { FooterComponent } from "src/app/shared/components/footer/footer.component";
import { StarsComponent } from "src/app/shared/components/stars/stars.component";

@Component({
  selector: 'contact-page',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FooterComponent,
    StarsComponent
  ]
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    service: '',
    message: ''
  };

  isSubmitting = false;
  submitted = false;

  private getServiceLabel(serviceKey: string): string {
    const labels: Record<string, string> = {
      frontend: 'Desenvolvimento Front-End',
      backend: 'Desenvolvimento Back-End',
      fullstack: 'Projeto Full Stack',
      mobile: 'Aplicativo Mobile',
      other: 'Outro / Consultoria'
    };
    return labels[serviceKey] || serviceKey || 'Contato Geral';
  }

  onSubmit() {
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
      const serviceName = this.getServiceLabel(this.formData.service);
      const subject = encodeURIComponent(`Contato Portfolio: ${this.formData.name} - ${serviceName}`);
      const body = encodeURIComponent(`Nome: ${this.formData.name}\nE-mail: ${this.formData.email}\nServiço: ${serviceName}\n\nMensagem:\n${this.formData.message}`);
      
      window.location.href = `mailto:stanleyhigor1@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  }
}
