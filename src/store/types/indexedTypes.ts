export interface Indexed {
  id: number;
}

export class IndexElements {
  private startId: number;
  private id: number;

  constructor(id: number = 0) {
    this.startId = id;
    this.id = id;
  }

  private increaseId() {
    return this.id++;
  }

  public refreshId() {
    this.id = this.startId;
  }

  public index<T>(elements: Object[]): T[] {
    return elements.map((element) => ({
      ...element,
      id: this.increaseId(),
    })) as unknown as T[];
  }
}
