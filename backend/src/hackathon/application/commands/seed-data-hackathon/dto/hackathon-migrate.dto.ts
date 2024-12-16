import { Judges, Submission } from 'src/hackathon/adapter/dto/type.dto';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
export class HackathonMigrateDTO {
  hackathonName: string;
  tagline: string;
  managerMail: string;
  hostName: string;
  hackathonTypes: string[];
  // registerUsers: RegisterUser[];
  // submitions: Types.ObjectId[];
  // registedTeams: Types.ObjectId[];
  applyFor: string;
  isPublished: boolean;
  participantAge: any;
  teamRequirement: any;
  thumbnail: string;
  headerTitleImage: string;
  headerImgBackground: string;
  mainDescription: string;
  videoDescription: string;
  submissionDescription: string;
  ruleDescription: string;
  resourceDescription: string;
  communityChatLink: string;
  tasks: any[];
  subjectMailTitle: string;
  contentMailRegister: string;
  submissions: Submission;
  judgingType: string;
  judgingPeriod: any;
  judges: any[];
  criteria: any[];
  winnersAnnounced: string;
  prizeCurrency: string;
  prizes: any[];
  // user: Types.ObjectId;

  static fromCSVChunk(chunk: any): HackathonMigrateDTO {
    const dateObject = transformDate(chunk['end_date']);

    return {
      hackathonName: chunk['title'],
      tagline: chunk['challenge_description'],
      managerMail: generateRandomEmail(),
      hostName: chunk['organization_name'],
      hackathonTypes: convertTagsToArray(chunk['themes']),
      // registerUsers: RegisterUser[],
      // submitions: Types.ObjectId[],
      // registedTeams: Types.ObjectId[],
      applyFor: getRandomEducationLevel(),
      isPublished: true,
      participantAge: {
        min: 13,
      },
      teamRequirement: {
        min: 2,
        max: 4,
        isRequire: true,
      },
      thumbnail:
        chunk['img_avt'] ||
        'https://res.cloudinary.com/dvnxdtrzn/image/upload/v1732183629/shopDEV/imgDefaultProject_atbisz.gif',
      headerTitleImage: chunk['image'],
      headerImgBackground: chunk['img_bg'],
      mainDescription: chunk['description'],
      videoDescription: 'https://www.youtube.com/watch?v=6LOtqprIeGQ',
      submissionDescription: chunk['challenge_requirements'],
      ruleDescription: chunk['rule_section'],
      resourceDescription: chunk['resources_section'],
      communityChatLink: 'https://discord.gg/aRThqngB',
      tasks: getRandomObjectList(),
      subjectMailTitle: 'Your hackathon harvest is here!🌾',
      contentMailRegister: `<table width="100%" border="0" cellpadding="0" cellspacing="0" style="box-sizing: border-box; color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 254, 254); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;" id="isPasted"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td style="margin: 0px; box-sizing: border-box; padding-left: 15px; padding-top: 10px; text-align: center; width: 565px;"><h1 style='box-sizing: border-box; margin: 0px; color: rgb(51, 51, 51); direction: ltr; font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 21.6px; text-align: left;'><span style="box-sizing: border-box; word-break: break-word;">We're back with a fresh crop of opportunities for you to grow, learn, and win!</span></h1></td></tr></tbody></table><table width="100%" border="0" cellpadding="0" cellspacing="0" style="box-sizing: border-box; color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: small; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 254, 254); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; word-break: break-word;"><tbody style="box-sizing: border-box;"><tr style="box-sizing: border-box;"><td style="margin: 0px; box-sizing: border-box; padding-left: 15px; padding-right: 15px; padding-top: 15px;"><div style='box-sizing: border-box; color: rgb(51, 51, 51); direction: ltr; font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; font-size: 15px; font-weight: 400; letter-spacing: 0px; line-height: 22.5px; text-align: left;'><p style="box-sizing: border-box; line-height: inherit; margin: 0px 0px 15px;">We rounded up some of the most exciting competitions happening right now — don't miss your chance to make your mark and win big.<img alt="🤩" draggable="false" src="blob:http://localhost:5173/afe8db9f-55b1-4426-957e-874ce5c4ca0c" style="height: 1.2em; width: 1.2em; box-sizing: border-box;" class="fr-fil fr-dib"></p><p style="box-sizing: border-box; line-height: inherit; margin: 0px 0px 15px;">Check out brand new hackathons from Atlassian, Google, Determined AI, and more.<img alt="👇" draggable="false" src="blob:http://localhost:5173/19509fe3-4239-4928-ae82-d040dbc1f8a9" style="height: 1.2em; width: 1.2em; box-sizing: border-box;" class="fr-fil fr-dib"></p><p style="box-sizing: border-box; line-height: inherit; margin: 0px 0px 15px;">Happy coding!</p><p style="box-sizing: border-box; line-height: inherit; margin: 0px;">-Devpost Team&nbsp;</p></div></td></tr></tbody></table>`,
      submissions: {
        start: chunk['start_date'],
        deadline: convertDateFormat(chunk['end_date']),
        note: `<p><span style='color: rgb(25, 35, 37); font-family: Circular, "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 700; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;' id="isPasted">Have you signed up for the Chrome Built-in AI Early Preview Program? Sign up to gain access to the documentation, stay up-to-date with the latest changes, and discover new APIs.</span></p>`,
        isUploadFile: true,
        isUploadVideo: true,
      },
      judgingType: getRandomEducationLevel('judge'),
      judgingPeriod: {
        start: dateObject.start,
        end: dateObject.end,
      },
      judges: generateRandomJudgesList(getRandom()),
      criteria: generateRandomCiteList(getRandom()),
      winnersAnnounced: dateObject.announcement,
      prizeCurrency: '$',
      prizes: getRandomPrizeList(),
      // user: Types.ObjectId,
    };
  }
}
function getRandomObjectList() {
  const labels = ['Home', 'About Us', 'Services', 'Contact', 'Blog'];
  const types = ['Page', 'Section', 'Article', 'Link', 'External'];
  const urls = [
    'https://example.com/home',
    'https://example.com/about',
    'https://example.com/services',
    'https://example.com/contact',
    'https://example.com/blog',
  ];

  // Tạo số lượng object ngẫu nhiên từ 1-5
  const listLength = Math.floor(Math.random() * 5) + 1;
  const objectList = [];

  for (let i = 0; i < listLength; i++) {
    const randomIndex = Math.floor(Math.random() * labels.length);
    objectList.push({
      id: Date.now() + i, // Unique ID dựa trên timestamp
      label: labels[randomIndex],
      type: types[randomIndex],
      url: urls[randomIndex],
    });
  }

  return objectList;
}
function getRandomPrizeList() {
  const prizeNames = [
    'Best ‘Real-World’ App (Chrome Extension)',
    'Most Innovative App',
    'Best UI/UX Design',
    'Top Community Impact App',
    'Best Educational App',
  ];
  const cashValues = ['12,000', '15,000', '10,000', '8,000', '20,000'];
  const descriptions = [
    '* Featured on Google channels\n* Virtual Coffee with Google team member',
    '* Exclusive mentorship with experts\n* Highlight on major platforms',
    '* Access to premium tools\n* Official recognition certificate',
    '* Networking opportunities with industry leaders\n* Free premium services for 1 year',
    '* Special spotlight in global events\n* Partnership opportunities with top firms',
  ];

  // Tạo số lượng object ngẫu nhiên từ 1-5
  const listLength = Math.floor(Math.random() * 5) + 1;
  const prizeList = [];

  for (let i = 0; i < listLength; i++) {
    // Tạo object ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * prizeNames.length);
    prizeList.push({
      id: Date.now() + i, // Unique ID dựa trên timestamp
      prizeName: prizeNames[randomIndex],
      cashValue: cashValues[randomIndex],
      numberWinningProject: String(Math.floor(Math.random() * 3) + 1), // 1-3 dự án chiến thắng
      description: descriptions[randomIndex],
    });
  }

  return prizeList;
}
function getRandomObject() {
  const titles = [
    'Functionality',
    'Performance',
    'Usability',
    'Reliability',
    'Security',
  ];
  const descriptions = [
    'How scalable is the application? How well are the APIs used within the system?',
    'How fast does the application respond to user actions?',
    'Is the application user-friendly and intuitive?',
    'Does the application consistently perform as expected?',
    'How secure is the application against potential threats?',
  ];

  // Lấy một tiêu đề và mô tả ngẫu nhiên
  const randomIndex = Math.floor(Math.random() * titles.length);

  return {
    id: uuidv4(),
    title: titles[randomIndex],
    description: descriptions[randomIndex],
  };
}
function getRandom() {
  return Math.floor(Math.random() * 5) + 1;
}
function generateRandomEmail(): string {
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const nameLength = Math.floor(Math.random() * 10) + 5; // Tên email dài từ 5-15 ký tự
  let username = '';

  // Tạo phần username ngẫu nhiên
  for (let i = 0; i < nameLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    username += chars[randomIndex];
  }

  // Chọn domain ngẫu nhiên
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  return `${username}@${randomDomain}`;
}
function convertTagsToArray(tagsStr): string[] {
  // Loại bỏ dấu ngoặc đơn đầu và cuối, sau đó tách chuỗi thành mảng
  const cleanedStr = tagsStr.replace(/[\[\]']/g, '').trim();
  const tagsArray = cleanedStr.split(',').map((tag) => tag.trim());

  return tagsArray;
}
function transformDate(dateStr) {
  const inputDate = new Date(dateStr.split('-').reverse().join('-'));

  function formatDate(date) {
    return date.toISOString().slice(0, 16);
  }

  const startDate = new Date(inputDate);
  startDate.setDate(startDate.getDate() + 1);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 10);

  const announcementDate = new Date(endDate);
  announcementDate.setDate(announcementDate.getDate() + 7);

  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
    announcement: formatDate(announcementDate),
  };
}
function getRandomEducationLevel(type?: string): string {
  const levels = ['College/University', 'Civic', 'High School'];
  const judgesTypes = ['ONLINE', 'OFFLINE'];

  const randomIndex = Math.floor(Math.random() * levels.length);
  const randomIndex2 = Math.floor(Math.random() * judgesTypes.length);

  return type === 'judge' ? judgesTypes[randomIndex2] : levels[randomIndex];
}
function convertDateFormat(dateString: string): Date {
  // Tách chuỗi ngày thành các phần
  const [day, month, year] = dateString.split('-');

  // Trả về định dạng mới
  return new Date(Number(year), Number(month) - 1, Number(day));
  // return `${year}-${month}-${day}`;
}
function createRandomJudge() {
  const judge = {
    id: uuidv4(),
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    title: faker.person.jobTitle(),
    photo: faker.image.avatar(),
  };

  return judge;
}

// Hàm tạo danh sách ngẫu nhiên Judges
function generateRandomJudgesList(count: number): any[] {
  return Array.from({ length: count }, () => createRandomJudge());
}

// Hàm tạo danh sách ngẫu nhiên cite
function generateRandomCiteList(count: number): any[] {
  return Array.from({ length: count }, () => getRandomObject());
}
