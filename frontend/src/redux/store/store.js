import { configureStore } from "@reduxjs/toolkit";
import usersSlices from "../slices/users/usersSlices";
import skillsSlices from "../slices/skills/skillsSlices";
import occupationsSlices from "../slices/occupations/occupationsSlices";
import accountVericationSlices from "../slices/accountVerication/accountVericationSlices";
import vacanciesSlices from "../slices/vacancies/vacanciesSlices";
import projectsSlices from "../slices/projects/projectsSlices";
import hackathonsSlices from "../slices/hackathons/hackathonsSlices";
import chatSlices from "../slices/chat/chatSlices";
const store = configureStore({
  reducer: {
    users: usersSlices.reducer,
    skills: skillsSlices.reducer,
    occupations: occupationsSlices.reducer,
    account: accountVericationSlices.reducer,
    vacancies: vacanciesSlices.reducer,
    projects: projectsSlices.reducer,
    hackathons: hackathonsSlices.reducer,
    chats: chatSlices.reducer,
  },
});
export default store;
