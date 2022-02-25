import { AsyncStorageService } from './async-storage-service';

export class LocalStorageService {
  private get key(): string {
    return this.constructor.name;
  }

  async save(): Promise<void> {
    const jsonString = JSON.stringify(this);
    await AsyncStorageService.save(this.key, jsonString);
  }

  async load(): Promise<void> {
    const jsonString = await AsyncStorageService.load(this.key);
    if (jsonString) {
      const josnObject = JSON.parse(jsonString);
      Object.assign(this, josnObject);
    }
  }
}
