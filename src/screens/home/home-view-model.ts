import { makeObservable, observable } from 'mobx';
import { ErrorModel, PersonModel } from 'models';
import { PeopleService } from 'services';

export class HomeViewModel {
  @observable isLoading = false;
  @observable error?: ErrorModel;
  @observable isShowActionSheetModal = false;
  @observable people: PersonModel[] = [];
  @observable rawPeople: PersonModel[] = [];

  private service = new PeopleService();

  constructor() {
    makeObservable(this);
  }

  async getPeople(): Promise<void> {
    this.isLoading = true;

    const response = await this.service.getPeople();
    const { errorCode, data } = response;

    // Error
    if (errorCode) {
      this.error = {
        errorCode,
        message: 'Opp! Something wrong',
      };
    }
    // Sucess
    else {
      const rawArr = data.results || [];
      const res: PersonModel[] = [];
      rawArr.forEach((element: any) => {
        res.push(new PersonModel(element));
      });
      this.rawPeople = res;
      this.searchByName('');
    }

    this.isLoading = false;
  }

  searchByName(name: string) {
    if (name.trim() === '') {
      this.people = this.rawPeople;
    } else {
      this.people = this.rawPeople.filter(
        (item) => item.name.indexOf(name) > -1
      );
    }
  }
}
