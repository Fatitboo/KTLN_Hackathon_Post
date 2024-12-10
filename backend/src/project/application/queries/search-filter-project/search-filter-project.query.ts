import { FilterProjectsDto } from 'src/project/adapter/dto/search-filter-projects.dto';

export class SearchFilterProjectsQuery {
  constructor(public readonly props: FilterProjectsDto) {}
}
