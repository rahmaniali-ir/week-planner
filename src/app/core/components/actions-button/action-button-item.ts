import { IconName } from '../icon/iconPack';

export interface ActionsButtonItem<Value = any> {
  title: string;
  value?: Value;
  icon?: IconName;
  customClass?: string;
}
