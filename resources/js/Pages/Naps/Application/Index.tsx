import React, { useState, useEffect, useRef } from 'react';
import NapsLayout from '@/Layouts/Naps/NapsLayout';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Head, Link, router } from '@inertiajs/react';
import napsApi from '@/services/napsApi';
import RegistrationFormComponent from './Partials/RegistrationFormComponent';
import LgaProductsLinkage from '../Dashboard/LgaProductsLinkage';

const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];
type ViewType = 'landing' | 'public' | 'register' | 'survey' | 'complete' | 'admin' | 'analytics-employment' | 'analytics-products' | 'analytics-skills' | 'analytics-funding';

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

interface NapsPageProps {
  stats?: {
    totalRespondents: number;
    surveysCompleted: number;
    verifiedUsers: number;
    statesReached: number;
  };
  charts?: {
    employmentData: any[];
    skillsData: any[];
    productsData: any[];
    fundingData: any[];
    stateData: any[];
  };
  public?: boolean;
  initialView?: ViewType;
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

export default function NAPSDemo({ stats: initialStats, charts: initialCharts, public: isPublic = false, initialView }: NapsPageProps) {
  const startingView: ViewType = initialView ?? (isPublic ? 'public' : 'landing');
  const [currentView, setCurrentView] = useState<ViewType>(startingView);
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

  const [stats, setStats] = useState(initialStats || {
    totalRespondents: 0,
    surveysCompleted: 0,
    verifiedUsers: 0,
    statesReached: 0
  });

  const [chartData, setChartData] = useState<any>(initialCharts || {
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

  // Refs for chart downloads
  const chartRefs = {
    employment: useRef<HTMLDivElement>(null),
    products: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    funding: useRef<HTMLDivElement>(null),
  };

  // State for showing all data modals
  const [expandedDataModal, setExpandedDataModal] = useState<string | null>(null);

  // Download chart as image
  const downloadChartAsImage = async (chartRef: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (!chartRef.current) return;

    try {
      // Use browser's canvas API through SVG rendering
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${fileName}.png`;
      link.click();
    } catch (error) {
      console.error('Failed to download chart:', error);
      alert('Failed to download chart. Please try again.');
    }
  };

  // Download chart as PDF
  const downloadChartAsPDF = async (chartRef: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (!chartRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 280;
      const pageHeight = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
    }

    if (initialCharts) {
      setChartData(initialCharts);
    }
  }, [initialStats, initialCharts]);

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
      <div className="bg-gradient-to-b from-slate-950 via-red-900 to-slate-950 relative overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse duration-4000"></div>
          <div className="absolute bottom-20 left-5 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-pulse duration-5000" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse duration-6000" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 md:py-12">
          {/* Main Content Container */}
          <div className="max-w-3xl mx-auto text-center space-y-5">
            {/* Title Section */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-cyan-300 via-red-300 to-red-300 bg-clip-text text-transparent drop-shadow-2xl">
                  NAP/S
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400"></div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="space-y-3">
              <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Needs Assessment Poll/Survey
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                Help shape Nigeria's industrial future by participating in the national youth needs assessment. Your insights are crucial in building evidence-based policies that drive economic growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={() => setCurrentView('register')}
                className="relative group px-8 py-3.5 bg-gradient-to-r from-red-500 to-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 overflow-hidden text-sm"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative inline-flex items-center gap-2">
                  Register & Participate
                </span>
              </button>
              <button
                onClick={() => window.location.href = route('naps.public')}
                className="px-8 py-3.5 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 transform hover:scale-105 text-sm"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Charts Section - Immediately Following NAP/S Banner */}
        <div className="relative z-10 px-4 py-12">
          {isPublic ? <PublicDashboard /> : <AdminDashboard />}
        </div>
      </div>
    </>
  );

  // Registration Page
  const RegistrationPage = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Back
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-2">Register for NAP/S</h1>
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
          className="mb-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          ? Back
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
                    step <= surveyStep ? 'bg-red-600 dark:bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && <div className={`flex-1 h-1 transition-all ${step < surveyStep ? 'bg-red-600 dark:bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
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
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 dark:focus:border-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
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
                    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 px-4 py-2 rounded-lg">
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">
                        {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
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
                          ?
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
                                  ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/30'
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
                          ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/30'
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
              <div className="bg-gradient-to-r from-red-50 to-red-50 dark:from-red-900/30 dark:to-red-900/30 p-6 rounded-lg mb-6 border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  One Ward One Product (OWOP)
                </h3>
                <p className="text-red-700 dark:text-red-400 text-sm mb-3">Vote for products your ward should focus on producing and exporting. Select up to 2 sectors/products.</p>
              </div>

              {/* Ward Priorities Recommendation */}
              {wardPriorities.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Recommended for Your Ward</h4>
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
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 dark:focus:border-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
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
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 dark:focus:border-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                    >
                      <option value="">Choose a product...</option>
                      {sectorProducts.map((product, i) => (
                        <option key={i} value={product}>{product}</option>
                      ))}
                    </select>
                    {surveyData.selectedProduct && (
                      <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-800 dark:text-red-200">
                          Primary choice: <strong>{surveyData.selectedProduct}</strong>
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
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 dark:focus:border-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
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
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-red-500 dark:focus:border-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                        >
                          <option value="">Choose a product...</option>
                          {secondarySectorProducts.map((product, i) => (
                            <option key={i} value={product}>{product}</option>
                          ))}
                        </select>
                        {surveyData.secondaryProduct && (
                          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-800 dark:text-red-200">
                              Secondary choice: <strong>{surveyData.secondaryProduct}</strong>
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
                  {
                    [
                      { name: 'Invoice Financing', tooltip: 'Invoice financing (tokenized) ? convert receivables into working capital. Learn more', url: 'https://luxuryxtech.org.ng/tokenizable-assets/invoice-financing' },
                      { name: 'Export Financing', tooltip: 'Export financing (tokenized) ? support cross-border trade. Learn more', url: 'https://luxuryxtech.org.ng/tokenizable-assets/export-financing' },
                      { name: 'Import Financing', tooltip: 'Import financing (tokenized) ? finance imports through tokenized instruments. Learn more', url: 'https://luxuryxtech.org.ng/tokenizable-assets/import-financing' },
                      { name: 'Startup Tokenization', tooltip: 'Startup tokenization ? blockchain-based funding through digital asset creation and token sales' }
                    ].map((item, i) => (
                    <div key={i} className="relative group">
                      <button
                        type="button"
                        onClick={() => {
                          const needs = surveyData.fundingNeeds.includes(item.name)
                            ? surveyData.fundingNeeds.filter(t => t !== item.name)
                            : [...surveyData.fundingNeeds, item.name];
                          setSurveyData({...surveyData, fundingNeeds: needs});
                        }}
                        className={`w-full p-4 border rounded-lg transition-all relative ${
                          surveyData.fundingNeeds.includes(item.name)
                            ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
                        }`}
                      >
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{item.name}</span>
                      </button>
                      <div className="absolute top-full left-0 right-0 mt-2 px-4 py-3 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-20 shadow-xl">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red-500 dark:border-b-red-600"></div>
                        <div className="text-center leading-relaxed">
                          <p>{item.tooltip}</p>
                          {item.url && (
                            <div className="mt-2">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-block text-xs font-semibold underline text-white/90 hover:text-white"
                              >
                                Learn
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
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
                          ? 'bg-red-600 dark:bg-red-500 text-white'
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
                className="flex-1 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
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
                    : 'bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block animate-spin">?</span>
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
          <div className="text-7xl mb-6">?</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Your survey has been submitted successfully.</p>

          <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 mb-8 border border-red-200 dark:border-red-800">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">+100 Points</div>
            <p className="text-red-700 dark:text-red-300">Added to your participation score!</p>
          </div>

          <button
            onClick={() => {
              // Ensure user returns to the dashboard home page
              router.visit(route('dashboard'));
            }}
            className="px-8 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  // Public-facing dashboard for stakeholders and partners
  const PublicDashboard = () => {
    const featuredProducts = [...(chartData.productsData || [])]
      .sort((a: any, b: any) => (b.value || 0) - (a.value || 0))
      .slice(0, 6);

    const featuredSkills = [...(chartData.skillsData || [])]
      .sort((a: any, b: any) => (b.count || 0) - (a.count || 0))
      .slice(0, 6);

    const featuredFunding = [...(chartData.fundingData || [])]
      .sort((a: any, b: any) => (b.value || 0) - (a.value || 0))
      .slice(0, 6);

    const stateSignals = [...(chartData.stateData || [])].slice(0, 6);

    const compactSkillItems = featuredSkills.slice(0, 4);
    const extraSkillItems = featuredSkills.slice(4);
    const compactFundingItems = featuredFunding.slice(0, 4);
    const extraFundingItems = featuredFunding.slice(4);
    const compactStateSignals = stateSignals.slice(0, 4);
    const extraStateSignals = stateSignals.slice(4);

    const strategicPillars = [
      {
        title: 'Ward-level intelligence',
        copy: 'Every response helps map local priority products and support needs from ward to national policy.',
      },
      {
        title: 'OWOP readiness',
        copy: 'The strongest product signals are converted into ward-based industrial focus areas with export potential.',
      },
      {
        title: 'Quarterly tokenization pipeline',
        copy: 'The top-performing startups are identified every quarter or half-year for support, visibility and scale-up.',
      },
    ];

    return (
      <div className="space-y-5">
        <section className="mt-6 rounded-3xl border border-red-200/50 bg-slate-950/90 pt-10 pb-6 px-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                NAP/S Public Metrics &amp; Ward Intelligence
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/owop-mandate"
                className="inline-flex items-center justify-center rounded-full border border-red-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-200 hover:bg-red-500/10 hover:text-red-100"
              >
                Learn About O.W.O.P/NAP
              </Link>
              <button
                onClick={() => setCurrentView('register')}
                className="inline-flex items-center justify-center rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-red-400"
              >
                Take The Poll
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm dark:border-red-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-600 dark:text-red-400">Total respondents</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stats.totalRespondents.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm dark:border-cyan-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">States reached</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stats.statesReached}</p>
          </div>
          <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm dark:border-violet-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-400">Surveys completed</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stats.surveysCompleted.toLocaleString()}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm dark:border-amber-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">Verified users</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stats.verifiedUsers.toLocaleString()}</p>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">Product signals</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Strongest ward-level product opportunities</h3>
              </div>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                OWOP focus
              </span>
            </div>
            <div className="mt-5 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featuredProducts}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="value" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
            <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Strategic pillars -+ Learn more
            </summary>
            <div className="mt-4 space-y-3">
              {strategicPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{pillar.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600 dark:text-red-400">Skill clusters</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Capabilities across the network</h3>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {compactSkillItems.map((skill: any, index: number) => (
                <div key={skill.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">{skill.count} signals</span>
                </div>
              ))}
              {extraSkillItems.length > 0 && (
                <details className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                  <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">View {extraSkillItems.length} more skills</summary>
                  <div className="mt-3 space-y-2">
                    {extraSkillItems.map((skill: any, index: number) => (
                      <div key={skill.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                        <span className="text-sm text-slate-700 dark:text-slate-200">{skill.name}</span>
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">{skill.count} signals</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Funding signals</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Support priorities</h3>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {compactFundingItems.map((item: any, index: number) => (
                <div key={item.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{item.value} mentions</span>
                </div>
              ))}
              {extraFundingItems.length > 0 && (
                <details className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                  <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">View {extraFundingItems.length} more funding items</summary>
                  <div className="mt-3 space-y-2">
                    {extraFundingItems.map((item: any, index: number) => (
                      <div key={item.name || index} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                        <span className="text-sm text-slate-700 dark:text-slate-200">{item.name}</span>
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">{item.value} mentions</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
              <span>State reach</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">Top 6 states</span>
            </summary>
            <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {compactStateSignals.map((state: any) => (
                <div key={state.state} className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{state.state}</span>
                    <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">{state.respondents}</span>
                  </div>
                </div>
              ))}
            </div>
            {extraStateSignals.length > 0 && (
              <details className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-700 dark:bg-slate-800/60">
                <summary className="cursor-pointer font-semibold text-slate-900 dark:text-white">View {extraStateSignals.length} more states</summary>
                <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {extraStateSignals.map((state: any) => (
                    <div key={state.state} className="rounded-xl border border-slate-200 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-900/70">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{state.state}</span>
                        <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">{state.respondents}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </details>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Employment Distribution</h2>
            {chartData.employmentData && chartData.employmentData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={chartData.employmentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={55}
                      isAnimationActive={false}
                    >
                      {chartData.employmentData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1">
                  {chartData.employmentData.slice(0, 4).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                    </div>
                  ))}
                </div>
                {chartData.employmentData.length > 4 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedDataModal('employment');
                    }}
                    className="mt-2 w-full text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Visualize All {chartData.employmentData.length} Items
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Product Distribution</h2>
            {chartData.productsData && chartData.productsData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={chartData.productsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={1}
                      dataKey="value"
                      isAnimationActive={false}
                    >
                      {chartData.productsData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1">
                  {chartData.productsData.slice(0, 4).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                    </div>
                  ))}
                </div>
                {chartData.productsData.length > 4 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedDataModal('products');
                    }}
                    className="mt-2 w-full text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Visualize All {chartData.productsData.length} Items
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Skills Distribution</h2>
            {chartData.skillsData && chartData.skillsData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={chartData.skillsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={55}
                      paddingAngle={1}
                      dataKey="count"
                      isAnimationActive={false}
                    >
                      {chartData.skillsData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1">
                  {chartData.skillsData.slice(0, 4).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name || `Skill ${item.id}`}</span>
                      <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.count}</span>
                    </div>
                  ))}
                </div>
                {chartData.skillsData.length > 4 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedDataModal('skills');
                    }}
                    className="mt-2 w-full text-center text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 py-1 rounded hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                  >
                    Visualize All {chartData.skillsData.length} Items
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Funding Support</h2>
            {chartData.fundingData && chartData.fundingData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={chartData.fundingData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={55}
                      isAnimationActive={false}
                    >
                      {chartData.fundingData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-1">
                  {chartData.fundingData.slice(0, 4).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                    </div>
                  ))}
                </div>
                {chartData.fundingData.length > 4 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedDataModal('funding');
                    }}
                    className="mt-2 w-full text-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 py-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    Visualize All {chartData.fundingData.length} Items
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-gray-900">
          <details className="group" open>
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600 dark:text-red-400">
              <span>Ward-to-product linkage</span>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">Public planning insight</span>
            </summary>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Explore how ward-level demand maps to product demand and LGA industrial priorities.
            </div>
            <div className="mt-4">
              <LgaProductsLinkage />
            </div>
          </details>
        </section>
      </div>
    );
  };

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
          {/* Charts - Single Row - All 4 Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Employment Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Employment Distribution</h2>
              {chartData.employmentData && chartData.employmentData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={chartData.employmentData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={55}
                        isAnimationActive={false}
                      >
                        {chartData.employmentData.map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1">
                    {chartData.employmentData.slice(0, 4).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  {chartData.employmentData.length > 4 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedDataModal('employment');
                      }}
                      className="mt-2 w-full text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Visualize All {chartData.employmentData.length} Items
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
              )}
            </div>

            {/* Preferred Product Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Product Distribution</h2>
              {chartData.productsData && chartData.productsData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={chartData.productsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={1}
                        dataKey="value"
                        isAnimationActive={false}
                      >
                        {chartData.productsData.map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1">
                    {chartData.productsData.slice(0, 4).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  {chartData.productsData.length > 4 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedDataModal('products');
                      }}
                      className="mt-2 w-full text-center text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Visualize All {chartData.productsData.length} Items
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
              )}
            </div>

            {/* Skills Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Skills Distribution</h2>
              {chartData.skillsData && chartData.skillsData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={chartData.skillsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={1}
                        dataKey="count"
                        isAnimationActive={false}
                      >
                        {chartData.skillsData.map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1">
                    {chartData.skillsData.slice(0, 4).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name || `Skill ${item.id}`}</span>
                        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.count}</span>
                      </div>
                    ))}
                  </div>
                  {chartData.skillsData.length > 4 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedDataModal('skills');
                      }}
                      className="mt-2 w-full text-center text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 py-1 rounded hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                    >
                      Visualize All {chartData.skillsData.length} Items
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
              )}
            </div>

            {/* Funding Support Needed Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-base font-semibold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2">Funding Support</h2>
              {chartData.fundingData && chartData.fundingData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={chartData.fundingData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={55}
                        isAnimationActive={false}
                      >
                        {chartData.fundingData.map((_: any, i: number) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-2 space-y-1">
                    {chartData.fundingData.slice(0, 4).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                        <span className="text-gray-700 dark:text-gray-300 truncate flex-1">{item.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  {chartData.fundingData.length > 4 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedDataModal('funding');
                      }}
                      className="mt-2 w-full text-center text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 py-1 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                    >
                      Visualize All {chartData.fundingData.length} Items
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6 text-sm">No data</p>
              )}
            </div>
          </div>

          {/* One Ward One Product Section */}
          <LgaProductsLinkage />
        </div>
      </div>
    );
  };

  // Analytics Detail Pages
  const EmploymentAnalytics = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-2"
        >
          ? Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employment Distribution Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Total Respondents: {stats.totalRespondents}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => downloadChartAsImage(chartRefs.employment, 'employment-distribution')}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PNG Export
              </button>
              <button
                onClick={() => downloadChartAsPDF(chartRefs.employment, 'employment-distribution')}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PDF Export
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6" ref={chartRefs.employment}>
            <div className="lg:col-span-2">
              {chartData.employmentData && chartData.employmentData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={chartData.employmentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({name, value, percent}: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {chartData.employmentData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `${value} respondents`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12">No data available</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Summary</h2>
              <div className="space-y-3">
                {chartData.employmentData && chartData.employmentData.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsAnalytics = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-4 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors flex items-center gap-2"
        >
          ? Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Preferred Product Distribution Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Total Respondents: {stats.totalRespondents}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => downloadChartAsImage(chartRefs.products, 'product-distribution')}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PNG Export
              </button>
              <button
                onClick={() => downloadChartAsPDF(chartRefs.products, 'product-distribution')}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PDF Export
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6" ref={chartRefs.products}>
            <div className="lg:col-span-2">
              {chartData.productsData && chartData.productsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={chartData.productsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({name, value, percent}: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {chartData.productsData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `${value} preferences`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12">No data available</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-red-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-96">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white sticky top-0 bg-white dark:bg-gray-800 pb-2">Summary</h2>
              <div className="space-y-3">
                {chartData.productsData && chartData.productsData.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white flex-shrink-0">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SkillsAnalytics = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-4 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-2"
        >
          ? Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Top Skills Distribution Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Total Respondents: {stats.totalRespondents}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => downloadChartAsImage(chartRefs.skills, 'skills-distribution')}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PNG Export
              </button>
              <button
                onClick={() => downloadChartAsPDF(chartRefs.skills, 'skills-distribution')}
                className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PDF Export
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6" ref={chartRefs.skills}>
            <div className="lg:col-span-2">
              {chartData.skillsData && chartData.skillsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={chartData.skillsData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({name, value, percent}: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {chartData.skillsData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `${value} respondents`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12">No data available</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-96">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white sticky top-0 bg-white dark:bg-gray-800 pb-2">Top Skills</h2>
              <div className="space-y-3">
                {chartData.skillsData && chartData.skillsData.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-gray-700 dark:text-gray-300 truncate">{item.name || `Skill ${item.id}`}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white flex-shrink-0">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FundingAnalytics = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => setCurrentView('landing')}
          className="mb-4 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-2"
        >
          ? Back to Dashboard
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Funding Support Needed Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Total Respondents: {stats.totalRespondents}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => downloadChartAsImage(chartRefs.funding, 'funding-support')}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PNG Export
              </button>
              <button
                onClick={() => downloadChartAsPDF(chartRefs.funding, 'funding-support')}
                className="px-6 py-3 bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <span>??</span> PDF Export
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6" ref={chartRefs.funding}>
            <div className="lg:col-span-2">
              {chartData.fundingData && chartData.fundingData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={chartData.fundingData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({name, value, percent}: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {chartData.fundingData.map((_: any, i: number) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `${value} respondents`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12">No data available</p>
              )}
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-96">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white sticky top-0 bg-white dark:bg-gray-800 pb-2">Funding Needs</h2>
              <div className="space-y-3">
                {chartData.fundingData && chartData.fundingData.map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                      <span className="text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white flex-shrink-0">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal for viewing all data
  const AllDataModal = () => {
    if (!expandedDataModal) return null;

    let data: any[] = [];
    let title = '';
    let bgColor = '';
    let borderColor = '';
    let textColor = '';

    if (expandedDataModal === 'employment') {
      data = chartData.employmentData;
      title = 'Employment Distribution - All Data';
      bgColor = 'from-red-500 to-red-600';
      borderColor = 'border-red-200 dark:border-red-700';
      textColor = 'text-red-600 dark:text-red-400';
    } else if (expandedDataModal === 'products') {
      data = chartData.productsData;
      title = 'Product Distribution - All Data';
      bgColor = 'from-red-500 to-red-600';
      borderColor = 'border-red-200 dark:border-red-700';
      textColor = 'text-red-600 dark:text-red-400';
    } else if (expandedDataModal === 'skills') {
      data = chartData.skillsData;
      title = 'Skills Distribution - All Data';
      bgColor = 'from-cyan-500 to-cyan-600';
      borderColor = 'border-cyan-200 dark:border-cyan-700';
      textColor = 'text-cyan-600 dark:text-cyan-400';
    } else if (expandedDataModal === 'funding') {
      data = chartData.fundingData;
      title = 'Funding Support - All Data';
      bgColor = 'from-purple-500 to-purple-600';
      borderColor = 'border-purple-200 dark:border-purple-700';
      textColor = 'text-purple-600 dark:text-purple-400';
    }

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
          <div className={`bg-gradient-to-r ${bgColor} p-6 flex justify-between items-center sticky top-0 z-10`}>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={() => setExpandedDataModal(null)}
              className="text-white hover:bg-white/20 p-1 rounded transition-colors"
            >
              ?
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              {data.map((item: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {item.name || `${expandedDataModal === 'skills' ? 'Skill' : 'Item'} ${item.id}`}
                    </p>
                  </div>
                  <div className={`text-xl font-bold ${textColor}`}>
                    {expandedDataModal === 'skills' ? item.count : item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className={`mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ${borderColor} border`}>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Total Items:</span> {data.length}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-semibold">Total Count:</span> {data.reduce((sum: number, item: any) => sum + (item.count || item.value || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <NapsLayout>
      <Head title={isPublic ? 'NAPS Public Dashboard' : 'NAPS Survey'} />
      <div className="w-full">
        {isPublic ? (
          <>
            {currentView === 'public' && <PublicDashboard />}
            {currentView === 'register' && <RegistrationPage />}
            {currentView === 'survey' && <SurveyPage />}
            {currentView === 'complete' && <CompletePage />}
          </>
        ) : (
          <>
            {currentView === 'landing' && <LandingPage />}
            {currentView === 'register' && <RegistrationPage />}
            {currentView === 'survey' && <SurveyPage />}
            {currentView === 'complete' && <CompletePage />}
            {currentView === 'analytics-employment' && <EmploymentAnalytics />}
            {currentView === 'analytics-products' && <ProductsAnalytics />}
            {currentView === 'analytics-skills' && <SkillsAnalytics />}
            {currentView === 'analytics-funding' && <FundingAnalytics />}
          </>
        )}
        <AllDataModal />
      </div>
    </NapsLayout>
  );
}

