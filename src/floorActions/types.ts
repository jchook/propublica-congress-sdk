import { BaseApiResult, BasePagedResult, Chamber } from '../types';

interface FloorAction {
  congress: string;
  chamber: Chamber;
  timestamp: string;
  date: string;
  action_id: string;
  description: string;
  bill_ids: string[];
}

export interface FloorActionListResult extends BaseApiResult {
  results: (BasePagedResult & {
    congress: string;
    date: string;
    floor_actions: FloorAction[];
  })[];
}
