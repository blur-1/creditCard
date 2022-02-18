import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/entities/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  form: FormGroup;
  loading = false;
  titulo = 'Registrar Tarjeta'
  id: string | undefined;

  constructor(private fb: FormBuilder, 
              private tarjetaService: TarjetaService,
              private toasTr: ToastrService) { 

                this.form = this.fb.group({
                titular: ['', Validators.required],
                numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
                fechaExp: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(5)]],
                cvv: ['', [Validators.required,Validators.minLength(3), Validators.maxLength(3)]],
              })
  }

  ngOnInit(): void {
    this.tarjetaService.getTarjetaEdit().subscribe( datos =>{
        //console.log(datos);
        this.id = datos.id;
        this.titulo =  'Editar Tarjeta Actual';
        this.form.patchValue({
          titular: datos.titular,
          numeroTarjeta: datos.numeroTarjeta,
          fechaExp: datos.fechaExp,
          cvv: datos.cvv
       })
    })
  }

  registrarTarjeta(){
    
    if(this.id == undefined){ //se esta creando una nueva tarjeta
      this.agregarTarjeta();
    }else{ //se esta editando una tarjeta ya registrada
      this.editarTarjeta(this.id);
    }
  
  }

  agregarTarjeta(){
    const datosTarjeta: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExp: this.form.value.fechaExp,
      cvv: this.form.value.cvv,
      fechaEmi: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    //console.log(datosTarjeta);
    this.tarjetaService.guardarTarjeta(datosTarjeta).then(() => {
      this.loading = false;
      //console.log("tarjeta registrada con exito :D");
      this.toasTr.success('Tarjeta registrada!','Exito :D')
      this.form.reset();
    },error =>{
      this.loading = false;
      //console.log(error);
      this.toasTr.error('Opps...','Ocurrio un error');
    })
  }

  editarTarjeta(id: string){
    const datosTarjeta: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExp: this.form.value.fechaExp,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date()
    }
    this.loading= true; //spinner
    this.tarjetaService.editarTarjeta(id, datosTarjeta).then(()=>{
      this.loading= false;
      this.titulo= 'Registrar Tarjeta';
      this.form.reset();
      this.id=undefined;
      this.toasTr.info('Tarjeta Actualizada!','Exito :D')

    }, error =>{
      console.log(error);
    })

  }

}
