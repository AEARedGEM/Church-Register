import React, { useState, useEffect } from 'react';
import NapsLayout from '@/Layouts/Naps/NapsLayout';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Head } from '@inertiajs/react';
import napsApi from '@/services/napsApi';
import RegistrationFormComponent from './Partials/RegistrationFormComponent';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];
type ViewType = 'landing' | 'register' | 'survey' | 'complete' | 'admin';

interface SurveyData {
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  lga: string;
  ward: string;
  employmentStatus: string;
  selectedProduct: string;
  fundingNeeds: string[];
  governanceRating: number;
}

const skills = [
  { id: 1, name: 'Web Development', category: 'digital' },
  { id: 2, name: 'Graphic Design', category: 'digital' },
  { id: 3, name: 'Fashion Design', category: 'vocational' },
  { id: 4, name: 'Catering', category: 'vocational' },
  { id: 5, name: 'Welding', category: 'technical' },
  { id: 6, name: 'Carpentry', category: 'technical' }
];

const products = [
  'Cassava Processing', 'Rice Processing', 'Palm Oil', 'Furniture Making',
  'Textile/Adire', 'Shoe Manufacturing', 'Soap Production', 'Software Development'
];

export default function NAPSDemo() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [surveyStep, setSurveyStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);

  const [stats, setStats] = useState({
    totalRespondents: 0,
    surveysCompleted: 0,
    verifiedUsers: 0,
    statesReached: 0
  });

  const [chartData, setChartData] = useState<any>({
    employmentData: [],
    skillsData: [],
    productsData: [],
    stateData: []
  });

  // Survey data state
  const [surveyData, setSurveyData] = useState<SurveyData>({
    firstName: '',
    lastName: '',
    phone: '',
    state: '',
    lga: '',
    ward: '',
    employmentStatus: '',
    selectedProduct: '',
    fundingNeeds: [],
    governanceRating: 3
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [statsData, statesData] = await Promise.all([
          napsApi.getDashboardStats(),
          napsApi.getStates()
        ]);

        if (statsData && statsData.success) {
          setStats(statsData.stats);
          setChartData(statsData.charts);
        }

        if (statesData && statesData.success) {
          setStates(statesData.states);
        }
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load survey data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleSkill = (skillId: number) => {
    setSelectedSkills(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSurveyStepSubmit = async () => {
    if (surveyStep < 5) {
      setSurveyStep(surveyStep + 1);
    } else {
      try {
        const response = await napsApi.submitSurvey({
          first_name: surveyData.firstName,
          last_name: surveyData.lastName,
          phone: surveyData.phone,
          state: surveyData.state,
          lga: surveyData.lga,
          ward: surveyData.ward,
          employment_status: surveyData.employmentStatus,
          selected_skills: selectedSkills,
          selected_product: surveyData.selectedProduct,
          funding_needs: surveyData.fundingNeeds,
          governance_rating: surveyData.governanceRating,
        });

        if (response.success) {
          const updatedStats = await napsApi.getDashboardStats();
          if (updatedStats && updatedStats.success) {
            setStats(updatedStats.stats);
            setChartData(updatedStats.charts);
          }
          setCurrentView('complete');
        } else {
          setError(response.message || 'Failed to submit survey');
        }
      } catch (err: any) {
        console.error('Survey submission error:', err);
        setError(err.message || 'An error occurred while submitting the survey');
      }
    }
  };

  // Landing Page
  const LandingPage = () => (
    <>
      <div className="min-h-auto bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold pt-8 mb-4 text-emerald-700 dark:text-emerald-400">NAP/S</h1>
            <p className="text-3xl mb-2 text-gray-800 dark:text-gray-100">Needs Assessment Poll/System</p>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Nigeria Youth Parliament Industrialization Program</p>
          </div>

          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Help shape Nigeria's future by participating in the national youth needs assessment.
              Your voice matters in building policies that serve you.
            </p>
            <button
              onClick={() => setCurrentView('register')}
              className="px-8 py-4 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register & Participate
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Share Your Skills</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Tell us about your skills, employment status, and training needs</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">One Ward One Product</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Vote for products your ward should focus on producing and exporting</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg transition-all">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Get points, badges, and recognition for participation</p>
            </div>
          </div>
        </div>
      </div>
      <AdminDashboard />
    </>
  );

  // Registration Page
  const RegistrationPage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">Register for NAP/S</h1>
            <p className="text-gray-600 dark:text-gray-300">Join 10Million+ Nigerian Entrepreneurs/Intrapreneur/Youths</p>
          </div>

          <RegistrationFormComponent
            states={states}
            onSuccess={(formData) => {
              // Store the registration data
              setSurveyData({
                ...surveyData,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                state: formData.state,
                lga: formData.lga,
                ward: formData.ward,
              });
              setCurrentView('survey');
              setSurveyStep(1);
            }}
          />
        </div>
      </div>
    </div>
  );

  // Survey Page
  const SurveyPage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setCurrentView('register')}
          className="mb-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Needs Assessment Survey</h1>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-4">
              {[1,2,3,4,5].map((step) => (
                <React.Fragment key={step}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step <= surveyStep ? 'bg-emerald-600 dark:bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && <div className={`flex-1 h-1 transition-all ${step < surveyStep ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                </React.Fragment>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {['Employment', 'Skills', 'Industry & Product', 'Funding & Training', 'Opinions'][surveyStep - 1]}
            </p>
          </div>

          {/* Step 1: Employment */}
          {surveyStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Employment Status *</label>
                <select
                  value={surveyData.employmentStatus}
                  onChange={(e) => setSurveyData({...surveyData, employmentStatus: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                >
                  <option value="">Select...</option>
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="self_employed">Self Employed</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {surveyStep === 2 && (
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Select all skills you possess:</p>
              <div className="grid grid-cols-2 gap-3">
                {skills.map(skill => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedSkills.includes(skill.id)
                        ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
                    }`}
                  >
                    <p className="font-medium text-gray-900 dark:text-gray-100">{skill.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{skill.category}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Product */}
          {surveyStep === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">One Ward One Product 🏭</h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">Vote for a product your ward should focus on</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Product</label>
                <select
                  value={surveyData.selectedProduct}
                  onChange={(e) => setSurveyData({...surveyData, selectedProduct: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                >
                  <option value="">Select a product...</option>
                  {products.map((p, i) => <option key={i} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Funding */}
          {surveyStep === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Funding Support Needed</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Traditional Loan', 'TradeFi Funding', 'Tokenization', 'Equity Funding'].map((type, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const needs = surveyData.fundingNeeds.includes(type)
                          ? surveyData.fundingNeeds.filter(t => t !== type)
                          : [...surveyData.fundingNeeds, type];
                        setSurveyData({...surveyData, fundingNeeds: needs});
                      }}
                      className={`p-4 border rounded-lg transition-all ${
                        surveyData.fundingNeeds.includes(type)
                          ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
                      }`}
                    >
                      <span className="text-gray-900 dark:text-gray-100">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Opinions */}
          {surveyStep === 5 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Rate governance in your area (1-5)
                </label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSurveyData({...surveyData, governanceRating: n})}
                      className={`w-14 h-14 rounded-lg font-semibold transition-all ${
                        surveyData.governanceRating === n
                          ? 'bg-emerald-600 dark:bg-emerald-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {surveyStep > 1 && (
              <button
                onClick={() => setSurveyStep(surveyStep - 1)}
                className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-all"
              >
                Back
              </button>
            )}
            {surveyStep < 5 ? (
              <button
                onClick={() => setSurveyStep(surveyStep + 1)}
                className="flex-1 py-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSurveyStepSubmit}
                className="flex-1 py-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl"
              >
                Submit Survey
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Complete Page
  const CompletePage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 border border-gray-200 dark:border-gray-700">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Your survey has been submitted successfully.</p>

          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-6 mb-8 border border-emerald-200 dark:border-emerald-800">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">+100 Points</div>
            <p className="text-emerald-700 dark:text-emerald-300">Added to your participation score!</p>
          </div>

          <button
            onClick={() => {
              setCurrentView('landing');
              setSurveyStep(1);
            }}
            className="px-8 py-3 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard
  const AdminDashboard = () => {
    if (isLoading) {
      return <div className="p-6 text-center">Loading statistics...</div>;
    }

    return (
      <div className="min-h-auto bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Respondents</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.totalRespondents.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Completed Surveys</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.surveysCompleted.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Verified Users</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.verifiedUsers.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <p className="text-gray-500 dark:text-gray-400 text-sm">States Reached</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{stats.statesReached}</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Employment Distribution</h2>
              {chartData.employmentData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData.employmentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name, value}: any) => `${name} ${value}`}
                    >
                      {chartData.employmentData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No data available yet</p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">All Skills</h2>
              {chartData.skillsData.length > 0 ? (
                <div className="overflow-x-auto">
                  <ResponsiveContainer width="100%" height={Math.max(300, chartData.skillsData.length * 40)} minWidth={500}>
                    <BarChart
                      data={chartData.skillsData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 120 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        interval={0}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#10B981"
                        name="Count"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No data available yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <NapsLayout>
      <Head title="NAPS Survey" />
      <div className="w-full">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'register' && <RegistrationPage />}
        {currentView === 'survey' && <SurveyPage />}
        {currentView === 'complete' && <CompletePage />}
      </div>
    </NapsLayout>
  );
}
