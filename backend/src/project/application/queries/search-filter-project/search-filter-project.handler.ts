import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchFilterProjectsQuery } from './search-filter-project.query';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@QueryHandler(SearchFilterProjectsQuery)
export class SearchFilterProjectsHandler
  implements IQueryHandler<SearchFilterProjectsQuery>
{
  constructor(
    @InjectModel(ProjectDocument.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async execute(query: SearchFilterProjectsQuery): Promise<any> {
    const {
      searchKeyword,
      withDemoVideos,
      withGallery,
      winnersOnly,
      notHadPrizes,
      tags,
      hackathonId,
      page = 1,
      limit = 10,
    } = query.props;

    const filter: any = {};

    if (searchKeyword) {
      filter.$or = [
        { projectTitle: { $regex: searchKeyword, $options: 'i' } },
        { tagline: { $regex: searchKeyword, $options: 'i' } },
      ];
    }

    if (withDemoVideos !== undefined) {
      filter['tryoutLinks.0'] = withDemoVideos
        ? { $exists: true }
        : { $exists: false };
    }

    if (withGallery !== undefined) {
      filter['galary.0'] = withGallery ? { $exists: true } : { $exists: false };
    }

    if (winnersOnly) {
      filter.isSubmmited = true;
    } else if (notHadPrizes) {
      filter.isSubmmited = false;
    }

    if (tags && tags.length > 0) {
      filter.builtWith = { $in: tags };
    }

    if (hackathonId) {
      filter.registeredToHackathon = hackathonId;
    }

    const total = await this.projectModel.countDocuments(filter); // Tổng số lượng dự án
    const skip = (page - 1) * limit;

    const data = await this.projectModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    return { data, total, page, limit };
  }
}
