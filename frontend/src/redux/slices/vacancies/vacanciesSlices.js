import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
const apiPrefix = 'api/v1/vacancies';

//get all vacancies
export const getAllVacancies = createAsyncThunk(
    'vacancies/getAllVacancies',
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
//get current uncompleted vacancies components
export const getCurrentVacanciesComponent = createAsyncThunk(
    'vacancies/getCurrentVacanciesComponent',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/posting/${payload}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//create vacancy id
export const createVacancyId = createAsyncThunk(
    'vacancies/createVacancyId',
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

            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/posting`, payload, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get vacancy component
export const getVacancyComponent = createAsyncThunk(
    'vacancies/getVacancyComponent',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/posting/${payload.id}/${payload.flag}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get vacancy info detail
export const getVacancyInfoDetail = createAsyncThunk(
    'vacancies/getVacancyInfoDetail',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-vacancy-by-id/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//update Vacancy Component
export const updateVacancyComponent = createAsyncThunk(
    'vacancies/updateVacancy',
    async (vacancy, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/posting/${vacancy.id}`, { ...vacancy.value }, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//update Vacancy Status
export const updateVacancyStatus = createAsyncThunk(
    'vacancies/updateStatusVacancy',
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-status-vacancy/${dt.id}`, formData, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get vacancy component
export const getVacancyCor = createAsyncThunk(
    'vacancies/getVacancyCor',
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

            const { data } = await axios.get(`${baseUrl}/api/v1/users/get-vacancy-cor/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get complete vacancy component
export const getCompleteVacancyCor = createAsyncThunk(
    'vacancies/getCompleteVacancyCor',
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

            const { data } = await axios.get(`${baseUrl}/api/v1/users/get-complete-vacancy-cor/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get complete vacancy component
export const getInCompleteVacancyCor = createAsyncThunk(
    'vacancies/getInCompleteVacancyCor',
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

            const { data } = await axios.get(`${baseUrl}/api/v1/users/get-incomplete-vacancy-cor/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

//get uncompleted vacancy
export const getFullUnCompletedVacancy = createAsyncThunk(
    'vacancies/getUnVacancy',
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
            console.log(userAuth?.user?.userId)
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/uncompleted-vacancy/${payload}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get uncompleted vacancy
export const postFullVacancy = createAsyncThunk(
    'vacancies/postFullVacancy',
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
            console.log(userAuth?.user?.userId)
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/post/${payload}`, payload, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//Delete uncompletedVacancy
export const deleteuncompletedVacancyAction = createAsyncThunk(
    'vacancies/deleteUncompletedVacancy',
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
            const { data } = await axios.delete(`${baseUrl}/${apiPrefix}/delete-uncompleted-vacancy/${payload}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get all applicants vacancy
export const getAllApplicantVacancy = createAsyncThunk(
    'vacancies/getAllApplicantVacancy',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-applicants-vacancy/${payload}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
//get all applicants vacancy
export const applyVacancy = createAsyncThunk(
    'vacancies/applyVacancy',
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
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/apply-vacancies/${user.userId}/${payload.vacancyId}/${payload}`, user.userId, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)

export const getAllParticipantsVacancy = createAsyncThunk(
    'vacancies/getAllParticipantsVacancy',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-participant-vacancy/${payload}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
export const acceptApplicantVacancy = createAsyncThunk(
    'vacancies/acceptApplicantVacancy',
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
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/accept-applicant-vacancy/${payload.vacancyId}/${payload.id}`, user.userId, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
export const removeApplicantVacancy = createAsyncThunk(
    'vacancies/removeApplicantVacancy',
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/remove-applicant-vacancy/${payload.vacancyId}/${payload.id}`, user.userId, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
export const blockMemberVacancy = createAsyncThunk(
    'vacancies/blockMemberVacancy',
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/block-member-vacancy/${payload.vacancyId}/${payload.id}`, user.userId, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
export const recoverMemberVacancy = createAsyncThunk(
    'vacancies/recoverMemberVacancy',
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/recover-member-vacancy/${payload.vacancyId}/${payload.id}`, user.userId, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
export const deleteBlockMemberVacancy = createAsyncThunk(
    'vacancies/deleteBlockMemberVacancy',
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/delete-block-member-vacancy/${payload.vacancyId}/${payload.id}`, user.userId, config);
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
    "vacancies/resetSuccess",
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
//update Favourite vacancy
export const updateFavouriteVacancyAction = createAsyncThunk(
    "vacancies/updateFavouriteVacancy",
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
        formData.append('vacancyId', obj.vacancyId);
        try {
            const { data } = await axios.put(
                `${baseUrl}/${apiPrefix}/update-favourite-vacancy/${userAuth?.user?.userId}`,
                formData,
                config
            );
            if (obj.setFunc) {
                obj.setFunc(prev => {
                    var arr = [...prev];
                    const currentVacancy = arr.findIndex(item => item.vacancyId === data.vacancyId);
                    if (currentVacancy !== -1) {
                        if (data.isPush) {
                            if (arr[currentVacancy].favouriteUsers === null) {
                                arr[currentVacancy] = { ...arr[currentVacancy], favouriteUsers: [data.userId] }
                            }
                            else {
                                arr[currentVacancy] = { ...arr[currentVacancy], favouriteUsers: [...arr[currentVacancy].favouriteUsers, data.userId] }
                            }
                        }
                        else {
                            arr[currentVacancy] = { ...arr[currentVacancy], favouriteUsers: [...arr[currentVacancy].favouriteUsers.filter(item => item !== data.userId)] }
                        }
                    }
                    return arr;
                })
            }
            if (obj.notify) {
                obj.notify('success', 'Update favourite vacancy successfully!')
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
//get all Favourite vacancy
export const getAllFavouriteVacanciesAction = createAsyncThunk(
    "vacancies/getAllFavouriteVacancies",
    async (vacancyId, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.get(
                `${baseUrl}/${apiPrefix}/get-favourite-vacancies/${userAuth?.user?.userId}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//get all applied vacancy
export const getAllAppliedVacanciesAction = createAsyncThunk(
    "vacancies/getAllAppliedVacancies",
    async (userId, { rejectWithValue, getState, dispatch }) => {
        const user = getState()?.users;
        const { userAuth } = user;
        // http call 
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.user?.token}`,
                'Content-Type': 'application/json',
            },
        };
        var id = userAuth?.user?.userId
        if (userId) id = userId
        try {
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-applied-vacancies/${id}`, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//getAllReportsAdminAction
export const getAllReportsAdminAction = createAsyncThunk(
    'vacancies/getAllReportsAdmin',
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

            const { data } = await axios.get(`${baseUrl}/api/v1/skills/get-all-report-admin`, config);
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
export const searchVacancyAction = createAsyncThunk(
    'vacancies/searchVacancyAction',
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

            const { data } = await axios.get(`${baseUrl}/api/v1/vacancies/search-vacancies?keyWord=${d?.keywords}&location=${d?.city}&jobType=${d?.jobType}`, config);
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

//update Favourite vacancy
export const deleteCompleteVacancy = createAsyncThunk(
    "vacancies/deleteCompleteVacancy",
    async (obj, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.delete(
                `${baseUrl}/${apiPrefix}/delete-complete-vacancy/${obj}`,
                config
            );

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//update Favourite vacancy
export const updateCompleteVacancy = createAsyncThunk(
    "vacancies/updateCompleteVacancy",
    async (obj, { rejectWithValue, getState, dispatch }) => {
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
            const { data } = await axios.post(
                `${baseUrl}/${apiPrefix}/update-complete-vacancy`,
                obj,
                config
            );

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
        dispatch(vacanciesSlices.actions.setValueSuccess(value))
    }
}
export function resetComponent() {
    return function resetComponent(dispatch, getState) {
        dispatch(vacanciesSlices.actions.resetComponent())
    }
}
export function saveLocation(location) {
    return function saveLocation(dispatch, getState) {
        dispatch(vacanciesSlices.actions.saveLocation(location))
    }
}
export function setVacancyId(value) {
    return function setVacancyId(dispatch, getState) {
        dispatch(vacanciesSlices.actions.setVacancyId(value))
    }
}

const vacanciesSlices = createSlice({
    name: 'vacancies',
    initialState: {
        loading: false,
        appErr: null,
        isSuccess: false,
        complete: [],
        incomplete: [],
        vacancyInfo: {},
        vacancies: [],
        appliedVacancies: []
    },
    reducers: {
        setValueSuccess: (state, action) => {
            state.isSuccess = action.payload
            state.loadingUD = action.payload
            state.isSuccess3 = action.payload
        },
        saveLocation: (state, action) => {
            state.location = action.payload
        },
        resetComponent: (state, action) => {
            delete state.currentJobComponent
            delete state.flag
        },
        setVacancyId: (state, action) => {
            state.vacancyId = action.payload
        },
    },
    extraReducers: (builder) => {
        //get all vacancies
        builder.addCase(getAllVacancies.pending, (state, action) => {
            state.loading = true;
            state.isSuccess2 = false
        }),
            builder.addCase(getAllVacancies.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = action?.payload?.vacancies;
                state.isSuccess2 = true
            }),
            builder.addCase(getAllVacancies.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false
            }),

            //create vacancies id
            builder.addCase(createVacancyId.pending, (state, action) => {
                state.loading = true;
                state.isSuccess = false
            }),
            builder.addCase(createVacancyId.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancyId = action?.payload.id;
                state.appErr = null;
                state.isSuccess = true
            }),
            builder.addCase(createVacancyId.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false
            }),

            //update vacancies
            builder.addCase(updateVacancyComponent.pending, (state, action) => {
                state.loading = true;
                state.loadingUD = true;
                state.isSuccess = false
            }),
            builder.addCase(updateVacancyComponent.fulfilled, (state, action) => {
                state.loadingUD = false;
                state.loading = false;
                state.appErr = null;
                state.isSuccess = true;
            }),
            builder.addCase(updateVacancyComponent.rejected, (state, action) => {
                state.loading = false;
                state.loadingUD = true;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            //update vacancy status
            builder.addCase(updateVacancyStatus.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(updateVacancyStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                if (state.vacancies.length === 0) {
                    state.vacProList.pop(item => item.vacProId === action?.payload?.updateVacancyId)
                }
                else {

                    let currentVacancy = state.vacancies.findIndex((v) => v.vacancyId === action?.payload?.updateVacancyId);
                    if (currentVacancy !== -1) state.vacancies[currentVacancy].approvalStatus = action?.payload?.status;

                }
                state.isSuccessUpd = true;
            }),
            builder.addCase(updateVacancyStatus.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUpd = false;
            }),

            //get vacancy component
            builder.addCase(getVacancyComponent.pending, (state, action) => {
                state.loading = true;
            }),
            builder.addCase(getVacancyComponent.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.currentJobComponent = action?.payload.currentJobComponent;
            }),
            builder.addCase(getVacancyComponent.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),

            //get vacancy cor
            builder.addCase(getVacancyCor.pending, (state, action) => {
                state.loading = true;
                state.isSuccess2 = false;
            }),
            builder.addCase(getVacancyCor.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess2 = true;
                state.incomplete = action?.payload?.incomplete;
                state.complete = action?.payload?.complete;
            }),
            builder.addCase(getVacancyCor.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;
            }),

            //get vacancy cor
            builder.addCase(getCompleteVacancyCor.pending, (state, action) => {
                state.loadingC = true;
                state.isSuccess2C = false;
            }),
            builder.addCase(getCompleteVacancyCor.fulfilled, (state, action) => {
                state.loadingC = false;
                state.appErr = null;
                state.isSuccess2C = true;
                state.complete = action?.payload?.complete;
            }),
            builder.addCase(getCompleteVacancyCor.rejected, (state, action) => {
                state.loadingC = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2C = false;
            }),

            //get vacancy cor
            builder.addCase(getInCompleteVacancyCor.pending, (state, action) => {
                state.loadingU = true;
                state.isSuccess2U = false;
            }),
            builder.addCase(getInCompleteVacancyCor.fulfilled, (state, action) => {
                state.loadingU = false;
                state.appErr = null;
                state.isSuccess2U = true;
                state.incomplete = action?.payload?.incomplete;
            }),
            builder.addCase(getInCompleteVacancyCor.rejected, (state, action) => {
                state.loadingU = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2U = false;
            }),


            //get vacancy info detail
            builder.addCase(getVacancyInfoDetail.pending, (state, action) => {
                state.loading = true;
                state.isSuccess2 = false;
            }),
            builder.addCase(getVacancyInfoDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess2 = true;
                state.vacancyInfo = action?.payload?.vacancyInfo;
            }),
            builder.addCase(getVacancyInfoDetail.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;

            }),

            //get current vacancy component
            builder.addCase(getCurrentVacanciesComponent.pending, (state, action) => {
                state.loading = true;
                state.isSuccess3 = false;
            }),
            builder.addCase(getCurrentVacanciesComponent.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess3 = true;
                state.currentJobComponent = action?.payload?.currentJobComponent;
                state.flag = action?.payload?.flag;
                state.vacancyId = action?.payload.id;

            }),
            builder.addCase(getCurrentVacanciesComponent.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess3 = false;

            }),

            //get uncompleted vacancy
            builder.addCase(getFullUnCompletedVacancy.pending, (state, action) => {
                state.loading = true;
                state.isSuccess4 = false;
            }),
            builder.addCase(getFullUnCompletedVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccess4 = true;
                state.unCompletedVacancy = action?.payload?.unCompletedVacancy

            }),
            builder.addCase(getFullUnCompletedVacancy.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess4 = false;

            }),
            //get uncompleted vacancy
            builder.addCase(postFullVacancy.pending, (state, action) => {
                state.loadingPF = true;
                state.isSuccessCR = false;
            }),
            builder.addCase(postFullVacancy.fulfilled, (state, action) => {
                state.loadingPF = false;
                state.appErr = null;
                state.isSuccessCR = true;
                state.vacancy = action?.payload?.vacancy

            }),
            builder.addCase(postFullVacancy.rejected, (state, action) => {
                state.loadingPF = false;
                state.appErr = action?.payload?.message;
                state.isSuccessCR = false;

            }),
            //delete uncompleted vacancy
            builder.addCase(deleteuncompletedVacancyAction.pending, (state, action) => {
                state.loading = true;
                state.isSuccessDL = false;
            }),
            builder.addCase(deleteuncompletedVacancyAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = null;
                state.isSuccessDL = true;
                state.incomplete = state.incomplete.filter((item) => item.vacancyId !== action.payload.id)
            }),
            builder.addCase(deleteuncompletedVacancyAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessDL = false;
            }),
            builder.addCase(getAllApplicantVacancy.pending, (state, action) => {
                state.loadingGAA = true;
            }),
            builder.addCase(getAllApplicantVacancy.fulfilled, (state, action) => {
                state.loadingGAA = false;
                state.appErr = null;
                state.applicants = action.payload.applicants
            }),
            builder.addCase(getAllApplicantVacancy.rejected, (state, action) => {
                state.loadingGAA = false;
                state.appErr = action?.payload?.message;
            }),
            builder.addCase(applyVacancy.pending, (state, action) => {
                state.loadingAL = true;
                state.isSuccessAL = false;
            }),
            builder.addCase(applyVacancy.fulfilled, (state, action) => {
                state.loadingAL = false;
                state.appErr = null;
                state.isSuccessAL = true;
            }),
            builder.addCase(applyVacancy.rejected, (state, action) => {
                state.loadingAL = false;
                state.appErr = action?.payload?.message;
                state.isSuccessAL = false;
            }),
            builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
                state.isSuccess2 = false;
                state.isSuccessUpd = false;
                state.isSuccessDL = false;
                state.isSuccessAL = false;
                state.isSuccessFvr = false;
                state.isSuccessUDCL = false;
                state.isSuccessCR = false;

            }),

            //update status

            builder.addCase(acceptApplicantVacancy.pending, (state, action) => {
                state.loadingACAP = true;
                state.isSuccessAL = false;
            }),
            builder.addCase(acceptApplicantVacancy.fulfilled, (state, action) => {
                state.loadingACAP = false;
                state.appErr = null;
                const a = state?.applicants?.find(item => item.userId === action?.payload?.id)
                if (a) {
                    state?.participants?.members.push(a)
                    state.applicants = state?.applicants?.filter(item => item.userId !== action.payload.id)
                }
            }),
            builder.addCase(acceptApplicantVacancy.rejected, (state, action) => {
                state.loadingACAP = false;
                state.appErr = action?.payload?.message;
            }),

            builder.addCase(removeApplicantVacancy.pending, (state, action) => {
                state.loadingRMAP = true;
                state.isSuccessAL = false;
                state.isSuccessRM = false;
            }),
            builder.addCase(removeApplicantVacancy.fulfilled, (state, action) => {
                state.loadingRMAP = false;
                state.appErr = null;
                state.isSuccessRM = true;
                if (state.applicants)
                    state.applicants = state.applicants.filter(item => item.userId !== action.payload.id)
            }),
            builder.addCase(removeApplicantVacancy.rejected, (state, action) => {
                state.loadingRMAP = false;
                state.appErr = action?.payload?.message;
                state.isSuccessRM = false;
            }),

            builder.addCase(blockMemberVacancy.pending, (state, action) => {
                state.loadingBLMB = true;
                state.isSuccessAL = false;

            }),
            builder.addCase(blockMemberVacancy.fulfilled, (state, action) => {
                state.loadingBLMB = false;
                state.appErr = null;
                const a = state?.participants?.members?.find(item => item.userId === action?.payload?.id)
                if (a) {
                    state?.participants?.oldMembers.push(a)
                    state.participants.members = state?.participants?.members?.filter(item => item.userId !== action.payload.id)
                }
            }),
            builder.addCase(blockMemberVacancy.rejected, (state, action) => {
                state.loadingBLMB = false;
                state.appErr = action?.payload?.message;
            }),

            builder.addCase(recoverMemberVacancy.pending, (state, action) => {
                state.loadingRCMB = true;
                state.isSuccessAL = false;
            }),
            builder.addCase(recoverMemberVacancy.fulfilled, (state, action) => {
                state.loadingRCMB = false;
                state.appErr = null;
                const a = state?.participants?.oldMembers?.find(item => item.userId === action?.payload?.id)
                if (a) {
                    state?.participants?.members.push(a)
                    state.participants.oldMembers = state?.participants?.oldMembers?.filter(item => item.userId !== action.payload.id)
                }
            }),
            builder.addCase(recoverMemberVacancy.rejected, (state, action) => {
                state.loadingRCMB = false;
                state.appErr = action?.payload?.message;
            }),

            builder.addCase(deleteBlockMemberVacancy.pending, (state, action) => {
                state.loadingDLBL = true;
                state.isSuccessAL = false;
            }),
            builder.addCase(deleteBlockMemberVacancy.fulfilled, (state, action) => {
                state.loadingDLBL = false;
                state.appErr = null;
                state.participants.oldMembers = state.participants.oldMembers.filter(item => item.userId !== action.payload.id)
            }),
            builder.addCase(deleteBlockMemberVacancy.rejected, (state, action) => {
                state.loadingDLBL = false;
                state.appErr = action?.payload?.message;
            }),
            builder.addCase(getAllParticipantsVacancy.pending, (state, action) => {
                state.loadingGA = true;
            }),
            builder.addCase(getAllParticipantsVacancy.fulfilled, (state, action) => {
                state.loadingGA = false;
                state.appErr = null;
                state.participants = action.payload.participants;
            }),
            builder.addCase(getAllParticipantsVacancy.rejected, (state, action) => {
                state.loadingGA = false;
                state.appErr = action?.payload?.message;
            }),

            //update Favourite Vacancy Action
            builder.addCase(updateFavouriteVacancyAction.pending, (state, action) => {
                state.loadingFvr = true;
                state.appErr = undefined;
                state.isSuccessFvr = false;
                state.loading = true;
            }),

            builder.addCase(updateFavouriteVacancyAction.fulfilled, (state, action) => {
                state.loadingFvr = false;
                state.loading = false;
                state.appErr = undefined;
                if (Object.keys(state.vacancyInfo).length === 0 && state.vacancyInfo.constructor === Object) {
                    var currentVacancy = state.vacancies.findIndex(vacancy => vacancy.vacancyId === action?.payload?.vacancyId)
                    if (currentVacancy !== -1) {
                        if (action?.payload?.isPush) {
                            if (state.vacancies[currentVacancy].favouriteUsers)
                                state.vacancies[currentVacancy].favouriteUsers.push(action?.payload?.userId);
                            else state.vacancies[currentVacancy].favouriteUsers = [action?.payload?.userId]
                        }
                        else {
                            state.vacancies[currentVacancy].favouriteUsers.pop(action?.payload?.userId);
                        }
                    }
                    else {
                        if (state.favouriteVacancies) {
                            state.isSuccessFvr = true;
                            state.favouriteVacancies = state.favouriteVacancies.filter(item => item?.vacancyId !== action?.payload?.vacancyId)
                        }
                    }
                }
                else {
                    if (action?.payload?.isPush) {
                        if (state.vacancyInfo.favouriteUsers) {
                            state.vacancyInfo.favouriteUsers.push(action?.payload?.userId);
                        } else {
                            state.vacancyInfo.favouriteUsers = [action?.payload?.userId];
                        }
                    }
                    else {
                        state.vacancyInfo.favouriteUsers.pop(action?.payload?.userId);
                    }
                }
            }),
            builder.addCase(updateFavouriteVacancyAction.rejected, (state, action) => {
                state.loadingFvr = false;
                state.appErr = action?.payload?.message;
                state.isSuccessFvr = false;
                state.loading = false;

            })

        //update Favourite Vacancy Action
        builder.addCase(getAllFavouriteVacanciesAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess2 = false;
        }),

            builder.addCase(getAllFavouriteVacanciesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = undefined;
                state.isSuccess2 = true;
                state.vacancyInfo = {};
                state.vacancies = [];
                state.favouriteVacancies = action?.payload?.favouriteVacancies;
            }),
            builder.addCase(getAllFavouriteVacanciesAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;
            }),
            //update Favourite Vacancy Action
            builder.addCase(getAllAppliedVacanciesAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess2 = false;
            }),

            builder.addCase(getAllAppliedVacanciesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = undefined;
                state.isSuccess2 = true;
                state.appliedVacancies = action?.payload?.appliedVacancies;
            }),
            builder.addCase(getAllAppliedVacanciesAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;
            }),
            // get all rp
            builder.addCase(getAllReportsAdminAction.pending, (state, action) => {
                state.loading = true;
                state.isSuccess2 = false;
            }),
            builder.addCase(getAllReportsAdminAction.fulfilled, (state, action) => {
                state.loading = false;
                state.vacProList = action?.payload.reports;
                state.appErr = null;
                state.isSuccess2 = true;
            }),
            builder.addCase(getAllReportsAdminAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess2 = false;
            })

        // get all rp
        builder.addCase(searchVacancyAction.pending, (state, action) => {
            state.loading = true;
        }),
            builder.addCase(searchVacancyAction.fulfilled, (state, action) => {
                state.loading = false;
                state.vcSearch = action?.payload.vacancies;
                state.appErr = null;
            }),
            builder.addCase(searchVacancyAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            })

        // get all rp
        builder.addCase(updateCompleteVacancy.pending, (state, action) => {
            state.loadingUDCL = true;
            state.isSuccessUDCL = false;
        }),
            builder.addCase(updateCompleteVacancy.fulfilled, (state, action) => {
                state.loadingUDCL = false;
                state.appErr = null;
                state.isSuccessUDCL = true;
            }),
            builder.addCase(updateCompleteVacancy.rejected, (state, action) => {
                state.loadingUDCL = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUDCL = false;
            })

        // delete complete rp
        builder.addCase(deleteCompleteVacancy.pending, (state, action) => {
            state.loadingDLCL = true;
            state.isSuccessDLCL = false;
        }),
            builder.addCase(deleteCompleteVacancy.fulfilled, (state, action) => {
                state.loadingDLCL = false;
                state.appErr = null;
                state.isSuccessDLCL = true;
                state.complete = state.complete?.filter(item => item.vacancyId !== action.payload?.id)
            }),
            builder.addCase(deleteCompleteVacancy.rejected, (state, action) => {
                state.loadingDLCL = false;
                state.appErr = action?.payload?.message;
                state.isSuccessDLCL = false;
            })
    }
});

export default vacanciesSlices;