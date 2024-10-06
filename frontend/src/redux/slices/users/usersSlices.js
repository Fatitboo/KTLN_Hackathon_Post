import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import baseUrl from '../../../utils/baseUrl'
const apiPrefix = 'api/v1/users';
// register user
export const registerUserAction = createAsyncThunk(
    'users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            // http call 
            const config = {
                header: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/register`, user, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// login user 
export const loginUserAction = createAsyncThunk(
    'users/login',
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            const config = {
                header: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/login`, userData, config);
            if (data.isActive) {
                localStorage.setItem('userInfo', JSON.stringify(data))
            }
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// Logout user
export const logoutUserAction = createAsyncThunk(
    'users/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            localStorage.removeItem('userInfo')
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// update avatar user 
export const updateAvatarAction = createAsyncThunk(
    'users/updateAvatar',
    async (avatar, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                    'Content-Type': 'multipart/form-data'

                },
            };
            const formData = new FormData();
            formData.append('file', avatar.file);
            formData.append('publicId', avatar.publicId);
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/update-image-user/${userAuth?.user?.userId}`, formData, config);
            var getUserAuth = JSON.parse(localStorage.getItem('userInfo'));

            console.log(data)
            getUserAuth.user.avatar = data.image;
            localStorage.setItem('userInfo', JSON.stringify(getUserAuth))
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get profile user 
export const getUserProfileAction = createAsyncThunk(
    'users/getUserProfile',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-profile-user/${userAuth?.user?.userId}`, config);
            var getUserAuth = JSON.parse(localStorage.getItem('userInfo'));

            console.log(data)
            getUserAuth.user.fullName = data.userProfile.fullName;
            localStorage.setItem('userInfo', JSON.stringify(getUserAuth))

            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get resume seeker 
export const getUserResumeAction = createAsyncThunk(
    'users/getUserResume',
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

            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-resume-user/${userAuth?.user?.userId}`, config);
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
// update profile seeker 
export const updateUserProfileAction = createAsyncThunk(
    'users/updateUserProfile',
    async (info, { rejectWithValue, getState, dispatch }) => {
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

            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-user-information/${userAuth?.user?.userId}`, info, config);
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
// update resume seeker 
export const updateUserResumeAction = createAsyncThunk(
    'users/updateUserResume',
    async (info, { rejectWithValue, getState, dispatch }) => {
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
            console.log(info)
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-seeker-resume/${userAuth?.user?.userId}`, info, config);
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
// update cv seeker 
export const updateUserCvAction = createAsyncThunk(
    'users/updateUserCv',
    async (info, { rejectWithValue, getState, dispatch }) => {
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
            formData.append('file', info.file);
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/update-seeker-cv/${userAuth?.user?.userId}`, formData, config);
            if(info.notify){
                info.notify('success', 'Update file CV successfully!')
            }
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
// update Filename cv seeker 
export const updateFilenameCvAction = createAsyncThunk(
    'users/updateFilenameCv',
    async (info, { rejectWithValue, getState, dispatch }) => {
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
            formData.append('newName', info.newName);
            formData.append('publicId', info.publicId)
            console.log(formData)
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/update-filename-cv/${userAuth?.user?.userId}`, formData, config);
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
// update Avtive Cor By Admin 
export const updateAvtiveCorByAdminAction = createAsyncThunk(
    'users/updateAvtiveCorByAdmin',
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
            const { data } = await axios.put(`${baseUrl}/${apiPrefix}/update-active-cor/${id}`, {}, config);
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
// delete cv seeker 
export const deleteUserCvAction = createAsyncThunk(
    'users/deleteUserCv',
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
            formData.append('publicId', dt.publicId);
            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/delete-seeker-cv/${userAuth?.user?.userId}`, formData, config);
            if(dt.notify){
                dt.notify('success', 'Delete file cv successfully!')
            }
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
// get all cv user 
export const getAllUserCvAction = createAsyncThunk(
    'users/getAllUserCv',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-cv/${userAuth?.user?.userId}`, config);
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
// get all  cors
export const getAllCorsAction = createAsyncThunk(
    'users/getAllCors',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const user = getState()?.users;
            const { userAuth } = user;
            // http call 
            const config = {
                headers: {
                    Authorization: `Bearer ${userAuth?.user?.token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-organizers`, config);
            console.log(data)
            return data;
        } catch (error) {
            console.log(error)
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
)
// get all  cors
export const getAllSeekersAction = createAsyncThunk(
    'users/getAllSeekers',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-all-seekers`, config);
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
// get Recommnend  cors
export const getAllRecommnendSeekerAction = createAsyncThunk(
    'users/getRecommnendSeekers',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-projects-vacancies-to-invite/${userAuth?.user?.userId}`, config);
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
// send Recommend Seeker 
export const sendRecommendSeekerAction = createAsyncThunk(
    'users/sendRecommendSeeker',
    async (info, { rejectWithValue, getState, dispatch }) => {
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
            formData.append('recommendId', info.recommendId);
            formData.append('recommendType', info.recommendType)
            formData.append('seekerId', info.seekerId)

            const { data } = await axios.post(`${baseUrl}/${apiPrefix}/send-mail-recommend/${userAuth?.user?.userId}`, formData, config);
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
// get detail  user
export const getDetailUserAction = createAsyncThunk(
    'users/getDetailUser',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-user-by-id/${id}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// get Data Statistical
export const getDataStatisticalAction = createAsyncThunk(
    'users/getDataStatistical',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-data-statistical/${userAuth?.user?.userId}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// get Data Statistical Admin
export const getDataStatisticalAdminAction = createAsyncThunk(
    'users/getDataStatisticalAdmin',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-data-statistical-admin`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// get ShortListed Users
export const getShortListedUsersAction = createAsyncThunk(
    'users/getShortListedUsers',
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
            const { data } = await axios.get(`${baseUrl}/${apiPrefix}/get-short-listed-users/${userAuth?.user?.userId}`, config);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//create verification token
export const resetPassSendTokenAction = createAsyncThunk(
    "users/tokenReset",
    async (username, { rejectWithValue, getState, dispatch }) => {
        // http call 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const formData = new FormData();
        formData.append('username', username)
        //http call
        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/users/send-token-reset-by-email`, formData, config);
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//reset Password
export const resetPasswordAction = createAsyncThunk(
    "users/resetPassword",
    async (data, { rejectWithValue, getState, dispatch }) => {
        // http call 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        //http call
        const formData = new FormData();
        formData.append('token', data.token);
        formData.append('newPassword', data.password);

        try {
            const { data } = await axios.put(
                `${baseUrl}/api/v1/users/update-token-reset`,
                formData,
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
//change Password
export const changePasswordAction = createAsyncThunk(
    "users/changePassword",
    async (data, { rejectWithValue, getState, dispatch }) => {
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
        formData.append('oldPassword', data.oldPassword);
        formData.append('newPassword', data.password);
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/v1/users/update-password/${userAuth?.user?.userId}`,
                formData,
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
//update Shortlisted Users
export const updateShortlistedUsersAction = createAsyncThunk(
    "users/updateShortlistedUsers",
    async (userId, { rejectWithValue, getState, dispatch }) => {
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
        formData.append('userId', userId);
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/v1/users/update-shortListedUser/${userAuth?.user?.userId}`,
                formData,
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

//applied vacancies
export const applyVacancyAction = createAsyncThunk(
    "users/applyVacancy",
    async (vacanciesId, { rejectWithValue, getState, dispatch }) => {
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
                `${baseUrl}/api/v1/users/apply-vacancies/${userAuth?.user?.userId}/${vacanciesId}`, {}, config
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
//applied vacancies with answer
export const applyVacancyWithAnswersAction = createAsyncThunk(
    "users/applyVacancyWithAnswers",
    async (payload, { rejectWithValue, getState, dispatch }) => {
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
            console.log(payload)
            const { data } = await axios.post(
                `${baseUrl}/api/v1/users/apply-vacancy-and-answers/${userAuth?.user?.userId}/${payload.vacanciesId}`, payload.jobPreScreen, config
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
//Set success
export const resetSuccessAction = createAsyncThunk(
    "users/resetSuccess",
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
//Set UserAuth
export const resetUserAuthAction = createAsyncThunk(
    "users/resetUserAuth",
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
// get userAuth from local storage
const getUserAuth = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

// Slice
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: getUserAuth,
        cvUser: [],
        selectedCv: {},
        corList: [],
        skrList: [],
        shortListUsers: [],
        histories:[],
        recommends:[]
    },
    reducers: {
        setSltCv: (state, action) => {
            state.selectedCv = action.payload
        }
    },
    extraReducers: (builder) => {
        // register user 
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        }),
            builder.addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.registered = action?.payload;
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // login user 
            builder.addCase(loginUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
            }),
            builder.addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = action?.payload;
                state.appErr = undefined;
            }),
            builder.addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // logout user 
            builder.addCase(logoutUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
            }),
            builder.addCase(logoutUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userAuth = undefined;
                state.appErr = undefined;
            }),
            builder.addCase(logoutUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // get profile user 
            builder.addCase(getUserProfileAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),
            builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action?.payload?.userProfile;
                state.userAuth.user.fullName = action?.payload?.userProfile.fullName;
                state.appErr = undefined;
            }),
            builder.addCase(getUserProfileAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // get resume user 
            builder.addCase(getUserResumeAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;

            }),
            builder.addCase(getUserResumeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userResume = action?.payload?.userResume;
                state.appErr = undefined;
            }),
            builder.addCase(getUserResumeAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // update avatar user 
            builder.addCase(updateAvatarAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
            }),
            builder.addCase(updateAvatarAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = { ...state.userProfile, avatar: action?.payload?.image };
                state.userAuth.user.avatar = action?.payload?.image;
                state.appErr = undefined;
            }),
            builder.addCase(updateAvatarAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
            }),
            // update avatar user 
            builder.addCase(sendRecommendSeekerAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccessSendMail = false;
            }),
            builder.addCase(sendRecommendSeekerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccessSendMail = true;
                state.appErr = undefined;
            }),
            builder.addCase(sendRecommendSeekerAction.rejected, (state, action) => {
                state.loading = false;
                state.isSuccessSendMail = false;
                state.appErrSendMail = action?.payload?.message;
            }),
            // update profile user 
            builder.addCase(updateUserProfileAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccessUpd = false;
            }),
            builder.addCase(updateUserProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile =  action?.payload?.userProfile ;
                state.appErr = undefined;
                state.isSuccessUpd = true;
            }),
            builder.addCase(updateUserProfileAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUpd = false;
            }),
            // update resume user 
            builder.addCase(updateUserResumeAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
                state.isSuccessUpd = false;
            }),
            builder.addCase(updateUserResumeAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userResume = { ...state.userResume, ...action?.payload?.userResume };
                state.appErr = undefined;
                state.isSuccess = true;
                state.isSuccessUpd = true;

            }),
            builder.addCase(updateUserResumeAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
                state.isSuccessUpd = false;

            }),

            // get all cv
            builder.addCase(getAllUserCvAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;

            }),
            builder.addCase(getAllUserCvAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cvUser = action?.payload?.cvLinks;
                state.appErr = undefined;

            }),
            builder.addCase(getAllUserCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;

            }),
            // get all cv
            builder.addCase(getAllRecommnendSeekerAction.pending, (state, action) => {
                state.loadingRCM = true;
                state.appErr = undefined;
                state.isSuccess = false;

            }),
            builder.addCase(getAllRecommnendSeekerAction.fulfilled, (state, action) => {
                state.loadingRCM = false;
                state.recommends = action?.payload?.recommends;
                state.appErr = undefined;

            }),
            builder.addCase(getAllRecommnendSeekerAction.rejected, (state, action) => {
                state.loadingRCM = false;
                state.appErr = action?.payload?.message;

            }),
            // add cv user 
            builder.addCase(updateUserCvAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),
            builder.addCase(updateUserCvAction.fulfilled, (state, action) => {
                state.loading = false;
                if (state.cvUser) {
                    state.cvUser.push(action?.payload?.cv);
                } else {
                    state.cvUser = [{ ...action?.payload?.cv }]
                }
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(updateUserCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // update AvtiveCorByAdmin Action
            builder.addCase(updateAvtiveCorByAdminAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccessUpd = false;
            }),
            builder.addCase(updateAvtiveCorByAdminAction.fulfilled, (state, action) => {
                state.loading = false;
                state.appErr = undefined;
                state.isSuccessUpd = true;

                let currentUser = state.corList.findIndex(user => user.userId === action?.payload?.userUpd);
                if (currentUser !== -1) {
                    state.corList[currentUser].isActive = !state.corList[currentUser].isActive;
                }
                else {
                    state.seletedUser.isActive = !state.seletedUser.isActive;
                }
            }),
            builder.addCase(updateAvtiveCorByAdminAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccessUpd = false;
            }),

            // update  filename cv user 
            builder.addCase(updateFilenameCvAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),
            builder.addCase(updateFilenameCvAction.fulfilled, (state, action) => {
                state.loading = false;
                let crCv = state.cvUser.findIndex(cv => cv.publicId === action?.payload?.publicId);
                state.cvUser[crCv].filename = action?.payload?.newName;
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(updateFilenameCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // delete cv user 
            builder.addCase(deleteUserCvAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),
            builder.addCase(deleteUserCvAction.fulfilled, (state, action) => {
                state.loading = false;
                state.cvUser = state.cvUser.filter((cv) => cv.publicId !== action?.payload?.deleteId);
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(deleteUserCvAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // get all cors
            builder.addCase(getAllCorsAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),
            builder.addCase(getAllCorsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.corList = action?.payload?.users;
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(getAllCorsAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // get all seekers
            builder.addCase(getAllSeekersAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            }),
            builder.addCase(getAllSeekersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.skrList = action?.payload?.users;
                state.appErr = undefined;
                state.isSuccess = true;
            }),
            builder.addCase(getAllSeekersAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.isSuccess = false;
            }),
            // get detail user
            builder.addCase(getDetailUserAction.pending, (state, action) => {
                state.loading = true;
                state.loadingGD = true;
                state.appErr = undefined;
                state.isSuccessGetCompanyInfo = false;

            }),
            builder.addCase(getDetailUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingGD = false;
                state.seletedUser = action?.payload?.userDetail;
                state.isSuccessGetCompanyInfo = true;

                state.appErr = undefined;

            }),
            builder.addCase(getDetailUserAction.rejected, (state, action) => {
                state.loading = false;
                state.loadingGD = false;
                state.isSuccessGetCompanyInfo = false;
                state.appErr = action?.payload?.message;

            }),
            //create token
            builder.addCase(resetPassSendTokenAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.isSuccess = false;
            });
        builder.addCase(resetPassSendTokenAction.fulfilled, (state, action) => {
            state.token = action?.payload?.token;
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;
        });
        builder.addCase(resetPassSendTokenAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        });

        //reset pass account
        builder.addCase(resetPasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;

        });
        builder.addCase(resetPasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;

        });
        builder.addCase(resetSuccessAction.fulfilled, (state, action) => {
            state.isSuccessGetCompanyInfo = false;
            state.isSuccess = false;
            state.isSuccessUpd = false;
            state.isSuccessApplied = false;
            state.isSuccessSendMail = false
        });
        builder.addCase(resetUserAuthAction.fulfilled, (state, action) => {

            state.userAuth = null;
        });
        //change pass account
        builder.addCase(changePasswordAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(changePasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;

        });
        builder.addCase(changePasswordAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        });
        //update Shortlisted Users Action
        builder.addCase(updateShortlistedUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(updateShortlistedUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;
            if (state.seletedUser.favouriteUser) {
                if (state.seletedUser.favouriteUser.filter(item => item === state.userAuth.user.userId).length === 1) {
                    state.seletedUser.favouriteUser.pop(state.userAuth.user.userId)
                } else state.seletedUser.favouriteUser.push(state.userAuth.user.userId)
            } else state.seletedUser.favouriteUser = [state.userAuth.user.userId]
        });
        builder.addCase(updateShortlistedUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        });
        //get ShortListed Users Action
        builder.addCase(getShortListedUsersAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(getShortListedUsersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;
            state.shortListUsers = action?.payload?.shortListed
        });
        builder.addCase(getShortListedUsersAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        });
        //get Data Statistical Action
        builder.addCase(getDataStatisticalAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(getDataStatisticalAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;
            state.notification = action?.payload?.notification;
            state.viewsProfile = action?.payload?.viewProfiles;
            state.appliedVacancies = action?.payload?.appliedVacancies;
            state.shortListed = action?.payload?.shortListed;
            state.postedProjects = action?.payload?.postedProjects;
            state.postedVacancies = action?.payload?.postedVacancies;
            state.fvrProjects = action?.payload?.fvrProjects;
            state.fvrVacancies = action?.payload?.fvrVacancies;
            state.recentApplicants = action?.payload?.recentApplicants;
        });
        builder.addCase(getDataStatisticalAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        });
        //get Data Statistical Admin Action
        builder.addCase(getDataStatisticalAdminAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.isSuccess = false;
        });

        builder.addCase(getDataStatisticalAdminAction.fulfilled, (state, action) => {
            state.loading = false;
            state.appErr = undefined;
            state.isSuccess = true;
            state.recentOrganizers = action?.payload?.recentOrganizers;
            state.recentProjects = action?.payload?.recentProjects;
            state.recentVacancies = action?.payload?.recentVacancies;
            state.numSeekers = action?.payload?.numSeekers;
            state.numOrganizers = action?.payload?.numOrganizers;
            state.numVacancies = action?.payload?.numVacancies;
            state.viewsProfile = action?.payload?.viewsProfile;
            state.numProjects = action?.payload?.numProjects;
            state.histories = action?.payload?.histories;

        });
        builder.addCase(getDataStatisticalAdminAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.isSuccess = false;
        });

        //applied vacancies
        builder.addCase(applyVacancyAction.pending, (state, action) => {
            state.loadingAL = true;
            state.isSuccessApplied = false;
        });

        builder.addCase(applyVacancyAction.fulfilled, (state, action) => {
            state.loadingAL = false;
            state.isSuccessApplied = true;
        });
        builder.addCase(applyVacancyAction.rejected, (state, action) => {
            state.loadingAL = false;
            state.isSuccessApplied = false
        });
        //applied vacancies
        builder.addCase(applyVacancyWithAnswersAction.pending, (state, action) => {
            state.loadingAL = true;
            state.isSuccessApplied = false;
        });

        builder.addCase(applyVacancyWithAnswersAction.fulfilled, (state, action) => {
            state.loadingAL = false;
            state.isSuccessApplied = true;
        });
        builder.addCase(applyVacancyWithAnswersAction.rejected, (state, action) => {
            state.loadingAL = false;
            state.isSuccessApplied = false
        });
    }

});
export const { setSltCv } = usersSlices.actions;
export default usersSlices;