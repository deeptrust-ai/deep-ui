import type { IIssuesSessionDetailsProps } from './IssuesSessionDetails.types';

export const issuesSessionDetailsMockProps: IIssuesSessionDetailsProps = {
  rowId: 'call-1',
  title: 'Vendor verification follow-up',
  subtitle: 'Issues view for reviewing the surfaced call evidence before triage.',
  statusBadgeLabel: 'In Review',
  statusBadgeColor: 'amber',
  summary:
    'Standard quarterly review call with verified participants. The Issues surface centers reviewer workflows around notes, transcript evidence, event timing, and speaker verification.',
  metaItems: [
    { label: 'Participants', value: '3 verified' },
    { label: 'Duration', value: '18m 42s' },
    { label: 'Created', value: 'Mar 30, 2026 • 9:14 AM' },
    { label: 'Source', value: 'Google Meet' },
  ],
  notes: {
    title: 'Quarterly Vendor Review',
    summary:
      'The team confirmed identities for all participants and closed the request without escalation.',
    body:
      'The caller requested a payment routing update during a routine quarterly review.\n\nOperations paused the request, verified the vendor record, and confirmed no follow-up action was required.',
    actionItems: [
      'Document the vendor callback workflow in the case record.',
      'Share the transcript excerpt with finance operations.',
    ],
  },
  transcripts: [
    {
      id: 1,
      speaker: 'Alex Turner',
      speakerId: 'alex-turner',
      startTime: 0,
      endTime: 8,
      text: 'Thanks everyone for joining the quarterly vendor review.',
      language: 'en',
    },
    {
      id: 2,
      speaker: 'Maya Chen',
      speakerId: 'maya-chen',
      startTime: 8,
      endTime: 19,
      text: 'Please reroute this week’s payment to the new account ending in 0041.',
      language: 'en',
    },
    {
      id: 3,
      speaker: 'Nila Patel',
      speakerId: 'nila-patel',
      startTime: 19,
      endTime: 33,
      text:
        'Pausen ahi. Vamos a verificar esa solicitud con el registro del proveedor antes de continuar.',
      translatedText:
        'Pause there. We will verify that request with the vendor record before moving forward.',
      language: 'es',
    },
    {
      id: 4,
      speaker: 'Alex Turner',
      speakerId: 'alex-turner',
      startTime: 33,
      endTime: 42,
      text: 'Understood. We will hold the request until verification is complete.',
      language: 'en',
    },
  ],
  timelineEvents: [
    {
      id: 'event-1',
      type: 'participant_join',
      createdAt: '2026-03-30T09:14:00.000Z',
      summary: 'Alex Turner joined from the corporate desktop client.',
      tone: 'success',
    },
    {
      id: 'event-2',
      type: 'participant_join',
      createdAt: '2026-03-30T09:16:00.000Z',
      summary: 'Maya Chen joined from Google Meet.',
      tone: 'success',
    },
    {
      id: 'event-3',
      type: 'alert',
      createdAt: '2026-03-30T09:24:00.000Z',
      title: 'Payment reroute request detected',
      summary: 'DeepTrust flagged a payment change request outside the normal callback flow.',
      tone: 'warning',
    },
    {
      id: 'event-4',
      type: 'call_end',
      createdAt: '2026-03-30T09:33:00.000Z',
      summary: 'The call ended after verification steps were confirmed.',
      tone: 'neutral',
    },
  ],
  speakers: [
    {
      id: 'alex-turner',
      name: 'Alex Turner',
      statusLabel: 'Verified',
      tone: 'success',
      defaultExpanded: true,
      rows: [
        { label: 'Role', value: 'CFO' },
        { label: 'Department', value: 'Finance' },
        { label: 'Email', value: 'alex.turner@company.com' },
      ],
    },
    {
      id: 'maya-chen',
      name: 'Maya Chen',
      statusLabel: 'Verified',
      tone: 'success',
      rows: [
        { label: 'Role', value: 'VP, Finance' },
        { label: 'Department', value: 'Operations' },
        { label: 'Email', value: 'maya.chen@company.com' },
      ],
    },
    {
      id: 'nila-patel',
      name: 'Nila Patel',
      subtitle: 'Engineering',
      statusLabel: 'Partially Verified',
      tone: 'warning',
      defaultExpanded: true,
      verificationRows: [
        { label: 'Human', value: 'Okta SSO — nila.patel@company.com' },
        { label: 'Machine', value: 'MDM enrolled — corporate device' },
        { label: 'Agent', value: 'No agent' },
      ],
      detectionSummary:
        'All detection methods indicate authentic audio. No synthetic artifacts detected.',
      detectionMetrics: [
        { label: 'Audio', value: 'Low (-3.4%)' },
        { label: 'Visual', value: 'Low (-4.7%)' },
        { label: 'Behavioral', value: 'Low (7.5%)' },
        { label: 'Ensemble', value: '2.0%' },
      ],
    },
  ],
};
