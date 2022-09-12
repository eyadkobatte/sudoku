import { HistoryState } from "./HistoryState";

export class HistoryStore<T> {
  constructor(private snapshots: Array<HistoryState<T>>) {}

  add(snapshot: HistoryState<T>) {
    this.snapshots.push(snapshot);
  }

  pop(): HistoryState<T> | undefined {
    const state = this.snapshots.pop();
    return state;
  }
}
