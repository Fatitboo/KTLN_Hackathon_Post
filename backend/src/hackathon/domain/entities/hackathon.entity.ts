export class Hackathon {
  constructor(
    public id: string,
    public hackathonName: string,
    public tagline: string,
    public managerMail: string,
    public hostName: string,
    public hackathonTypes: string[],
    public applyFor: string,
    public isPublished: boolean,
    public participantAge: Range,
    public teamRequirement: TeamRange,
    public thumbnail: string,
    public headerTitleImage: string,
    public mainDescription: string,
    public videoDescription: string,
    public submissionDescription: string,
    public ruleDescription: string,
    public resourceDescription: string,
    public communityChatLink: string,
    public tasks: Task[],
    public subjectMailTitle: string,
    public contentMailRegister: string,
    public submissions: Submission,
    public judgingType: string,
    public judgingPeriod: DateRange,
    public judges: Judges[],
    public criteria: Criteria[],
    public winnersAnnounced: string,
    public prizeCurrency: string,
    public prizes: Prize[],
  ) {}
  setId(id: string) {
    this.id = id;
  }
}

class Range {
  constructor(
    public min: number,
    public max: number,
    public type: string = 'Range',
  ) {}
}

class TeamRange extends Range {
  constructor(
    public isRequire: boolean,
    min: number,
    max: number,
  ) {
    super(min, max);
  }
}

class Task {
  constructor(
    public type: string,
    public label: string,
    public url: string,
  ) {}
}

export class Submission {
  constructor(
    public start: Date,
    public deadline: Date,
    public note: string,
    public isUploadFile: boolean,
    public isUploadVideo: boolean,
  ) {}
}

export class Judges {
  constructor(
    public fullName: string,
    public email: string,
    public title: string,
    public photo: string,
  ) {}
}

export class Criteria {
  constructor(
    public title: string,
    public description: string,
  ) {}
}

export class DateRange {
  constructor(
    public start: string,
    public end: string,
  ) {}
}

export class Prize {
  constructor(
    public prizeName: string,
    public cashValue: string,
    public description: string,
    public numberWinningProject: number,
  ) {}
}
