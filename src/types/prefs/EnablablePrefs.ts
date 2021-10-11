export default class EnablablePrefs {
  name: string;
  enabled: boolean;

  constructor(_name: string) {
    this.name = _name;
    this.enabled = true;
  }
}