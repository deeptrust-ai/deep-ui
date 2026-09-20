import type { ILogoProps, SizeKey } from './types';
import { SIZE_CONFIG } from './constants';
import { Flex, Link } from '@radix-ui/themes';
import logoSrc from './logo.png';

const SIZE_GAP: Record<SizeKey, '1' | '2' | '4'> = { small: '1', medium: '2', large: '4' };

export const Logo = ({
  size = 'medium',
  src,
  alt,
  href = '/',
  anchorComponent,
  anchorProps,
}: ILogoProps) => {
  const width = SIZE_CONFIG[size].baseWidth;
  const image = src ? (
    <img
      src={src}
      alt={alt ?? 'Organization logo'}
      style={{
        display: 'block',
        maxHeight: `${Math.round(width * 0.28)}px`,
        maxWidth: width,
        objectFit: 'contain',
      }}
    />
  ) : (
    <img src={logoSrc} alt={alt ?? 'DeepTrust.ai Logo'} width={width} style={{ display: 'block' }} />
  );

  const renderLink = () => {
    if (anchorComponent) {
      const AnchorComponent = anchorComponent;
      return <AnchorComponent {...anchorProps}>{image}</AnchorComponent>;
    }
    if (href) {
      return <Link href={href}>{image}</Link>;
    }
    return image;
  };

  return (
    <Flex align="center" justify="start" gap={SIZE_GAP[size]}>{renderLink()}</Flex>
  );
};

export default Logo;
export type { ILogoProps } from './types';
