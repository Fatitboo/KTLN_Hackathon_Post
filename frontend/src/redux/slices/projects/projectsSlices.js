import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { redirect } from 'react-router-dom'
const apiPrefix = 'api/v1/projects';

//get all projects
export const getAllProjects = createAsyncThunk(
    'project/getAllProjects',
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

//get all projects
export const getAllProjectsUser = createAsyncThunk(
    'project/getAllProjectsUser',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-project-user/${payload.id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get all projects Admin
export const getAllProjectsAdmin = createAsyncThunk(
    'project/getAllProjectsAdmin',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-projects`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//create project
export const createProject = createAsyncThunk(
    'projects/createProject',
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
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/create-project/${payload.id}`, payload.value, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//create project
export const updateProject = createAsyncThunk(
    'projects/updateProjectId',
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
            console.log(payload)
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-project/${payload.id}`, payload.value, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//Delete project
export const deleteProjectAction = createAsyncThunk(
    'projects/deleteProject',
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
            const { data } = await axios.delete(`${baseUrl}/${apiPrefix}/delete-project/${payload.id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get project
export const getProjectSingle = createAsyncThunk(
    'projects/getProjectSingle',
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
            console.log(payload.value)
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-project-info/${payload.id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get Participants project
export const getParticipantsProject = createAsyncThunk(
    'projects/getParticipantsProject',
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
            console.log(payload.value)
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-participants-project/${payload.id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//update Favourite Project
export const updateFavouriteProjectAction = createAsyncThunk(
    "projects/updateFavouriteProject",
    async (obj, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // http call 
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.user?.token}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        const formData = new FormData();
        formData.append('projectId', obj.projectId);
        try {
            const { data } = await axios.put(
                `${baseUrl}/${apiPrefix}/update-favourite-project/${userAuth?.user?.userId}`,
                formData,
                config
            );
            if (obj.notify) {

                obj.notify('success', 'Update favourite project successfully!');
            }
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//update Favourite project
export const getAllFavouriteProjectsAction = createAsyncThunk(
    "projects/getAllFavouriteProjects",
    async (projectId, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // http call 
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.user?.token}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-favourite-projects/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//update Project Status
export const updateProjectStatus = createAsyncThunk(
    'projects/updateStatusProject',
    async (dt, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            formData.append('status', dt.status)
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-status-project/${dt.id}`, formData, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//Set success
export const resetSuccessAction = createAsyncThunk(
    "projects/resetSuccess",
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//Set value
export const resetValueAction = createAsyncThunk(
    "projects/resetValue",
    async (data, { rejectWithValue, getState, dispatch }) => {
        try {
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
export function setValueSuccess(value) {
    return function setValueSuccess(dispatch, getState) {
        dispatch(projectsSlices.actions.setValueSuccess(value))
    }

}
const projectsSlices = createSlice({
    name: 'projects',
    initialState: {
        loading: false,
        appErr: null,
        isSuccess: false,
        projects: [],
        project: null,
        isSuccessUD: false,
        loadingUD: false,
        loadingDL: false,
        loadingCR: false,
        projectsAdmin: [],
        projectparticipants: []
    },
    reducers: {
        setValueSuccess: (state, action) => {
            console.log(action)
            state.isSuccess = action.payload
            state.isSuccessUD = action.payload
        },
    },
    extraReducers: (builder) => {

        //get all projects
        builder.addCase(getAllProjects.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(getAllProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action?.payload?.projects;
            }),
            builder.addCase(getAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),

            //get all projects user
            builder.addCase(getAllProjectsUser.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(getAllProjectsUser.fulfilled, (state, action) => {
                state.loading = false;
                state.projectsOfCor = action?.payload?.projects;
            }),
            builder.addCase(getAllProjectsUser.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            //get all projects admin
            builder.addCase(getAllProjectsAdmin.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = false;

            }),
            builder.addCase(getAllProjectsAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.projectsAdmin = action?.payload?.projects;
                state.isSuccess = true;

            }),
            builder.addCase(getAllProjectsAdmin.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;

            }),
            //create project
            builder.addCase(createProject.pending, (state, action) => {
                state.loadingCR = true;
                state.isSuccess = false;
            }),
            builder.addCase(createProject.fulfilled, (state, action) => {
                state.loadingCR = false;
                state.projects.push(action.payload.project)
                state.isSuccess = true;
            }),
            builder.addCase(createProject.rejected, (state, action) => {
                state.loadingCR = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            //update Project
            builder.addCase(updateProject.pending, (state, action) => {
                state.loadingUD = true;
                state.isSuccessUD = false;
            }),
            builder.addCase(updateProject.fulfilled, (state, action) => {
                state.loadingUD = false;
                state.projects.map((item) => item.projectId === action.payload.project.projectId ? { ...action.payload.project } : { ...item })
                state.isSuccessUD = true;
            }),
            builder.addCase(updateProject.rejected, (state, action) => {
                state.loadingUD = false;
                state.isSuccessUD = false;
            }),
            //delete Project
            builder.addCase(deleteProjectAction.pending, (state, action) => {
                state.loadingDL = true;
                state.isSuccess = false;
            }),
            builder.addCase(deleteProjectAction.fulfilled, (state, action) => {
                state.loadingDL = false;
                state.projects = state.projects.filter((item) => item.projectId !== action.payload.projectId)
                state.isSuccess = true;
            }),
            builder.addCase(deleteProjectAction.rejected, (state, action) => {
                state.loadingDL = false;
                state.isSuccess = false;
            }),

            //get project single
            builder.addCase(getProjectSingle.pending, (state, action) => {
                state.loading = true;
                state.loadingPr = true;
            }),
            builder.addCase(getProjectSingle.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingPr = false;
                state.projects = [];
                state.project = action.payload.res;
            }),
            builder.addCase(getProjectSingle.rejected, (state, action) => {
                state.loading = false;
                state.loadingPr = false;
                state.appErr = action?.payload?.message;
            }),
            //get project single
            builder.addCase(getParticipantsProject.pending, (state, action) => {
                state.loading = true;
                state.loadingPr = true;
            }),
            builder.addCase(getParticipantsProject.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingPr = false;
                state.projectparticipants = action.payload.participantsProject;
            }),
            builder.addCase(getParticipantsProject.rejected, (state, action) => {
                state.loading = false;
                state.loadingPr = false;
                state.appErr = action?.payload?.message;
            }),
            builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
                state.isSuccess = false;
                state.isSuccessFvr = false;
                state.isSuccessUpd = false;
            }),
            builder.addCase(resetValueAction.fulfilled, (state, action) => {
                console.log('cc')
                state.project = null;
                state.projects = [];

            }),
            //update Favourite Project Action
            builder.addCase(updateFavouriteProjectAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),

            builder.addCase(updateFavouriteProjectAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = undefined;
                if (state.project) {
                    if (action?.payload?.isPush) {
                        if (state.project.project.favouriteUsers) {
                            state.project.project.favouriteUsers.push(action?.payload?.userId);
                        } else {
                            state.project.project.favouriteUsers = [action?.payload?.userId];
                        }
                    }
                    else {
                        state.project.project.favouriteUsers.pop(action?.payload?.userId);
                    }
                }
                else {
                    if (typeof (state.projectsOfCor) === 'undefined') {
                        state.isSuccessFvr = true;
                        var currentProject = state.projects.findIndex(project => project.project.projectId === action?.payload?.projectId)
                        if (currentProject !== -1) {
                            if (action?.payload?.isPush) {
                                if (state.projects[currentProject].project.favouriteUsers) {
                                    state.projects[currentProject].project.favouriteUsers.push(action?.payload?.userId);
                                } else {
                                    state.projects[currentProject].project.favouriteUsers = [action?.payload?.userId];
                                }
                            }
                            else {
                                state.projects[currentProject].project.favouriteUsers.pop(action?.payload?.userId);
                            }
                        }
                        else {
                            if(state.favouriteProjects){
                                console.log(currentProject)
                                state.favouriteProjects= state.favouriteProjects.filter(item => item.project.projectId !== action?.payload?.projectId)
                            }
                        }
                    } else {
                        var currentProject = state.projectsOfCor.findIndex(project => project.projectId === action?.payload?.projectId)

                        if (currentProject !== -1) {
                            if (action?.payload?.isPush) {
                                if (state.projectsOfCor[currentProject].favouriteUsers) {
                                    state.projectsOfCor[currentProject].favouriteUsers.push(action?.payload?.userId);
                                } else {
                                    state.projectsOfCor[currentProject].favouriteUsers = [action?.payload?.userId];
                                }
                            }
                            else {
                                state.projectsOfCor[currentProject].favouriteUsers.pop(action?.payload?.userId);
                            }
                        }
                    }
                }
                // state.isShorted = !state.isShorted;
            }),
            builder.addCase(updateFavouriteProjectAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessFvr = false;
            }),
            //update Favourite Project Action
            builder.addCase(getAllFavouriteProjectsAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),

            builder.addCase(getAllFavouriteProjectsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = undefined;
                state.isSuccess = true;
                state.projects = []
                state.project = null
                state.favouriteProjects = action?.payload?.favouriteProjects;
            }),
            builder.addCase(getAllFavouriteProjectsAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            //update vacancy status
            builder.addCase(updateProjectStatus.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(updateProjectStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                let currentProject = state.projectsAdmin.findIndex((p) => p.project.projectId === action?.payload?.updateProjectId);
                if (currentProject !== -1) state.projectsAdmin[currentProject].project.status = action?.payload?.status;
                state.isSuccessUpd = true;
            }),
            builder.addCase(updateProjectStatus.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUpd = false;
            })
    }
});

export default projectsSlices;