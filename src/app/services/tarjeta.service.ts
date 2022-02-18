
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { TarjetaCredito } from '../entities/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjeta$subject = new Subject<any>();

  constructor(private fireBaseStore: AngularFirestore) { }

    guardarTarjeta(nuevaTarjeta: TarjetaCredito): Promise<any>{
      return this.fireBaseStore.collection('tarjetas').add(nuevaTarjeta);
    }

    obtenerTarjestasFb(): Observable<any>{
      return this.fireBaseStore.collection('tarjetas', ref => ref.orderBy('fechaEmi','asc')).snapshotChanges();
    }
    editarTarjeta(id:string, tarjeta: any): Promise<any>{
      return this.fireBaseStore.collection('tarjetas').doc(id).update(tarjeta);
    }
  
    eliminarTarjeta(id: string): Promise<any>{
      return this.fireBaseStore.collection('tarjetas').doc(id).delete();
    }

    addTarjetaEdit(tarjeta: TarjetaCredito){
      this.tarjeta$subject.next(tarjeta)
    }
    getTarjetaEdit(): Observable<TarjetaCredito>{
      return this.tarjeta$subject.asObservable();
    }
}
