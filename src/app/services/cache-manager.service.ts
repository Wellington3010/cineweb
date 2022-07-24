import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheManagerService {
  constructor() { }

  public async addToCache({ key, value }: { key: string; value: string; }) : Promise<boolean> {
    try {
      const cacheStorage = await caches.open(key);
      cacheStorage.add(value);
      return true;
    }
    catch(error) {
      throw new Error("Não foi possível guardar informação no cache" + error);
    }
  }

  public async getFromCache({ key }: { key: string; }) : Promise<string | undefined> {
    try {
      return (await caches.keys()).find(x => x == key);
    }
    catch(error) {
      throw new Error("Não foi possivel acessar cache" + error);
    }
  }

  public async clearCache({ key }: { key: string }) : Promise<boolean> {
    try {
      let result = caches.delete(key);
      return result;
    } catch (error) {
      throw new Error("Não foi possivel limpar o cache" + error);
    }
  }
}
