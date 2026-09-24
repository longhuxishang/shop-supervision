export type MediaKind = "image" | "video";

export type ProcessStatus = "done" | "active" | "pending";

export type ArchiveType = "photo" | "video" | "notice" | "update";

export interface SiteMeta {
  community: string;
  title: string;
  updated: string;
  tagline: string;
}

export interface HeroMedia {
  kind: MediaKind;
  src: string;
  poster?: string;
}

export interface FactItem {
  value: string;
  unit: string;
  label: string;
  note: string;
}

export interface EvidenceItem {
  kind: MediaKind;
  src: string;
  caption?: string;
  tag?: string;
  poster?: string;
}

export interface DrawingData {
  src: string;
  alt: string;
  points: string[];
}

export interface RiskItem {
  title: string;
  desc?: string;
}

export interface PropertyItem {
  title: string;
  text: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  status: ProcessStatus;
  desc: string;
}

export interface DemandItem {
  num: string;
  title: string;
  text: string;
}

export interface ComplaintItem {
  label: string;
  value: string;
  href?: string;
}

export interface MaterialLink {
  title: string;
  detail: string;
  href: string;
}

export interface MaterialImage {
  src: string;
  caption?: string;
  tag?: string;
}

export interface MaterialsData {
  links: MaterialLink[];
  files: MaterialLink[];
  images: MaterialImage[];
}

export interface MediaRef {
  kind: MediaKind;
  src: string;
  poster?: string;
}

export interface ArchiveItem {
  id: string;
  date: string;
  type: ArchiveType;
  title: string;
  body?: string;
  media?: MediaRef[];
}

export interface LightboxItem {
  kind: MediaKind;
  src: string;
  poster?: string;
  caption?: string;
}

export interface SiteData {
  meta: SiteMeta;
  hero: HeroMedia;
  facts: FactItem[];
  evidence: EvidenceItem[];
  drawing: DrawingData;
  risks: RiskItem[];
  property: PropertyItem[];
  propertyQuestions: string[];
  process: ProcessStep[];
  demands: DemandItem[];
  complaints: ComplaintItem[];
  materials: MaterialsData;
  archive: ArchiveItem[];
  closing: string;
  disclaimer: string;
}
