import { VNodeChild } from 'vue';

export type NoticeIconData = {
  avatar?: string | VNodeChild;
  title?: VNodeChild;
  description?: VNodeChild;
  datetime?: VNodeChild;
  extra?: VNodeChild;
  key?: string | number;
  read?: boolean;
};
