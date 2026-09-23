import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface ITVacancy {
    id: number;
    company_name: string;
    name: string;
    city: string;
    salary: string;
    short_description: string;
    space: 'office' | 'remote' | 'hybrid';
    skills: string;
    experience: string;
    description?: string;
    about_company?: string;
}

interface ITPagination {
    currentPage: number;
    totalPages: number;
    totalItems:number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface JobState {
    list: ITVacancy[];
    currentVacancy: ITVacancy | null;
    pagination: ITPagination | null;
    loading: boolean;
    vacancyLoading: boolean;
    error: string | null;
    vacancyError: string | null;
    search: string;
    city: string;
    skills: string[];
    currentPage: number;
    searchInputValue: string;
}

const getUrlParams = () => {
    if (typeof window === 'undefined') return { search: '', city: 'Все города', skills: ['JavaScript', 'React', 'Redux', 'Python'], page: 1 };

    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get('search') || '';
    const urlPage = parseInt(params.get('page') || '1', 10);

    const urlSkillsRaw = params.get('skills');
    const urlSkills = urlSkillsRaw 
        ? decodeURIComponent(urlSkillsRaw).split(',').filter(Boolean)
        : ['JavaScript', 'React', 'Redux', 'Python'];

    const path = window.location.pathname;
    let urlCity = 'Москва'; 
    if (path.includes('/petersburg')) {
        urlCity = 'Санкт-Петербург';
    }

    return { search: urlSearch, city: urlCity, skills: urlSkills, page: urlPage };
};

const initialUrlData = getUrlParams();

const initialState: JobState = {
    list: [],
    currentVacancy: null,
    pagination: null,
    loading: false,
    vacancyLoading: false,
    error: null,
    vacancyError: null,
    search: initialUrlData.search,
    searchInputValue: initialUrlData.search,
    city: initialUrlData.city,
    skills: initialUrlData.skills,
    currentPage: initialUrlData.page,
}

export const jobsFetch = createAsyncThunk<{jobs: ITVacancy[], pagination: ITPagination}, void, {state: {jobs: JobState}}>(
    'jobs/jobsSlice',
    async function (_, {rejectWithValue, getState}) {
        try {
            const { search, city, skills, currentPage } = (getState() as RootState).jobs;
            const url = new URL('https://kata-jobs.onrender.com/api/jobs');

            url.searchParams.append('page', currentPage.toString())

            if (search.trim()) {
                url.searchParams.append('search', search.trim())
            }

            if (city && city !== 'Все города') {
                url.searchParams.append('city', city)
            }

            if (skills.length > 0) {
                url.searchParams.append('skills', encodeURIComponent(skills.join(',')))
            }

            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error('Server Error!')
            }

            const data = await response.json();

            return {
                jobs: data.jobs,
                pagination: data.pagination,
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Не удалось загрузить вакансии';
            return rejectWithValue(errorMessage);
        }
    }
)

export const singleVacancyFetch = createAsyncThunk<ITVacancy, string | number>(
    'jobs/singleVacancyFetch',
    async function (id, {rejectWithValue}) {
        try {
            const response = await fetch(`https://kata-jobs.onrender.com/api/jobs/${id}`);
            if (!response.ok)  {
                throw new Error('Вакансия не найдена');
            }
            
            const data = await response.json();
            
            return data.job;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Не удалось загрузить вакансии';
            return rejectWithValue(errorMessage);
        }
    }
)

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setSearchInputValue: (state, action) => {
        state.searchInputValue = action.payload;
        },

        applySearch: (state) => {
        state.search = state.searchInputValue;
        state.currentPage = 1;
        },

        setCity: (state, action) => {
            state.city = action.payload;
            state.currentPage = 1;
        },

        addSkill: (state, action) => {
            const trimmed = action.payload.trim();

            if (trimmed && !state.skills.includes(trimmed)) {
              state.skills.push(trimmed);
              state.currentPage = 1;
            }
        },

        removeSkill: (state, action) => {
            state.skills = state.skills.filter((skill) => skill !== action.payload);
            state.currentPage = 1;
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        syncFiltersWithURL: (state, action: { payload: { search?: string; city?: string; skills?: string[]; page?: number } }) => {
            if (action.payload.search !== undefined) {
                state.search = action.payload.search;
                state.searchInputValue = action.payload.search;
            }
            if (action.payload.city !== undefined) {
                state.city = action.payload.city;
            }
            if (action.payload.skills !== undefined) {
                state.skills = action.payload.skills;
            }
            if (action.payload.page !== undefined) {
                state.currentPage = action.payload.page;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(jobsFetch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(jobsFetch.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.jobs;
                state.pagination =action.payload.pagination;
            })
            .addCase(jobsFetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                
            })
            .addCase(singleVacancyFetch.pending, (state) => {
                state.vacancyLoading = true;
                state.vacancyError = null;
                state.currentVacancy = null;
            })
            .addCase(singleVacancyFetch.fulfilled, (state, action) => {
                state.vacancyLoading = false;
                state.currentVacancy = action.payload;
            })
            .addCase(singleVacancyFetch.rejected, (state, action) => {
                state.vacancyLoading = false;
                state.vacancyError = action.payload as string;
            });
    },
});

export const { setSearchInputValue, applySearch, setCity, addSkill, removeSkill, setCurrentPage, syncFiltersWithURL } = jobsSlice.actions;
export default jobsSlice.reducer;
