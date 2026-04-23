import { PopoverTypes } from "./popover-type";

export interface IPopoverData {
  status: boolean;
  popoverType: PopoverTypes | null;
  blackWrapper: boolean;
  data?: any[];
  isTotalBlack: boolean;
}

