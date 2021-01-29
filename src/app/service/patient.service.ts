import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

export class PatientService {
    constructor(
        private http: HttpClient
    ) { }

    getExportPatient(searchTxt: string, typeId: number): Observable<any> {
        return this.http.get<Blob>(environment.apiUrl + '/Patient/Export?SearchText=' + searchTxt + '&TypeId=' + typeId, { responseType: 'blob' as 'json' });
    }
}
