import axios, { AxiosInstance } from 'axios';

interface SurveySubmissionData {
    first_name: string;
    last_name: string;
    phone: string;
    state: string;
    lga: string;
    ward?: string;
    employment_status?: string;
    selected_skills?: number[];
    selected_product?: string;
    funding_needs?: string[];
    governance_rating?: number;
    responses?: Record<number, string | string[]>;
}

interface NapsStats {
    totalRespondents: number;
    surveysCompleted: number;
    verifiedUsers: number;
    statesReached: number;
}

interface ChartData {
    employmentData: any[];
    skillsData: any[];
    productsData: any[];
    stateData: any[];
}

interface DashboardResponse {
    success: boolean;
    stats: NapsStats;
    charts: ChartData;
}

interface SubmitResponse {
    success: boolean;
    message: string;
    respondent_id?: number;
}

export const napsApi = {
    /**
     * Submit NAPS survey
     */
    submitSurvey: async (data: SurveySubmissionData): Promise<SubmitResponse> => {
        try {
            const response = await axios.post('/api/naps/submit-survey', data);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get dashboard statistics
     */
    getDashboardStats: async (): Promise<DashboardResponse> => {
        try {
            const response = await axios.get('/api/naps/dashboard-stats');
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get survey questions
     */
    getSurveyQuestions: async (section?: string): Promise<any> => {
        try {
            const url = section ? `/api/naps/survey-questions?section=${section}` : '/api/naps/survey-questions';
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get respondents list
     */
    getRespondents: async (filters?: {
        state?: string;
        employment_status?: string;
        search?: string;
        page?: number;
    }): Promise<any> => {
        try {
            const response = await axios.get('/api/naps/respondents', { params: filters });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get single respondent details
     */
    getRespondent: async (id: number): Promise<any> => {
        try {
            const response = await axios.get(`/api/naps/respondents/${id}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Export respondents to CSV
     */
    exportRespondents: async (filters?: {
        state?: string;
        employment_status?: string;
    }): Promise<void> => {
        try {
            const response = await axios.get('/api/naps/export-respondents', {
                params: filters,
                responseType: 'blob'
            });

            // Create a blob and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `naps_respondents_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },

    /**
     * Get states list
     */
    getStates: async (): Promise<any> => {
        try {
            const response = await axios.get('/api/naps/states');
            return response.data;
        } catch (error: any) {
            throw error.response?.data || error.message;
        }
    },
};

export default napsApi;
