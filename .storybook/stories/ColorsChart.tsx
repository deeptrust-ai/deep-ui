import { useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';

type Scale = {
  key: string;
  label: string;
  checkered?: boolean;
};

const steps = Array.from({ length: 12 }, (_, index) => index + 1);

const scales: Scale[] = [
  { key: 'gray', label: 'Gray' },
  { key: 'blue', label: 'Blue' },
  { key: 'yellow', label: 'Yellow' },
  { key: 'red', label: 'Red' },
  { key: 'indigo', label: 'Indigo' },
  { key: 'green', label: 'Green' },
  { key: 'orange', label: 'Orange' },
  { key: 'accent', label: 'Accent' },
  { key: 'sky', label: 'Sky' },
  { key: 'slate', label: 'Slate' },
  { key: 'black-a', label: 'Black Alpha', checkered: true },
  { key: 'gray-a', label: 'Gray Alpha', checkered: true },
  { key: 'white-a', label: 'White Alpha', checkered: true },
];

const columnWidth = 56;
const labelColumnWidth = 144;
const gap = 6;
const gridWidth = labelColumnWidth + steps.length * columnWidth + (steps.length - 1) * gap;

const swatchBaseStyle = {
  width: `${columnWidth}px`,
  height: '44px',
  borderRadius: '10px',
  boxShadow: 'inset 0 0 0 1px var(--gray-a4)',
} as const;

const alphaBackplateStyle = {
  backgroundImage: `
    linear-gradient(45deg, var(--gray-4) 25%, transparent 25%),
    linear-gradient(-45deg, var(--gray-4) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--gray-4) 75%),
    linear-gradient(-45deg, transparent 75%, var(--gray-4) 75%)
  `,
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
  backgroundSize: '20px 20px',
  backgroundColor: 'var(--color-panel, var(--gray-2))',
} as const;

const bandStyle = {
  borderTop: '1px solid var(--gray-a6)',
} as const;

const bandTextStyle = {
  fontSize: '10px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
} as const;

function getScaleToken(scaleKey: string, step: number) {
  return scaleKey.includes('-a') ? `var(--${scaleKey}${step})` : `var(--${scaleKey}-${step})`;
}

function getScaleTokenName(scaleKey: string, step: number) {
  return scaleKey.includes('-a') ? `--${scaleKey}${step}` : `--${scaleKey}-${step}`;
}

function UseCaseBand({ label, start, span }: { label: string; start: number; span: number }) {
  return (
    <Grid pt="10px" style={{ ...bandStyle, gridColumn: `${start} / span ${span}` }}>
      <Text weight="medium" color="gray" style={bandTextStyle} align="center">
        {label}
      </Text>
    </Grid>
  );
}

function SwatchRow({ scale, onCopy }: { scale: Scale; onCopy: (tokenName: string) => void }) {
  return (
    <Flex align="center" gap="3">
      <Box style={{ width: `${labelColumnWidth}px`, flexShrink: 0 }}>
        <Text size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>
          {scale.label}
        </Text>
      </Box>
      <Grid columns={`repeat(${steps.length}, ${columnWidth}px)`} gap={`${gap}px`} width="auto">
        {steps.map((step) => (
          <Box key={`${scale.key}-${step}`} asChild>
            <button
              type="button"
              aria-label={`Copy ${getScaleTokenName(scale.key, step)}`}
              onClick={() => onCopy(getScaleTokenName(scale.key, step))}
              style={{
                ...swatchBaseStyle,
                ...(scale.checkered ? alphaBackplateStyle : {}),
                backgroundColor: getScaleToken(scale.key, step),
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'transform 120ms ease, box-shadow 120ms ease',
              }}
            />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}

function ThemeSection({
  className,
  label,
  onCopy,
}: {
  className: string;
  label: string;
  onCopy: (tokenName: string) => void;
}) {
  return (
    <Box
      className={className}
      style={{
        borderRadius: '20px',
        padding: '24px',
        background:
          'linear-gradient(180deg, color-mix(in srgb, var(--gray-2) 88%, transparent), var(--gray-1))',
        boxShadow: 'inset 0 0 0 1px var(--gray-a5)',
      }}
    >
      <Flex direction="column" gap="4">
        <Flex justify="between" align="end">
          <Text size="5" weight="bold" style={{ color: 'var(--gray-12)' }}>
            {label}
          </Text>
          <Text size="2" style={{ color: 'var(--gray-10)' }}>
            Click a tile to copy its token
          </Text>
        </Flex>

        <Box style={{ width: `${gridWidth}px`, maxWidth: '100%' }}>
          <Grid
            columns={`${labelColumnWidth}px repeat(${steps.length}, ${columnWidth}px)`}
            gapX={`${gap}px`}
            gapY="10px"
            width="auto"
            style={{ alignItems: 'end', marginBottom: '16px' }}
          >
            <Box />
            {steps.map((step) => (
              <Box key={`${label}-${step}`} style={{ textAlign: 'center' }}>
                <Text size="1" weight="bold" style={{ color: 'var(--gray-11)' }}>
                  {step}
                </Text>
              </Box>
            ))}
            <Box />
            <UseCaseBand label="Backgrounds" start={2} span={2} />
            <UseCaseBand label="Interactive Components" start={4} span={3} />
            <UseCaseBand label="Borders" start={7} span={3} />
            <UseCaseBand label="Solid" start={10} span={2} />
            <UseCaseBand label="A11y Text" start={12} span={2} />
          </Grid>

          <Flex direction="column" gap="3">
            {scales.map((scale) => (
              <SwatchRow key={`${label}-${scale.key}`} scale={scale} onCopy={onCopy} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export function ColorsChart() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'success' | 'error'>('success');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastKey, setToastKey] = useState(0);

  async function handleCopy(tokenName: string) {
    const tokenValue = `var(${tokenName})`;

    try {
      await navigator.clipboard.writeText(tokenValue);
      setCopiedToken(tokenValue);
      setCopyStatus('success');
      setToastKey((current) => current + 1);
      setToastOpen(true);
    } catch {
      setCopiedToken(null);
      setCopyStatus('error');
      setToastKey((current) => current + 1);
      setToastOpen(true);
    }
  }

  return (
    <Toast.Provider swipeDirection="right" duration={1800}>
      <Flex direction="column" gap="6" style={{ maxWidth: '1000px' }}>
        <ThemeSection className="light light-theme" label="Light theme" onCopy={handleCopy} />
        <ThemeSection className="dark dark-theme" label="Dark theme" onCopy={handleCopy} />
      </Flex>

      <Toast.Root
        key={toastKey}
        open={toastOpen}
        onOpenChange={setToastOpen}
        style={{
          background: 'var(--gray-2)',
          color: 'var(--gray-12)',
          borderRadius: '12px',
          boxShadow:
            '0 10px 30px color-mix(in srgb, var(--gray-a12) 18%, transparent), inset 0 0 0 1px var(--gray-a5)',
          padding: '12px 14px',
        }}
      >
        <Toast.Title asChild>
          <Text size="2" weight="medium">
            {copyStatus === 'error' ? 'Clipboard copy failed' : 'Copied token'}
          </Text>
        </Toast.Title>
        {copyStatus === 'success' && copiedToken ? (
          <Toast.Description asChild>
            <Text size="1" style={{ color: 'var(--gray-11)' }}>
              {copiedToken}
            </Text>
          </Toast.Description>
        ) : null}
      </Toast.Root>

      <Toast.Viewport
        style={{
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          width: '320px',
          maxWidth: 'calc(100vw - 32px)',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          zIndex: 1000,
          outline: 'none',
        }}
      />
    </Toast.Provider>
  );
}
