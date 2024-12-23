export class Range {
  constructor(
    public min: number,
    public max: number,
    public type: string = 'Range',
  ) {}
}

export class TeamRange extends Range {
  constructor(
    public isRequire: boolean,
    min: number,
    max: number,
  ) {
    super(min, max);
  }
}

export class Task {
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
    public start: Date,
    public end: Date,
  ) {}
}

export class Prize {
  constructor(
    public prizeName: string,
    public cashValue: string,
    public description: string,
    public numberWinningProject: number,
    public winnerList: string,
  ) {}
}
