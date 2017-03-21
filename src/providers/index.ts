import { Config } from './config';
import { Toast } from './toast';
import { Menu } from './menu';
import { AdsService } from './ads-service';

export * from './config';
export * from './toast';
export * from './menu';

export const PROVIDERS = [
  Config,
  Toast,
  AdsService,
  Menu
];
