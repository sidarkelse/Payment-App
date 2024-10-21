import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: ``
})
export class PaymentDetailFormComponent {

  constructor(public service: PaymentDetailService,private toastr:ToastrService){
  }

 
  onSubmit(form:NgForm)
  {
    this.service.formSubmitted = true;
    if(form.valid){
      if(this.service.formData.paymentDetailId==0)
        this.insertRecord(form)
      else
      this.updateRecord(form)

     

    }
   
  }
  insertRecord(form:NgForm){ this.service.postPaymentDetail()
    .subscribe({
      next: res=>{
        this.service.list = res as PaymentDetail[]
        this.service.resetForm(form)
        this.toastr.success('Pagamento registrado com sucesso!','Pagamento Registrado');
      },
      error: err => {console.log(err)
        this.toastr.error('Erro ao registrar pagamento')
      }
    })}
  updateRecord(form:NgForm)
  {
    this.service.putPaymentDetail()
    .subscribe({
      next: res=>{
        this.service.list = res as PaymentDetail[]
        this.service.resetForm(form)
        this.toastr.info('Atualizado Com sucesso','');
      },
      error: err => {console.log(err)
        this.toastr.error('Erro ao registrar pagamento')
      }
    })

  }
}


