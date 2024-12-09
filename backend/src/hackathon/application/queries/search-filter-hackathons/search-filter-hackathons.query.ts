export class SearchFilterHackathonsQueryProps {
  search: string;
  location: string[];
  status: string[];
  length: string[];
  tags: string[];
  host: string;
  sort: string;
  page: number = 1;
  limit: number = 10;
}

export class SearchFilterHackathonsQuery {
  constructor(public readonly props: SearchFilterHackathonsQueryProps) {}
}
