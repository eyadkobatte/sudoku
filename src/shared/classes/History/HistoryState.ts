export class HistoryState<T> {
  constructor(private state: T) {}

  getState(): T {
    return this.state;
  }
}
