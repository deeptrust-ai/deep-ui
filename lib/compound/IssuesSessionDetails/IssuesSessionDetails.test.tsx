// @vitest-environment jsdom
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import IssuesSessionDetails from './IssuesSessionDetails';
import { issuesSessionDetailsMockProps } from './IssuesSessionDetails.mocks';

afterEach(() => {
  cleanup();
});

const renderIssuesSessionDetails = () =>
  render(
    <Theme>
      <IssuesSessionDetails {...issuesSessionDetailsMockProps} />
    </Theme>
  );

const renderIssuesSessionDetailsForTab = (defaultTab: 'transcript' | 'timeline' | 'speakers') =>
  render(
    <Theme>
      <IssuesSessionDetails {...issuesSessionDetailsMockProps} defaultTab={defaultTab} />
    </Theme>
  );

describe('IssuesSessionDetails', () => {
  it('renders the notes workflow by default', () => {
    renderIssuesSessionDetails();

    expect(screen.getByRole('heading', { level: 3, name: 'Vendor verification follow-up' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: /Notes/i, selected: true })).toBeTruthy();
    expect(screen.getByRole('heading', { level: 4, name: 'Quarterly Vendor Review' })).toBeTruthy();
    expect(screen.getByText('Action Items')).toBeTruthy();
    expect(screen.getByText('Document the vendor callback workflow in the case record.')).toBeTruthy();
  });

  it('switches to the transcript tab and renders translated transcript content', () => {
    renderIssuesSessionDetailsForTab('transcript');

    expect(screen.getByText(/Total speech duration:/)).toBeTruthy();
    expect(screen.getByText('Pause there. We will verify that request with the vendor record before moving forward.')).toBeTruthy();
    expect(screen.getByText('Translated from es')).toBeTruthy();
  });

  it('renders timeline events when the timeline tab is selected', () => {
    renderIssuesSessionDetailsForTab('timeline');

    expect(screen.getByText('Payment reroute request detected')).toBeTruthy();
    expect(screen.getByText('DeepTrust flagged a payment change request outside the normal callback flow.')).toBeTruthy();
    expect(screen.getAllByText('Participant Joined').length).toBeGreaterThan(0);
  });

  it('ports the collapsible speaker details workflow to the issues surface', () => {
    renderIssuesSessionDetailsForTab('speakers');

    expect(screen.getByRole('heading', { level: 4, name: 'Participants (3)' })).toBeTruthy();
    expect(screen.getByText('Alex Turner')).toBeTruthy();
    expect(screen.getByText('Okta SSO — nila.patel@company.com')).toBeTruthy();

    const mayaToggle = screen.getByRole('button', { name: 'Expand details for Maya Chen' });
    const mayaEmail = screen.getByText('maya.chen@company.com');

    expect(mayaEmail.closest('[hidden]')).toBeTruthy();

    fireEvent.click(mayaToggle);

    expect(screen.getByRole('button', { name: 'Collapse details for Maya Chen' })).toBeTruthy();
    expect(mayaEmail.closest('[hidden]')).toBeNull();
  });
});
