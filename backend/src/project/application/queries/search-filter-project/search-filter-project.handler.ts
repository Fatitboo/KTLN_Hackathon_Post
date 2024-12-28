import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchFilterProjectsQuery } from './search-filter-project.query';
import { ProjectDocument } from 'src/project/infrastructure/database/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

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
      joinHackathon,
      tags,
      hackathonId,
      sortOption,
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

    if (joinHackathon !== undefined) {
      filter['registeredToHackathon'] = joinHackathon
        ? { $exists: true }
        : { $exists: false };
    }

    if (winnersOnly) {
      filter.isSubmmited = true;
    }

    if (tags && tags.length > 0) {
      filter.builtWith = { $in: tags };
    }

    if (hackathonId) {
      filter.registeredToHackathon = new Types.ObjectId(hackathonId);
    }

    const sortOptions: any = { createdAt: -1 };
    if (sortOption === 'Popular') sortOptions._id = -1;
    if (sortOption === 'Newest') sortOptions.createdAt = -1;

    const total = await this.projectModel.countDocuments(filter); // Tổng số lượng dự án
    const skip = (page - 1) * limit;

    const data = await this.projectModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    return { data, total, page, limit };
  }
}
