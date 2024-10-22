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
    public start: string,
    public deadline: string,
    public note: string,
    public isUploadFile: boolean,
    public isUploadVideo: boolean,
  ) {}
}
