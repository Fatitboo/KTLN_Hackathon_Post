import { ExcelSheetValue } from '../excel.helper';

export class RegisterUserCmsExcelRESP {
  id: string;
  stt: string;
  fullname: string;
  dob: string;
  title: string;
  email: string;
  team: string;
  address: string;
  registerAt: string;
  skills: string;
  interestedIn: string;
  githubLink: string;

  static fromEntity(data: {
    id;
    fullname;
    dob;
    title;
    email;
    team;
    address;
    registerAt;
    skills;
    interestedIn;
    stt;
    githubLink;
  }): RegisterUserCmsExcelRESP {
    return {
      ...data,
    };
  }

  static getSheetValue(): ExcelSheetValue<RegisterUserCmsExcelRESP> {
    return {
      stt: { name: 'ID', width: 5 },
      id: { name: 'User ID', width: 15 },
      fullname: { name: 'Full name', width: 20 },
      dob: { name: 'DOB', width: 12 },
      title: { name: 'Title', width: 20 },
      email: { name: 'Email', width: 30 },
      team: { name: 'Team', width: 15 },
      address: { name: 'Address', width: 15 },
      registerAt: { name: 'Register At', width: 15 },
      skills: { name: 'Skills', width: 30 },
      interestedIn: { name: 'Interested In', width: 30 },
      githubLink: { name: 'Github', width: 30 },
    };
  }
}
