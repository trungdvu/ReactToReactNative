import { PeopleApi } from 'consts';
import { ResponseModel } from 'models';
import { HttpService } from './http-service';

export class PeopleService {
  async getPeople(): Promise<ResponseModel> {
    const data = await HttpService.get(PeopleApi.people);
    return data;
  }
}
