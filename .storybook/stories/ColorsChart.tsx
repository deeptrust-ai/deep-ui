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

function getScaleToken(scaleKey: string, step: number) {
  return scaleKey.includes('-a')
    ? `var(--${scaleKey}${step})`
    : `var(--${scaleKey}-${step})`;
}

function UseCaseBand({
  label,
  start,
  span,
}: {
  label: string;
  start: number;
  span: number;
}) {
  return (
    <Grid
      gridColumn={`${start} / span ${span}`}
      pt={'10px'}
      style={{
        ...bandStyle,
      }}
    >
      <Text
        weight="medium"
        color={"gray"}
        style={{ fontSize:"10px",letterSpacing: '0.04em', textTransform: 'uppercase' }}
        align={"center"}
      >
        {label}
      </Text>
    </Grid>
  );
}

function SwatchRow({ scale }: { scale: Scale }) {
  return (
    <Flex align="center" gap="3">
      <Box style={{ width: `${labelColumnWidth}px`, flexShrink: 0 }}>
        <Text size="2" weight="medium" style={{ color: 'var(--gray-12)' }}>
          {scale.label}
        </Text>
      </Box>
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, ${columnWidth}px)`,
          gap: `${gap}px`,
        }}
      >
        {steps.map((step) => (
          <Box
            key={`${scale.key}-${step}`}
            style={{
              ...swatchBaseStyle,
              ...(scale.checkered ? alphaBackplateStyle : {}),
              backgroundColor: getScaleToken(scale.key, step),
            }}
          />
        ))}
      </Box>
    </Flex>
  );
}

function ThemeSection({
  className,
  label,
}: {
  className: string;
  label: string;
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
            Radix-style 12-step scale
          </Text>
        </Flex>

        <Box style={{ width: `${gridWidth}px`, maxWidth: '100%' }}>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: `${labelColumnWidth}px repeat(${steps.length}, ${columnWidth}px)`,
              columnGap: `${gap}px`,
              rowGap: '10px',
              alignItems: 'end',
              marginBottom: '16px',
            }}
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
          </Box>

          <Flex direction="column" gap="3">
            {scales.map((scale) => (
              <SwatchRow key={`${label}-${scale.key}`} scale={scale} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export function ColorsChart() {
  return (
    <Flex direction="column" gap="6" style={{ maxWidth: '1000px' }}>
      <ThemeSection className="light light-theme" label="Light theme" />
      <ThemeSection className="dark dark-theme" label="Dark theme" />
    </Flex>
  );
}
