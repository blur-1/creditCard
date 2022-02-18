import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/entities/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';


@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  listadoTarjetas: TarjetaCredito[] = [];

  constructor(private tarjetaService: TarjetaService, 
              private toasTr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this.tarjetaService.obtenerTarjestasFb().subscribe(datos=>{
        //console.log(info);
        this.listadoTarjetas=[];
        datos.forEach((item: any) =>{
          this.listadoTarjetas.push({
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          });
        })
       // console.log(this.listadoTarjetas);
    } )
  }

  eliminarTarjeta(id: any){
    this.tarjetaService.eliminarTarjeta(id).then(()=>{
      this.toasTr.error('Se elimino con exito!','Tarjeta Eliminada')
    }, error =>{
      this.toasTr.error('Opps!','Ocurrio un error')
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this.tarjetaService.addTarjetaEdit(tarjeta);
  }
}
