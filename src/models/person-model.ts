export class PersonModel {
  name = '';
  gender = '';
  height = 0;
  hairColor = '';

  constructor(json: any) {
    this.name = json.name || '';
    this.gender = json.gender || '';
    this.height = json.height || 0;
    this.hairColor = json.hairColor || '';
  }
}
