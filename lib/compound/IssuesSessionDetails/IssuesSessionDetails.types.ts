import type { ReactNode } from 'react';
import type { ICallDetailsMetaItem } from '../CallDetails';

export type IssuesSessionDetailsTab = 'notes' | 'transcript' | 'timeline' | 'speakers';

export interface IIssuesSessionDetailsNote {
  title?: string;
  summary?: string;
  body?: string;
  actionItems?: string[];
}

export interface IIssuesSessionDetailsTranscriptSegment {
  id?: number | string;
  speaker: string;
  speakerId?: number | string;
  startTime?: number | null;
  endTime?: number | null;
  text: string;
  language?: string | null;
  translatedText?: string | null;
}

export interface IIssuesSessionDetailsSpeakerDetail {
  label: string;
  value: string;
}

export interface IIssuesSessionDetailsSpeakerMetric {
  label: string;
  value: string;
}

export type IssuesSessionDetailsSpeakerTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface IIssuesSessionDetailsSpeaker {
  id: string;
  name: string;
  subtitle?: string;
  statusLabel?: string;
  tone?: IssuesSessionDetailsSpeakerTone;
  defaultExpanded?: boolean;
  rows?: IIssuesSessionDetailsSpeakerDetail[];
  verificationRows?: IIssuesSessionDetailsSpeakerDetail[];
  detectionSummary?: string;
  detectionMetrics?: IIssuesSessionDetailsSpeakerMetric[];
}

export type IssuesSessionDetailsTimelineTone = 'neutral' | 'success' | 'warning' | 'danger';

export interface IIssuesSessionDetailsTimelineEvent {
  id: string;
  type:
    | 'participant_join'
    | 'participant_leave'
    | 'bot_status_change'
    | 'alert'
    | 'nudge'
    | 'call_end'
    | 'custom';
  createdAt: string;
  title?: string;
  summary?: string;
  tone?: IssuesSessionDetailsTimelineTone;
}

export interface IIssuesSessionDetailsProps {
  rowId?: string;
  title: string;
  subtitle?: string;
  summary?: ReactNode;
  actions?: ReactNode;
  metaItems?: ICallDetailsMetaItem[];
  statusBadgeLabel?: string;
  statusBadgeColor?: 'gray' | 'green' | 'amber' | 'red' | 'blue' | 'violet';
  notes?: IIssuesSessionDetailsNote;
  transcripts?: IIssuesSessionDetailsTranscriptSegment[];
  timelineEvents?: IIssuesSessionDetailsTimelineEvent[];
  speakers?: IIssuesSessionDetailsSpeaker[];
  defaultTab?: IssuesSessionDetailsTab;
  onTabChange?: (tab: IssuesSessionDetailsTab) => void;
}
