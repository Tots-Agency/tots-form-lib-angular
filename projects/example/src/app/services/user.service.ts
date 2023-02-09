import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TotsBaseHttpService, TotsCoreConfig, TotsListResponse, TotsQuery, TOTS_CORE_PROVIDER } from '@tots/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService extends TotsBaseHttpService<any> {

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient,
  ) {
    super(config, http);
  }

  override list(query: TotsQuery): Observable<TotsListResponse<any>> {
    let response = new TotsListResponse<any>();
    response.data = [
        { id: 1, firstname: 'Axel', lastname: 'Camiletti', photo: '' },
        { id: 2, firstname: 'Matias', lastname: 'Camiletti', photo: '' },
        { id: 3, firstname: 'Mayra', lastname: 'Camiletti', photo: '' },
        { id: 4, firstname: 'Lau', lastname: 'Camiletti', photo: '' },
    ]
    return of(response);
  }
}
