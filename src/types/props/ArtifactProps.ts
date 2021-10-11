import NamedProps from "./NamedProps";

export default interface ArtifactProps extends NamedProps {
  // !!! TODO (Michael) :  Define ArtifactProps based off data given by API
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
  item_list: {
    fullname: {
      en: string,
      th?: string,
    },
    farm_at: string
  }[]
}