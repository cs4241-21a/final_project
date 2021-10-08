import EnablablePrefs from "./EnablablePrefs";

export default class CharacterPrefs extends EnablablePrefs {
  ascension: boolean;
  talent: boolean;

  constructor(_name: string) {
    super(_name);
    this.ascension = true;
    this.talent = true;
  }  
}