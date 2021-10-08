import NamedProps from "./NamedProps";

export default interface MaterialProps extends NamedProps {
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
  farm_at: string,
  respawn_rate?: string,
}