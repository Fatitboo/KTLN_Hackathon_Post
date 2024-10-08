import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
const apiPrefix = 'api/v1/skills';
// get all skills
export const getAllSkillsAction = createAsyncThunk(
    'skills/getAll',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// create skill
export const createNewSkillAction = createAsyncThunk(
    'skills/createSkill',
    async (skill, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}`, skill, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update skill
export const updateSkillAction = createAsyncThunk(
    'skills/updateSkill',
    async (skill, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const dt = {
                skillName: skill.skillName,
                description: skill.description
            }

            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/${skill.skillId}`, dt, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// delete skill
export const deleteSkillAction = createAsyncThunk(
    'skills/deleteSkill',
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.delete(`${baseUrl}/${apiPrefix}/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// isActiveSidebarAction
export const isActiveSidebarAction = createAsyncThunk(
    'skills/isActiveSidebarAction',
    async (path, { rejectWithValue, getState, dispatch }) => {
        try {
            return path;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// isActiveSidebarAction
export const resetSuccessAction = createAsyncThunk(
    'skills/resetSuccessAction',
    async (path, { rejectWithValue, getState, dispatch }) => {
        try {
            return path;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// create Report
export const createNewReportAction = createAsyncThunk(
    'skills/createReport',
    async (d, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const dt = {
                ...d.report,
                orgName: userAuth?.user?.fullName,
                fromId: userAuth?.user?.userId
            }
            console.log(dt)
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/create-report/${d.id}`, dt, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                console.log(error)

                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//getAllReportsAdminAction
export const getAllReportsAdminAction = createAsyncThunk(
    'skills/getAllReportsAdmin',
    async (d, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-report-admin`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                console.log(error)

                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get All Histories
export const getAllHistoriesAction = createAsyncThunk(
    'skills/getAllHistories',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.get(`${baseUrl}/api/v1/users/get-all-histories`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
const skillsSlices = createSlice({
    name: 'skills',
    initialState: {
        loading: false,
        skillsList: [],
        appErr: null,
        isActive: 'Dashboard',
        histories: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(isActiveSidebarAction.fulfilled, (state, action) => {
            state.isActive = action.payload;
        }),
            builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
                state.isSuccessRp = false;
                state.isSuccess =false;
            }),
            // get all skills
            builder.addCase(getAllSkillsAction.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(getAllSkillsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.skillsList = action?.payload;
                state.appErr = null;
            }),
            builder.addCase(getAllSkillsAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // get all skills
            builder.addCase(getAllHistoriesAction.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = false;
            }),
            builder.addCase(getAllHistoriesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.histories = action?.payload?.histories;
                state.appErr = null;
                state.isSuccess = true;
            }),
            builder.addCase(getAllHistoriesAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // get all skills
            builder.addCase(getAllReportsAdminAction.pending, (state, action) => {
                state.loading = true;
                state.isSuccessRp = false;
            }),
            builder.addCase(getAllReportsAdminAction.fulfilled, (state, action) => {
                state.loading = false;
                state.vacProList = action?.payload.reports;
                state.appErr = null;
                state.isSuccessRp = true;
            }),
            builder.addCase(getAllReportsAdminAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessRp = false;
            }),
            // create new skill 
            builder.addCase(createNewSkillAction.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(createNewSkillAction.fulfilled, (state, action) => {
                state.loading = false;
                state.skillsList.push(action?.payload?.skill);
                state.appErr = null;
            }),
            builder.addCase(createNewSkillAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // create new skill 
            builder.addCase(createNewReportAction.pending, (state, action) => {
                state.loading = true;
                state.isSuccessRp = false;
            }),
            builder.addCase(createNewReportAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccessRp = true;
            }),
            builder.addCase(createNewReportAction.rejected, (state, action) => {
                state.loading = false;
                state.isSuccessRp = false;
                state.appErr = action?.payload?.message;
            }),
            // update  skill 
            builder.addCase(updateSkillAction.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(updateSkillAction.fulfilled, (state, action) => {
                state.loading = false;
                let currentSkill = state.skillsList.findIndex((skill) => skill.skillId === action?.payload?.updateSkill?.skillId);
                state.skillsList[currentSkill] = action?.payload?.updateSkill;
                state.appErr = null;
            }),
            builder.addCase(updateSkillAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // delete  skill 
            builder.addCase(deleteSkillAction.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(deleteSkillAction.fulfilled, (state, action) => {
                state.loading = false;
                state.skillsList = state.skillsList.filter((skill) => skill.skillId !== action?.payload?.deleteId);
                state.appErr = null;
            }),
            builder.addCase(deleteSkillAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            })

    }

});

export default skillsSlices;