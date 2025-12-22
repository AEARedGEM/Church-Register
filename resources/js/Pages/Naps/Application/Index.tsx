import React, { useState, useEffect } from 'react';
import NapsLayout from '@/Layouts/Naps/NapsLayout';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Head } from '@inertiajs/react';
import napsApi from '@/services/napsApi';
import RegistrationFormComponent from './Partials/RegistrationFormComponent';
import LgaProductsLinkage from '../Dashboard/LgaProductsLinkage';

const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
type ViewType = 'landing' | 'register' | 'survey' | 'complete' | 'admin';

interface SurveyData {
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  lga: string;
  ward: string;
  employmentStatus: string;
  selectedSector?: string;
  selectedProduct: string;
  secondarySector?: string;
  secondaryProduct?: string;
  fundingNeeds: string[];
  governanceRating: number;
}

interface Sector {
  id: number;
  name: string;
  description: string;
  icon: string;
  products: string[];
}

interface WardPriority {
  name: string;
  sector: string;
  score: number;
  population_interest: number;
}

interface SubSkill {
  id: number;
  name: string;
  group_id: number;
}

interface SkillGroup {
  id: number;
  name: string;
  description: string;
  sort_order: number;
  sub_skills: SubSkill[];
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [sectorProducts, setSectorProducts] = useState<string[]>([]);
  const [secondarySectorProducts, setSecondarySectorProducts] = useState<string[]>([]);
  const [wardPriorities, setWardPriorities] = useState<WardPriority[]>([]);
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

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
    fundingData: [],
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
        const [statsData, statesData, sectorsData, skillGroupsData] = await Promise.all([
          napsApi.getDashboardStats(),
          napsApi.getStates(),
          napsApi.getOwopSectors(),
          napsApi.getSkillGroups().catch(() => ({ success: false, skill_groups: [] }))
        ]);

        if (statsData && statsData.success) {
          setStats(statsData.stats);
          setChartData(statsData.charts);
        }

        if (statesData && statesData.success) {
          setStates(statesData.states);
        }

        if (sectorsData && sectorsData.success) {
          // Convert sectors object to array if it's an object
          const sectorsArray = Array.isArray(sectorsData.sectors)
            ? sectorsData.sectors
            : Object.values(sectorsData.sectors);
          setSectors(sectorsArray as Sector[]);
        }

