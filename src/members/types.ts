import { BaseApiResult, URLString } from '../types';

type Chamber = 'House' | 'Senate';
type MemberId = string;

interface SharedMember {
  title: string;
  short_title: string;
  state: string;
  party: 'R' | 'D' | 'ID';
  leadership_role: string; // TODO: this
  fec_candidate_id: string;
  lis_id: string;
  ocd_id: string;
  seniority: string;
  senate_class: number | string;
  state_rank: string;
  office: string;
  phone: string;
  fax: string;
  contact_form: URLString;
  missed_votes_pct: number;
  votes_with_party_pct: number;
}

interface MemberName {
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
}

export interface Member extends SharedMember, MemberName {
  id: MemberId;
  api_uri: URLString;
  date_of_birth: string;
  gender: 'M' | 'F';
  twitter_account: string;
  facebook_account: string;
  youtube_account: string;
  govtrack_id: string;
  cspan_id: string;
  votesmart_id: string;
  icpsr_id: string;
  crp_id: string;
  google_entity_id: string;
  url: URLString;
  rss_url: URLString;
  in_office: boolean;
  dw_nominate: number;
  ideal_point: any; // TODO: what is this
  next_election: string;
  total_votes: number;
  missed_votes: number;
  total_present: number;
  last_updated: string;
  senate_class: string;
}

interface MemberRole extends SharedMember {
  congress: string;
  chamber: Chamber;
  senate_class: number;
  start_date: string;
  end_date: string;
  bills_sponsored: number;
  bills_cosponsored: number;
  committees: Committee[];
  subcommittees: SubCommittee[];
}

interface Committee {
  name: string;
  code: string;
  api_uri: URLString;
  side: string;
  title: string;
  rank_in_party: number;
  begin_date: string;
  end_date: string;
}

interface SubCommittee extends Committee {
  parent_committee_id: string;
}

export interface SingleMember extends MemberName {
  member_id: MemberId;
  date_of_birth: string;
  gender: 'M' | 'F';
  url: URLString;
  times_topics_url: URLString;
  times_tag: string;
  govtract_id: string;
  cspan_id: string;
  votesmart_id: string;
  icpsr_id: string;
  twitter_account: string;
  facebook_account: string;
  youtube_account: string;
  crp_id: string;
  google_entity_id: string;
  rss_url: URLString;
  in_office: boolean;
  current_party: 'D' | 'R' | 'I'; // yes, not ID
  most_recent_vote: string;
  last_updated: string;
  roles: MemberRole[];
}

export interface NewMember extends MemberName {
  id: MemberId;
  api_uri: URLString;
  party: 'R' | 'D' | 'I';
  chamber: Chamber;
  state: string;
  district: string;
  start_date: string;
}

export interface CurrentMember extends MemberName {
  id: MemberId;
  name: string;
  role: string;
  gender: 'M' | 'F';
  party: 'R' | 'D' | 'I';
  times_topics_url: URLString;
  twitter_id: string;
  facebook_account: string;
  youtube_id: string;
  seniority: string;
  next_election: string;
  api_uri: URLString;
}

export interface LeavingMember extends MemberName {
  id: MemberId;
  api_uri: string;
  party: 'D' | 'R' | 'I';
  state: string;
  district: string;
  begin_date: string;
  end_date: string;
  status: string;
  note: string;
}

export interface MemberVotes {
  member_id: MemberId;
  total_votes: string;
  offset: string;
  votes: MemberVote[];
}

interface MemberVote {
  member_id: MemberId;
  chamber: Chamber;
  congress: string;
  session: string;
  roll_call: string;
  vote_uri: URLString;
  bill: {
    bill_id: string;
    number: string;
    bill_uri: URLString;
    title: string;
    latest_action: string;
  };
  description: string;
  question: string;
  result: string;
  date: string;
  time: string;
  total: {
    yes: number;
    no: number;
    present: number;
    not_voting: number;
  };
  position: string; // TODO: refine this
}

interface MemberComparison {
  first_member_id: MemberId;
  first_member_api_uri: URLString;
  second_member_id: MemberId;
  second_member_api_uri: URLString;
  congress: string;
  chamber: Chamber;
  common_votes: string; // really a number
  disagree_votes: string; // really a number
  agree_percent: string; // really a number
  disagree_percent: string; // really a number
}

export interface MemberListResult extends BaseApiResult {
  results: {
    congress: string;
    chamber: Chamber;
    num_results: number;
    offset: number;
    members: Member[];
  };
}

export interface SingleMemberResult extends BaseApiResult {
  results: SingleMember[];
}

export interface NewMemberListResult extends BaseApiResult {
  results: {
    num_results: string;
    offset: string;
    members: NewMember[];
  };
}

export interface CurrentMemberListResult extends BaseApiResult {
  results: CurrentMember[];
}

export interface MemberVotesResult extends BaseApiResult {
  results: MemberVotes[];
}

export interface MemberComparisonResult extends BaseApiResult {
  results: MemberComparison;
}
