import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-datails',
  templateUrl: './payment-datails.component.html',
  styles: ``
})
export class PaymentDatailsComponent implements OnInit{
  toastr: any;


  constructor(public service: PaymentDetailService){

  }
  ngOnInit(): void {
    this.service.refreshlist();

  }
  populateForm(selectedRecord:PaymentDetail)
  {
    this.service.formData = Object.assign({},selectedRecord)
  }
  onDelete(id:number)
  {
    if(confirm('Tem certeza que quer deletar este usuario?'))
    this.service.deletePaymentDetail(id)
    .subscribe({
      next: res=>{
        this.service.list = res as PaymentDetail[]
        this.toastr.error('Deletado Com sucesso','');
      },
      error: err => {console.log(err)
        this.toastr.error('Erro ao registrar pagamento')
      }
    })
  }

}
