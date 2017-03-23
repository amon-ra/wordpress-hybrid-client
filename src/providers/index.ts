import { Config } from './config';
import { Toast } from './toast';
import { Menu } from './menu';
import { AdsService } from './ads-service';
import { Analytics } from './analytics';

export * from './config';
export * from './toast';
export * from './menu';
export * from './analytics';
export * from './ads-service';

export const PROVIDERS = [
  Config,
  Toast,
  AdsService,
  Analytics,
  Menu
];
