import { VARIANT_CONFIG } from './constants';

export interface ILogoProps {
  width?: number;
  variant?: keyof typeof VARIANT_CONFIG;
}
