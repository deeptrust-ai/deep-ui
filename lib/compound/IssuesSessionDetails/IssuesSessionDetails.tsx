import {
  BellIcon,
  CaretUpIcon,
  ChatCircleTextIcon,
  NoteIcon,
  PhoneDisconnectIcon,
  UserMinusIcon,
  UserPlusIcon,
  UsersIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import { Box, Flex, Heading, Switch, Tabs, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import CallDetails from '../CallDetails';
import type {
  IIssuesSessionDetailsProps,
  IIssuesSessionDetailsSpeaker,
  IIssuesSessionDetailsTimelineEvent,
  IIssuesSessionDetailsTranscriptSegment,
  IssuesSessionDetailsSpeakerTone,
  IssuesSessionDetailsTab,
  IssuesSessionDetailsTimelineTone,
} from './IssuesSessionDetails.types';
import styles from './IssuesSessionDetails.module.css';

type GroupedTranscript = {
  speaker: string;
  startTime?: number | null;
  endTime?: number | null;
  displayTexts: Array<{
    text: string;
    isTranslated: boolean;
  }>;
  languages: string[];
};

const TIMELINE_LABELS: Record<IIssuesSessionDetailsTimelineEvent['type'], string> = {
  participant_join: 'Participant Joined',
  participant_leave: 'Participant Left',
  bot_status_change: 'Bot Status Changed',
  alert: 'Alert Triggered',
  nudge: 'Nudge Sent',
  call_end: 'Call Ended',
  custom: 'Event',
};

const isIssuesSessionDetailsTab = (value: string): value is IssuesSessionDetailsTab =>
  ['notes', 'transcript', 'timeline', 'speakers'].includes(value);

const formatTimestamp = (seconds?: number | null) => {
  if (seconds == null || Number.isNaN(seconds)) {
    return '00:00';
  }

  const totalSeconds = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const calculateTranscriptDuration = (transcripts: IIssuesSessionDetailsTranscriptSegment[]) => {
  if (!transcripts.length) {
    return null;
  }

  const first = transcripts[0];
  const last = transcripts[transcripts.length - 1];

  if (first.startTime == null || last.endTime == null) {
    return null;
  }

  return formatTimestamp(Math.max(0, last.endTime - first.startTime));
};

const groupTranscripts = (
  transcripts: IIssuesSessionDetailsTranscriptSegment[],
  showTranslatedText: boolean
) => {
  const grouped: GroupedTranscript[] = [];

  for (const transcript of transcripts) {
    const previous = grouped[grouped.length - 1];
    const hasTranslation = Boolean(transcript.translatedText);
    const displayText = showTranslatedText ? transcript.translatedText || transcript.text : transcript.text;

    if (previous && previous.speaker === transcript.speaker) {
      previous.endTime = transcript.endTime;
      previous.displayTexts.push({
        text: displayText,
        isTranslated: showTranslatedText && hasTranslation,
      });
      if (transcript.language && transcript.language !== 'en' && !previous.languages.includes(transcript.language)) {
        previous.languages.push(transcript.language);
      }
      continue;
    }

    grouped.push({
      speaker: transcript.speaker,
      startTime: transcript.startTime,
      endTime: transcript.endTime,
      displayTexts: [
        {
          text: displayText,
          isTranslated: showTranslatedText && hasTranslation,
        },
      ],
      languages:
        transcript.language && transcript.language !== 'en' ? [transcript.language] : [],
    });
  }

  return grouped;
};

const getTimelineToneClass = (tone: IssuesSessionDetailsTimelineTone = 'neutral') => {
  if (tone === 'success') return styles.toneSuccess;
  if (tone === 'warning') return styles.toneWarning;
  if (tone === 'danger') return styles.toneDanger;
  return styles.toneNeutral;
};

const getSpeakerToneClass = (tone: IssuesSessionDetailsSpeakerTone = 'neutral') => {
  if (tone === 'success') return styles.statusSuccess;
  if (tone === 'warning') return styles.statusWarning;
  if (tone === 'danger') return styles.statusDanger;
  return styles.statusNeutral;
};

const getTimelineIcon = (type: IIssuesSessionDetailsTimelineEvent['type']) => {
  if (type === 'participant_join') return <UserPlusIcon size={16} weight="bold" />;
  if (type === 'participant_leave') return <UserMinusIcon size={16} weight="bold" />;
  if (type === 'alert') return <WarningCircleIcon size={16} weight="bold" />;
  if (type === 'nudge') return <BellIcon size={16} weight="bold" />;
  if (type === 'call_end') return <PhoneDisconnectIcon size={16} weight="bold" />;
  return <ChatCircleTextIcon size={16} weight="bold" />;
};

const NotesTab = ({ notes }: Pick<IIssuesSessionDetailsProps, 'notes'>) => {
  if (!notes || (!notes.title && !notes.summary && !notes.body && !notes.actionItems?.length)) {
    return (
      <div className={styles.emptyState}>
        <Text color="gray" size="3">
          No notes are available for this issue yet.
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.notesCard}>
      {notes.title ? (
        <section className={styles.notesSection}>
          <Heading as="h4" size="5">
            {notes.title}
          </Heading>
        </section>
      ) : null}
      {notes.summary ? (
        <section className={styles.notesSection}>
          <Text as="p" className={styles.notesLabel}>
            Summary
          </Text>
          <Text as="p" size="3" className={styles.notesBody}>
            {notes.summary}
          </Text>
        </section>
      ) : null}
      {notes.body ? (
        <section className={styles.notesSection}>
          <Text as="p" className={styles.notesLabel}>
            Notes
          </Text>
          <Text as="p" size="3" className={styles.notesBody}>
            {notes.body}
          </Text>
        </section>
      ) : null}
      {notes.actionItems?.length ? (
        <section className={styles.notesSection}>
          <Text as="p" className={styles.notesLabel}>
            Action Items
          </Text>
          <ul className={styles.actionList}>
            {notes.actionItems.map((item) => (
              <li key={item}>
                <Text as="span" size="3">
                  {item}
                </Text>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};

const TranscriptTab = ({
  transcripts,
}: Pick<IIssuesSessionDetailsProps, 'transcripts'>) => {
  const [showTranslatedText, setShowTranslatedText] = useState(true);
  const hasTranslations = transcripts?.some((transcript) => Boolean(transcript.translatedText)) ?? false;

  const groupedTranscripts = useMemo(
    () => groupTranscripts(transcripts ?? [], showTranslatedText),
    [showTranslatedText, transcripts]
  );

  const transcriptDuration = useMemo(
    () => calculateTranscriptDuration(transcripts ?? []),
    [transcripts]
  );

  if (!transcripts?.length) {
    return (
      <div className={styles.emptyState}>
        <Text color="gray" size="3">
          No transcript segments are available for this issue yet.
        </Text>
      </div>
    );
  }

  return (
    <Flex direction="column" gap="3">
      {hasTranslations ? (
        <label className={styles.transcriptToolbar}>
          <Switch
            checked={showTranslatedText}
            onCheckedChange={(checked) => setShowTranslatedText(Boolean(checked))}
          />
          <Text size="2">
            {showTranslatedText ? 'Show English translation' : 'Show original language'}
          </Text>
        </label>
      ) : null}

      {transcriptDuration ? (
        <Text as="p" className={styles.transcriptMeta}>
          Total speech duration: {transcriptDuration}
        </Text>
      ) : null}

      <div className={styles.transcriptList}>
        {groupedTranscripts.map((transcript, index) => (
          <div
            key={`${transcript.speaker}-${transcript.startTime ?? index}`}
            className={styles.transcriptCard}
          >
            <div className={styles.transcriptSpeakerRow}>
              <Text as="span" className={styles.transcriptTimestamp}>
                [{formatTimestamp(transcript.startTime)} - {formatTimestamp(transcript.endTime)}]
              </Text>
              <Text as="span" className={styles.transcriptSpeaker}>
                {transcript.speaker}
              </Text>
            </div>
            <Text as="p" size="3" className={styles.transcriptText}>
              {transcript.displayTexts.map((item, textIndex) => (
                <span
                  key={`${transcript.speaker}-${textIndex}`}
                  className={item.isTranslated ? styles.translated : undefined}
                >
                  {item.text}
                  {textIndex < transcript.displayTexts.length - 1 ? ' ' : ''}
                </span>
              ))}
            </Text>
            {showTranslatedText && transcript.languages.length ? (
              <Text as="p" className={styles.translatedFrom}>
                Translated from {transcript.languages.join(', ')}
              </Text>
            ) : null}
          </div>
        ))}
      </div>
    </Flex>
  );
};

const TimelineTab = ({
  timelineEvents,
}: Pick<IIssuesSessionDetailsProps, 'timelineEvents'>) => {
  const sortedEvents = useMemo(
    () =>
      [...(timelineEvents ?? [])].sort(
        (left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime()
      ),
    [timelineEvents]
  );

  if (!sortedEvents.length) {
    return (
      <div className={styles.emptyState}>
        <Text color="gray" size="3">
          No timeline events have been recorded for this issue yet.
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.timelineList}>
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          className={classNames(styles.timelineItem, getTimelineToneClass(event.tone))}
        >
          <div className={styles.timelineMarker}>{getTimelineIcon(event.type)}</div>
          <div className={styles.timelineCard}>
            <div className={styles.timelineHeader}>
              <Text as="p" className={styles.timelineTitle}>
                {event.title || TIMELINE_LABELS[event.type]}
              </Text>
              <Text as="span" className={styles.timelineTimestamp}>
                {new Date(event.createdAt).toLocaleString()}
              </Text>
            </div>
            {event.summary ? (
              <Text as="p" size="2" className={styles.timelineSummary}>
                {event.summary}
              </Text>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

const SpeakerDetails = ({ speaker }: { speaker: IIssuesSessionDetailsSpeaker }) => (
  <>
    {speaker.rows?.length ? (
      <div className={styles.detailList}>
        {speaker.rows.map((row) => (
          <div key={`${speaker.id}-${row.label}`} className={styles.detailRow}>
            <Text as="span" className={styles.detailLabel}>
              {row.label}
            </Text>
            <Text as="span" className={styles.detailValue}>
              {row.value}
            </Text>
          </div>
        ))}
      </div>
    ) : null}

    {speaker.verificationRows?.length || speaker.detectionSummary || speaker.detectionMetrics?.length ? (
      <div className={styles.evidenceGrid}>
        {speaker.verificationRows?.length ? (
          <Box className={classNames(styles.evidenceCard, styles.verificationCard)}>
            <Text as="p" className={styles.evidenceTitle}>
              Verification
            </Text>
            <div className={styles.detailList}>
              {speaker.verificationRows.map((row) => (
                <div key={`${speaker.id}-${row.label}`} className={styles.detailRow}>
                  <Text as="span" className={styles.detailLabel}>
                    {row.label}
                  </Text>
                  <Text as="span" className={styles.detailValue}>
                    {row.value}
                  </Text>
                </div>
              ))}
            </div>
          </Box>
        ) : null}

        {speaker.detectionSummary || speaker.detectionMetrics?.length ? (
          <Box className={classNames(styles.evidenceCard, styles.detectionCard)}>
            <Text as="p" className={styles.evidenceTitle}>
              Deepfake Detection
            </Text>
            {speaker.detectionSummary ? (
              <Text as="p" size="2">
                {speaker.detectionSummary}
              </Text>
            ) : null}
            {speaker.detectionMetrics?.length ? (
              <div className={styles.metricGrid}>
                {speaker.detectionMetrics.map((metric) => (
                  <div key={`${speaker.id}-${metric.label}`} className={styles.detailRow}>
                    <Text as="span" className={styles.metricLabel}>
                      {metric.label}
                    </Text>
                    <Text as="span" className={styles.metricValue}>
                      {metric.value}
                    </Text>
                  </div>
                ))}
              </div>
            ) : null}
          </Box>
        ) : null}
      </div>
    ) : null}
  </>
);

const SpeakersTab = ({
  rowId = 'call-1',
  speakers,
}: Pick<IIssuesSessionDetailsProps, 'rowId' | 'speakers'>) => {
  const [expandedById, setExpandedById] = useState<Record<string, boolean>>({});

  if (!speakers?.length) {
    return (
      <div className={styles.emptyState}>
        <Text color="gray" size="3">
          No speaker information is available for this issue yet.
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.speakersSection}>
      <Heading as="h4" size="5" className={styles.sectionTitle}>
        Participants ({speakers.length})
      </Heading>

      <div className={styles.speakerStack}>
        {speakers.map((speaker) => {
          const expanded = expandedById[speaker.id] ?? Boolean(speaker.defaultExpanded);
          const panelId = `issues-session-details-speaker-${rowId}-${speaker.id}`;

          return (
            <div key={speaker.id} className={styles.speakerCard}>
              <button
                type="button"
                className={styles.speakerToggle}
                aria-expanded={expanded}
                aria-controls={expanded ? panelId : undefined}
                aria-label={`${expanded ? 'Collapse' : 'Expand'} details for ${speaker.name}`}
                onClick={() =>
                  setExpandedById((previous) => ({
                    ...previous,
                    [speaker.id]: !previous[speaker.id],
                  }))
                }
              >
                <div className={styles.speakerHeader}>
                  <div className={styles.speakerIdentity}>
                    <Text as="p" className={styles.speakerName}>
                      {speaker.name}
                    </Text>
                    {speaker.subtitle ? (
                      <Text as="p" className={styles.speakerSubtitle}>
                        {speaker.subtitle}
                      </Text>
                    ) : null}
                  </div>

                  <div className={styles.speakerHeaderActions}>
                    {speaker.statusLabel ? (
                      <span
                        className={classNames(
                          styles.statusBadge,
                          getSpeakerToneClass(speaker.tone)
                        )}
                      >
                        {speaker.statusLabel}
                      </span>
                    ) : null}
                    <CaretUpIcon
                      size={18}
                      className={classNames(
                        styles.caret,
                        !expanded ? styles.caretCollapsed : undefined
                      )}
                    />
                  </div>
                </div>
              </button>

              <div id={panelId} className={styles.speakerContent} hidden={!expanded}>
                <SpeakerDetails speaker={speaker} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IssuesSessionDetails = ({
  rowId = 'call-1',
  defaultTab = 'notes',
  onTabChange,
  notes,
  transcripts = [],
  timelineEvents = [],
  speakers = [],
  ...shellProps
}: IIssuesSessionDetailsProps) => {
  const [activeTab, setActiveTab] = useState<IssuesSessionDetailsTab>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <CallDetails
      {...shellProps}
      primaryContent={
        <Tabs.Root
          value={activeTab}
          onValueChange={(value) => {
            if (!isIssuesSessionDetailsTab(value)) {
              return;
            }

            setActiveTab(value);
            onTabChange?.(value);
          }}
        >
          <Tabs.List size="1" className={styles.tabsList}>
            <Tabs.Trigger value="notes">
              <NoteIcon size={16} weight="bold" />
              Notes
            </Tabs.Trigger>
            <Tabs.Trigger value="transcript">
              <ChatCircleTextIcon size={16} weight="bold" />
              Transcript
            </Tabs.Trigger>
            <Tabs.Trigger value="timeline">
              <WarningCircleIcon size={16} weight="bold" />
              Timeline
            </Tabs.Trigger>
            <Tabs.Trigger value="speakers">
              <UsersIcon size={16} weight="bold" />
              Speakers
            </Tabs.Trigger>
          </Tabs.List>

          <Box className={styles.tabContent}>
            <Tabs.Content value="notes">
              <NotesTab notes={notes} />
            </Tabs.Content>
            <Tabs.Content value="transcript">
              <TranscriptTab transcripts={transcripts} />
            </Tabs.Content>
            <Tabs.Content value="timeline">
              <TimelineTab timelineEvents={timelineEvents} />
            </Tabs.Content>
            <Tabs.Content value="speakers">
              <SpeakersTab rowId={rowId} speakers={speakers} />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      }
    />
  );
};

export default IssuesSessionDetails;
export type {
  IIssuesSessionDetailsNote,
  IIssuesSessionDetailsProps,
  IIssuesSessionDetailsSpeaker,
  IIssuesSessionDetailsSpeakerDetail,
  IIssuesSessionDetailsSpeakerMetric,
  IIssuesSessionDetailsTimelineEvent,
  IIssuesSessionDetailsTranscriptSegment,
  IssuesSessionDetailsSpeakerTone,
  IssuesSessionDetailsTab,
  IssuesSessionDetailsTimelineTone,
} from './IssuesSessionDetails.types';
