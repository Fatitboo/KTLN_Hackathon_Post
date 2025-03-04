import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchFilterHackathonsQuery } from './search-filter-hackathons.query';
import { HackathonDocument } from 'src/hackathon/infrastructure/database/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';

@QueryHandler(SearchFilterHackathonsQuery)
export class SearchFilterHackathonsHandler
  implements IQueryHandler<SearchFilterHackathonsQuery>
{
  constructor(
    @InjectModel(HackathonDocument.name)
    private readonly hackathonModel: Model<HackathonDocument>,
  ) {}

  async execute(qr: SearchFilterHackathonsQuery): Promise<any> {
    const { search, location, status, length, tags, hosts, sort, page, limit } =
      qr.props;
    const query: any = {
      block: false,
    };
    const orQuery: any = [];
    // Search
    if (search && search !== '') {
      orQuery.push({ hackathonName: { $regex: search, $options: 'i' } });
      orQuery.push({ tagline: { $regex: search, $options: 'i' } });
      orQuery.push({ hostName: { $regex: search, $options: 'i' } });
    }
    // Location
    if (
      location?.length &&
      location?.length === 1 &&
      location[0] === 'Online'
    ) {
      query.location = { $in: location };
    }
    if (
      location?.length &&
      location?.length === 1 &&
      location[0] === 'In-person'
    ) {
      query.location = { $nin: ['Online'] };
    }
    const today = moment().startOf('day').toDate();
    if (status?.length) {
      const arr = status.map((s) => {
        if (s === 'Upcoming') {
          return { 'submissions.start': { $gt: today } };
        } else if (s === 'Open') {
          return {
            'submissions.start': { $lte: today },
            'submissions.deadline': { $gte: today },
          };
        } else if (s === 'Ended') {
          return { 'submissions.deadline': { $lt: today } };
        }
      });
      orQuery.push(...arr);
    }
    console.log('🚀 ~ execute ~ ength?.length:', length?.length);
    if (length?.length) {
      const arr = length.map((l) => {
        if (l === '1–6 days') {
          return {
            $expr: {
              $lte: [
                {
                  $subtract: [
                    { $toDate: '$submissions.deadline' },
                    { $toDate: '$submissions.start' },
                  ],
                },
                6 * 24 * 60 * 60 * 1000, // 6 days in milliseconds
              ],
            },
          };
        } else if (l === '1–4 weeks') {
          return {
            $expr: {
              $and: [
                {
                  $gt: [
                    {
                      $subtract: [
                        { $toDate: '$submissions.deadline' },
                        { $toDate: '$submissions.start' },
                      ],
                    },
                    6 * 24 * 60 * 60 * 1000, // 6 days in milliseconds
                  ],
                },
                {
                  $lte: [
                    {
                      $subtract: [
                        { $toDate: '$submissions.deadline' },
                        { $toDate: '$submissions.start' },
                      ],
                    },
                    28 * 24 * 60 * 60 * 1000, // 4 weeks in milliseconds
                  ],
                },
              ],
            },
          };
        } else if (l === '1+ month') {
          return {
            $expr: {
              $gt: [
                {
                  $subtract: [
                    { $toDate: '$submissions.deadline' },
                    { $toDate: '$submissions.start' },
                  ],
                },
                28 * 24 * 60 * 60 * 1000, // 1 month in milliseconds
              ],
            },
          };
        }
      });
      orQuery.push(...arr);
    }

    // Length
    if (length?.length) {
      query.length = { $in: length };
    }

    // Tags
    if (tags?.length) {
      query.hackathonTypes = { $in: tags };
    }

    // Host
    if (hosts?.length) {
      query.hostName = { $in: hosts };
    }
    if (orQuery.length > 0) {
      query.$or = orQuery;
    }

    // Sorting
    const sortOptions: any = {};
    if (sort === 'relevant') sortOptions._id = -1;
    if (sort === 'submission_date') sortOptions.submissionDate = -1;
    if (sort === 'recently_added') sortOptions.createdAt = -1;
    if (sort === 'prize_amount') sortOptions.prizes = -1;

    const skip = (page - 1) * limit;

    // Aggregation with pagination
    const hackathons = await this.hackathonModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .select([
        '_id',
        'hackathonTypes',
        'prizes',
        'hackathonName',
        'hostName',
        'isPublished',
        'thumbnail',
        'submissions',
        'prizeCurrency',
        'registerUsers',
        'tagline',
      ])
      .limit(limit)
      .exec();

    const total = await this.hackathonModel.countDocuments(query);

    return {
      data: hackathons,
      total,
      page,
      limit,
    };
  }
}
