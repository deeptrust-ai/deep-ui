// @vitest-environment jsdom
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import CallDetails from './CallDetails';

afterEach(() => {
  cleanup();
});

describe('CallDetails', () => {
  it('renders the shell with summary, metadata, and both content panes', () => {
    render(
      <Theme>
        <CallDetails
          title="Quarterly Vendor Review"
          subtitle="Dashboard shell"
          statusBadgeLabel="Verified"
          summary="A reusable layout for dashboard call detail views."
          metaItems={[
            { label: 'Participants', value: '3' },
            { label: 'Duration', value: '18m' },
          ]}
          primaryContent={<div>Primary panel</div>}
          secondaryContent={<div>Secondary panel</div>}
        />
      </Theme>
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Quarterly Vendor Review' })).toBeTruthy();
    expect(screen.getByText('Dashboard shell')).toBeTruthy();
    expect(screen.getByText('Verified')).toBeTruthy();
    expect(screen.getByText('A reusable layout for dashboard call detail views.')).toBeTruthy();
    expect(screen.getByText('Participants')).toBeTruthy();
    expect(screen.getByText('Primary panel')).toBeTruthy();
    expect(screen.getByText('Secondary panel')).toBeTruthy();
  });
});
