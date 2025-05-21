export type EvidenceLevel = "I" | "II" | "III" | "IV" | string;

export type AcmgSignificance =
  | "PATHOGENIC"
  | "LIKELY_PATHOGENIC"
  | "UNCERTAIN_SIGNIFICANCE"
  | "LIKELY_BENIGN"
  | "BENIGN"
  | string;

export type MutationType = "SNP" | "INDEL" | "CNV" | "FUSION" | string;

export interface Analysis {
  analysisId: string;
  sampleName: string;
  sequencingRunName: string;
}

export interface TherapeuticAnnotation {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: EvidenceLevel;
  referenceLinks: string[];
  tumorType: string;
  drugTradeName?: string;
  drugName?: string;
  sensitivity: "RESISTANT" | "SUSCEPTIBLE" | string;
}

export interface DiagnosticAnnotation {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: EvidenceLevel;
  referenceLinks: string[];
  tumorType: string;
  tumorSubtype?: string;
}

export interface PrognosticAnnotation {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: EvidenceLevel;
  referenceLinks: string[];
  tumorType: string;
  prognosis: string;
}

export interface LowTierAnnotation {
  organizationName: string;
  isPublic: boolean;
  evidenceLevel: EvidenceLevel;
  referenceLinks: string[];
}

export interface AcmgAnnotation {
  organizationName: string;
  isPublic: boolean;
  acmgSignificances: AcmgSignificance;
  theses: Record<string, unknown>;
  transcriptId: string;
}

export interface Mutation {
  mutationId: string;
  mutationType: MutationType;
  maybeHgvsGdna?: string;
  maybeTrivialName?: string;
  analysesTranscripts: string[];
  analyses: Analysis[];
  inAnalysis: boolean;
  organizationFrequencyRatio: number;
  maybeHighestTier?: EvidenceLevel;
  isAnnotatedByAmp: boolean;
  isAnnotatedByAcmg: boolean;
  therapeuticAnnotations: TherapeuticAnnotation[];
  diagnosticAnnotations: DiagnosticAnnotation[];
  prognosticAnnotations: PrognosticAnnotation[];
  lowTierAnnotations: LowTierAnnotation[];
  acmgAnnotations: AcmgAnnotation[];
  hasPrivateAnnotations: boolean;
  sentToAnnotation: boolean;
  drugs: string[];
  maybeReferenceGenomeContigId?: string;
  maybeChrNumber?: string;
}