        // Load skill groups if available
        if (skillGroupsData && skillGroupsData.success && skillGroupsData.skill_groups) {
          setSkillGroups(skillGroupsData.skill_groups);
          // Expand first group by default
          if (skillGroupsData.skill_groups.length > 0) {
            setExpandedGroups(new Set([skillGroupsData.skill_groups[0].id]));
          }
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

  const toggleGroup = (groupId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleSubSkill = (subSkillId: number) => {
    toggleSkill(subSkillId);
  };

  const handleSectorChange = async (sectorId: string) => {
    setSurveyData({...surveyData, selectedSector: sectorId, selectedProduct: ''});

    if (sectorId) {
      try {
        const response = await napsApi.getSectorProducts(parseInt(sectorId));
        if (response.success) {
          setSectorProducts(response.products);
        }
      } catch (err) {
        console.error('Failed to load sector products:', err);
      }
    } else {
      setSectorProducts([]);
    }
  };

  const handleSecondarySectorChange = async (sectorId: string) => {
    setSurveyData({...surveyData, secondarySector: sectorId, secondaryProduct: ''});

    if (sectorId) {
      try {
        const response = await napsApi.getSectorProducts(parseInt(sectorId));
        if (response.success) {
          setSecondarySectorProducts(response.products);
        }
      } catch (err) {
        console.error('Failed to load secondary sector products:', err);
      }
    } else {
      setSecondarySectorProducts([]);
    }
  };

  const loadWardPriorities = async () => {
    if (surveyData.state && surveyData.lga && surveyData.ward) {
      try {
        const response = await napsApi.getWardPriorities(
          surveyData.state,
          surveyData.lga,
          surveyData.ward
        );
        if (response.success && response.priorities) {
          setWardPriorities(response.priorities);
        }
      } catch (err) {
        console.error('Failed to load ward priorities:', err);
      }
    }
  };

  const handleSurveyStepSubmit = async () => {
    if (surveyStep < 5) {
      setSurveyStep(surveyStep + 1);
    } else {
      setIsSubmitting(true);
      setError(null);
      try {
        console.log('Submitting survey with data:', {
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

        console.log('Submit response:', response);

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
        setError(err.message || err?.error || 'An error occurred while submitting the survey');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Landing Page
  const LandingPage = () => (
    <>
      <div className="min-h-auto bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 border-b border-gray-200 dark:border-gray-700 pb-12">
            <h1 className="text-6xl font-bold pt-8 mb-4 text-emerald-700 dark:text-emerald-400">NAP/S</h1>
            <p className="text-3xl mb-2 text-gray-900 dark:text-gray-100 font-semibold">Needs Assessment Poll/System</p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Nigeria Youth Parliament Industrialization Program</p>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Help shape Nigeria's industrial future by participating in the national youth needs assessment.
              Your insights are crucial in building evidence-based policies that drive economic growth and create opportunities.
            </p>
            <button
              onClick={() => setCurrentView('register')}
              className="px-8 py-4 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register & Participate
            </button>
          </div>

          {/* Consolidated 6 Cards - Professional Intelligence Dashboard */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            {/* Card 1: Skills Assessment */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Skills Assessment</h3>
                <span className="text-2xl">🎓</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Document your expertise and training needs to unlock opportunities aligned with your goals.</p>
            </div>

            {/* Card 2: One Ward One Product */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Local Production</h3>
                <span className="text-2xl">🏭</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vote for products your ward should produce and export to strengthen economic development.</p>
            </div>

            {/* Card 3: Rewards & Recognition */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Earn Recognition</h3>
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gain 100 points for participation with badges and recognition for your contributions.</p>
            </div>

            {/* Card 4: Respondent Impact */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">National Impact</h3>
                <span className="text-2xl">📊</span>
              </div>
              <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-4">Join thousands of respondents nationwide shaping Nigeria's industrialization agenda.</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white dark:bg-gray-800 rounded p-2">
                  <p className="font-bold text-emerald-700 dark:text-emerald-400">{stats.totalRespondents.toLocaleString()}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Total Respondents</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded p-2">
                  <p className="font-bold text-emerald-700 dark:text-emerald-400">{stats.statesReached}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">States Reached</p>
                </div>
              </div>
            </div>

            {/* Card 5: Data Integrity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Trust & Security</h3>
                <span className="text-2xl">✓</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">All responses verified and secured for data integrity and policy effectiveness.</p>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">{stats.verifiedUsers.toLocaleString()}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Verified Respondents</p>
            </div>

            {/* Card 6: National Development */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">SDG Aligned</h3>
                <span className="text-2xl">🇳🇬</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contributing to sustainable economic development and decent work for all Nigerians.</p>
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
            onSuccess={(formData) => {
              // Store the registration data with correct field mapping
              setSurveyData({
                ...surveyData,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                state: formData.state_id?.toString() || '',
                lga: formData.lga_id?.toString() || '',
                ward: formData.ward_id?.toString() || '',
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

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

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
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {skillGroups.length > 0
                  ? 'Select all skills you currently possess. Choose your primary skill groups first, then select the specific skills under each group.'
                  : 'Select all skills you possess:'}
              </p>

              {/* Collapsible Groups View (when skillGroups available) */}
              {skillGroups.length > 0 ? (
                <div className="space-y-3">
                  {/* Summary badge */}
                  {selectedSkills.length > 0 && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-lg">
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        ✓ {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
                      </p>
                    </div>
                  )}

                  {/* Skill Groups */}
                  {skillGroups.map(group => (
                    <div key={group.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      {/* Group Header */}
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.id)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="text-left flex-1">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{group.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{group.sub_skills.length} skills available</p>
                        </div>
                        <span className={`transition-transform ${expandedGroups.has(group.id) ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>

                      {/* Group Skills */}
                      {expandedGroups.has(group.id) && (
                        <div className="p-4 bg-white dark:bg-gray-900 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {group.sub_skills.map(subSkill => (
                            <button
                              key={subSkill.id}
                              type="button"
                              onClick={() => toggleSubSkill(subSkill.id)}
                              className={`p-3 border rounded-lg text-left transition-all text-sm ${
                                selectedSkills.includes(subSkill.id)
                                  ? 'border-emerald-500 dark:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                              }`}
                            >
                              <p className="font-medium text-gray-900 dark:text-gray-100">{subSkill.name}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback to simple grid view when no skill groups loaded */
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
              )}
            </div>
          )}

          {/* Step 3: Product - One Ward One Product */}
          {surveyStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/30 dark:to-emerald-900/30 p-6 rounded-lg mb-6 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🏭</span> One Ward One Product (OWOP)
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm mb-3">Vote for products your ward should focus on producing and exporting. Select up to 2 sectors/products.</p>
              </div>

              {/* Ward Priorities Recommendation */}
              {wardPriorities.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">🎯 Recommended for Your Ward</h4>
                  <div className="space-y-2">
                    {wardPriorities.map((priority, idx) => (
                      <div key={idx} className="text-sm text-amber-700 dark:text-amber-200">
                        <strong className="text-lg">#{idx + 1}</strong> {priority.name}
                        <span className="ml-2 text-xs bg-amber-200 dark:bg-amber-900 px-2 py-1 rounded">{priority.sector}</span>
                        <div className="mt-1 bg-amber-200 dark:bg-amber-900 h-2 rounded overflow-hidden">
                          <div
                            className="bg-amber-600 h-full"
                            style={{width: `${Math.min((priority.score / 100) * 100, 100)}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Sector and Product Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Primary Sector
                  </label>
                  <select
                    value={surveyData.selectedSector || ''}
                    onChange={(e) => handleSectorChange(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  >
                    <option value="">Choose a sector...</option>
                    {sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.icon} {sector.name}
                      </option>
                    ))}
                  </select>
                </div>

                {sectorProducts.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Product from {sectors.find(s => s.id === parseInt(surveyData.selectedSector || '0'))?.name}
                    </label>
                    <select
                      value={surveyData.selectedProduct}
                      onChange={(e) => setSurveyData({...surveyData, selectedProduct: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                    >
                      <option value="">Choose a product...</option>
                      {sectorProducts.map((product, i) => (
                        <option key={i} value={product}>{product}</option>
                      ))}
                    </select>
                    {surveyData.selectedProduct && (
                      <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                        <p className="text-sm text-emerald-800 dark:text-emerald-200">
                          ✓ Primary choice: <strong>{surveyData.selectedProduct}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Secondary Sector Option */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="secondary-sector"
                    checked={!!surveyData.secondarySector}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        setSurveyData({...surveyData, secondarySector: undefined, secondaryProduct: undefined});
                        setSecondarySectorProducts([]);
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <label htmlFor="secondary-sector" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Add a secondary sector/product? (Optional)
                  </label>
                </div>

                {surveyData.secondarySector !== undefined && (
                  <div className="space-y-4 ml-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Secondary Sector
                      </label>
                      <select
                        value={surveyData.secondarySector || ''}
                        onChange={(e) => handleSecondarySectorChange(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                      >
                        <option value="">Choose a sector...</option>
                        {sectors.filter(s => s.id !== parseInt(surveyData.selectedSector || '0')).map((sector) => (
                          <option key={sector.id} value={sector.id}>
                            {sector.icon} {sector.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {secondarySectorProducts.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Select Product
                        </label>
                        <select
                          value={surveyData.secondaryProduct || ''}
                          onChange={(e) => setSurveyData({...surveyData, secondaryProduct: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                        >
                          <option value="">Choose a product...</option>
                          {secondarySectorProducts.map((product, i) => (
                            <option key={i} value={product}>{product}</option>
                          ))}
                        </select>
                        {surveyData.secondaryProduct && (
                          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              ✓ Secondary choice: <strong>{surveyData.secondaryProduct}</strong>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
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
                disabled={isSubmitting}
                className={`flex-1 py-3 text-white rounded-lg transition-all shadow-lg hover:shadow-xl ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed opacity-75'
                    : 'bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin">⏳</span>
                    Submitting...
                  </span>
                ) : (
                  'Submit Survey'
                )}
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

    if (error) {
      return <div className="p-6 text-center text-red-600">{error}</div>;
    }

    return (
      <div className="min-h-auto bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="p-6 space-y-6">
          {/* Stats consolidated into landing page cards */}

          {/* One Ward One Product Section */}
          <LgaProductsLinkage />

          {/* Charts - Row 1 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Employment Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Employment Distribution</h2>
              {chartData.employmentData && chartData.employmentData.length > 0 ? (
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

            {/* Preferred Product Chart - COMPACT PIE CHART */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Preferred Product Distribution</h2>
              {chartData.productsData && chartData.productsData.length > 0 ? (
                <div className="flex items-center justify-center gap-6">
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={chartData.productsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.productsData.map((_: any, i: number) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 max-h-56 overflow-y-auto">
                    <div className="space-y-2">
                      {chartData.productsData.slice(0, 8).map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                          />
                          <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No data available yet</p>
              )}
            </div>
          </div>

          {/* Charts - Row 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Skills Distribution Chart - COMPACT PIE CHART */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Top Skills Distribution</h2>
              {chartData.skillsData && chartData.skillsData.length > 0 ? (
                <div className="flex items-center justify-center gap-6">
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={chartData.skillsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="count"
                        >
                          {chartData.skillsData.map((_: any, i: number) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 max-h-56 overflow-y-auto">
                    <div className="space-y-2">
                      {chartData.skillsData.slice(0, 8).map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: COLORS[i % COLORS.length] }}
                          />
                          <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name || `Skill ${item.id}`}</span>
                          <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No data available yet</p>
              )}
            </div>

            {/* Funding Support Needed Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Funding Support Needed</h2>
              {chartData.fundingData && chartData.fundingData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData.fundingData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({name, value}: any) => `${name} ${value}`}
                    >
                      {chartData.fundingData.map((_: any, i: number) => (
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
