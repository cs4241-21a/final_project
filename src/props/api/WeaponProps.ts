export default interface WeaponProps {
  // !!! TODO (Michael) :  Define WeaponProps based off data given by API
  // FarmingSpotProps and MaterialProps have been done for reference
  name: string,
  fullname: {
    en: string,
    es?: string,
    pt?: string,
    ko?: string,
    ja?: string,
    vi?: string,
    de?: string,
    fr?: string,
    ru?: string
  },
  type: string,
  rarity: number,
  ascension: string[],
}