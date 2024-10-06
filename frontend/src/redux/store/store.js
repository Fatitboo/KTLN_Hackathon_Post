import {configureStore} from '@reduxjs/toolkit';
import usersSlices from '../slices/users/usersSlices';
import skillsSlices from '../slices/skills/skillsSlices';
import occupationsSlices from '../slices/occupations/occupationsSlices';
import accountVericationSlices from '../slices/accountVerication/accountVericationSlices';
import vacanciesSlices from '../slices/vacancies/vacanciesSlices';
import projectsSlices from '../slices/projects/projectsSlices';
const store = configureStore({
    reducer:{
        users: usersSlices.reducer,
        skills:skillsSlices.reducer,
        occupations: occupationsSlices.reducer,
        account: accountVericationSlices.reducer,
        vacancies: vacanciesSlices.reducer,
        projects: projectsSlices.reducer,
    },
});
export default store;