class AppState {
  private _isQuitting = false;

  get isQuitting(): boolean {
    return this._isQuitting;
  }

  set isQuitting(value: boolean) {
    this._isQuitting = value;
  }
}

const appState = new AppState();
export default appState;
