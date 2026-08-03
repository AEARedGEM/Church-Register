import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Eye, EyeOff, Upload, X, ChevronDown, ChevronUp, GripVertical, Video, FileText, CheckSquare, FileEdit } from 'lucide-react';

// ========================
// TypeScript Types
// ========================

interface CourseCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  is_active: boolean;
}

interface SkillType {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface CourseLecture {
  id?: number;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  content?: string;
  video_url?: string;
  duration_minutes: number;
  is_preview: boolean;
  order: number;
}

interface CourseSection {
  id?: number;
  title: string;
  description?: string;
  order: number;
  lectures: CourseLecture[];
}

interface CourseFormData {
  title: string;
  description: string;
  short_description: string;
  course_category_id: number | null;
  skill_type_id: number | null;
  instructor_id: number | null;
  duration_hours: number;
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discount_price?: number;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  learning_objectives: string[];
  prerequisites: string[];
  skills_gained: string[];
  thumbnail?: File | string;
  sections: CourseSection[];
}

// ========================
// Main Component
// ========================

const AdminTrainingManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);



  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className={` rounded-lg shadow-sm border  p-6 mb-6`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Training Management</h1>
              <p>Manage courses, sections, and learning content</p>
            </div>
            <div className="flex gap-3">

              {currentView === 'list' && (
                <button
                  onClick={() => setCurrentView('create')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} />
                  Create Course
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        {currentView === 'list' && (
          <CourseList onEdit={(id) => {
            setSelectedCourse(id);
            setCurrentView('edit');
          }} />
        )}
        {currentView === 'create' && (
          <CourseForm
            onCancel={() => setCurrentView('list')}
            onSave={() => setCurrentView('list')}
          />
        )}
        {currentView === 'edit' && selectedCourse && (
          <CourseForm
            courseId={selectedCourse}
            onCancel={() => {
              setCurrentView('list');
              setSelectedCourse(null);
            }}
            onSave={() => {
              setCurrentView('list');
              setSelectedCourse(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// ========================
// Course List Component
// ========================

interface CourseListProps {
  onEdit: (id: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ onEdit }) => {
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    search: ''
  });

  // Mock data
  const courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      category: 'Web Development',
      instructor: 'John Doe',
      status: 'published',
      enrolled_count: 156,
      rating: 4.5,
      price: 49.99
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      category: 'Frontend',
      instructor: 'Jane Smith',
      status: 'draft',
      enrolled_count: 0,
      rating: 0,
      price: 79.99
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        >
          <option value="all">All Categories</option>
          <option value="web">Web Development</option>
          <option value="mobile">Mobile Development</option>
        </select>
      </div>

      {/* Course Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Instructor</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{course.title}</td>
                <td className="py-3 px-4">{course.category}</td>
                <td className="py-3 px-4">{course.instructor}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    course.status === 'published' ? 'bg-green-100 text-green-800' :
                    course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="py-3 px-4">{course.enrolled_count}</td>
                <td className="py-3 px-4">${course.price}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(course.id)}
                    className="text-emerald-600 hover:text-emerald-800 mr-3"
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ========================
// Course Form Component
// ========================

interface CourseFormProps {
  courseId?: number;
  onCancel: () => void;
  onSave: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ courseId, onCancel, onSave }) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    short_description: '',
    course_category_id: null,
    skill_type_id: null,
    instructor_id: null,
    duration_hours: 0,
    duration_minutes: 0,
    difficulty_level: 'beginner',
    price: 0,
    status: 'draft',
    is_featured: false,
    learning_objectives: [''],
    prerequisites: [''],
    skills_gained: [''],
    sections: []
  });

  const [currentTab, setCurrentTab] = useState<'basic' | 'content' | 'pricing'>('basic');

  // Mock data
  const categories: CourseCategory[] = [
    { id: 1, name: 'Web Development', slug: 'web-dev', is_active: true },
    { id: 2, name: 'Mobile Development', slug: 'mobile-dev', is_active: true }
  ];

  const skillTypes: SkillType[] = [
    { id: 1, name: 'Frontend', slug: 'frontend', is_active: true },
    { id: 2, name: 'Backend', slug: 'backend', is_active: true }
  ];

  const instructors: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'instructor' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'instructor' }
  ];

  const updateField = (field: keyof CourseFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field: 'learning_objectives' | 'prerequisites' | 'skills_gained') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayItem = (field: 'learning_objectives' | 'prerequisites' | 'skills_gained', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayItem = (field: 'learning_objectives' | 'prerequisites' | 'skills_gained', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const tabs: { id: 'basic' | 'content' | 'pricing'; label: string }[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'content', label: 'Course Content' },
    { id: 'pricing', label: 'Pricing & Publishing' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {courseId ? 'Edit Course' : 'Create New Course'}
        </h2>
        <p className="text-gray-600">
          Fill in the course details and content structure
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as any)}
              className={`pb-3 px-2 border-b-2 transition-colors ${
                currentTab === tab.id
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-emerald-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        {currentTab === 'basic' && (
          <BasicInfoTab
            formData={formData}
            updateField={updateField}
            addArrayItem={addArrayItem}
            updateArrayItem={updateArrayItem}
            removeArrayItem={removeArrayItem}
            categories={categories}
            skillTypes={skillTypes}
            instructors={instructors}
          />
        )}
        {currentTab === 'content' && (
          <CourseContentTab
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentTab === 'pricing' && (
          <PricingTab
            formData={formData}
            updateField={updateField}
          />
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className={`px-6 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            console.log('Saving course:', formData);
            onSave();
          }}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Save size={18} />
          {courseId ? 'Update Course' : 'Create Course'}
        </button>
      </div>
    </div>
  );
};

// ========================
// Basic Info Tab
// ========================

interface BasicInfoTabProps {
  formData: CourseFormData;
  updateField: (field: keyof CourseFormData, value: any) => void;
  addArrayItem: (field: 'learning_objectives' | 'prerequisites' | 'skills_gained') => void;
  updateArrayItem: (field: 'learning_objectives' | 'prerequisites' | 'skills_gained', index: number, value: string) => void;
  removeArrayItem: (field: 'learning_objectives' | 'prerequisites' | 'skills_gained', index: number) => void;
  categories: CourseCategory[];
  skillTypes: SkillType[];
  instructors: User[];
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({
  formData,
  updateField,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
  categories,
  skillTypes,
  instructors
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block mb-2 font-medium">Course Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="e.g., Introduction to Web Development"
          className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block mb-2 font-medium">Short Description *</label>
        <textarea
          value={formData.short_description}
          onChange={(e) => updateField('short_description', e.target.value)}
          placeholder="Brief overview (max 500 characters)"
          rows={2}
          maxLength={500}
          className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
        />
      </div>

      {/* Full Description */}
      <div>
        <label className="block mb-2 font-medium">Full Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Detailed course description"
          rows={6}
          className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
        />
      </div>
      {/* Category and Skill Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Category *</label>
          <select
            value={formData.course_category_id || ''}
            onChange={(e) => updateField('course_category_id', parseInt(e.target.value))}
            className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Skill Type *</label>
          <select
            value={formData.skill_type_id || ''}
            onChange={(e) => updateField('skill_type_id', parseInt(e.target.value))}
            className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
          >
            <option value="">Select a skill type</option>
            {skillTypes.map(skill => (
              <option key={skill.id} value={skill.id}>{skill.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Instructor and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Instructor *</label>
          <select
            value={formData.instructor_id || ''}
            onChange={(e) => updateField('instructor_id', parseInt(e.target.value))}
            className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
          >
            <option value="">Select an instructor</option>
            {instructors.map(inst => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Difficulty Level *</label>
          <select
            value={formData.difficulty_level}
            onChange={(e) => updateField('difficulty_level', e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="block mb-2 font-medium">Course Duration *</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={formData.duration_hours}
              onChange={(e) => updateField('duration_hours', parseInt(e.target.value))}
              min="0"
              placeholder="Hours"
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
          </div>
          <div>
            <input
              type="number"
              value={formData.duration_minutes}
              onChange={(e) => updateField('duration_minutes', parseInt(e.target.value))}
              min="0"
              max="59"
              placeholder="Minutes"
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div>
        <label className="block mb-2 font-medium">Learning Objectives</label>
        {formData.learning_objectives.map((obj, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={obj}
              onChange={(e) => updateArrayItem('learning_objectives', index, e.target.value)}
              placeholder="What will students learn?"
              className={`flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
            {formData.learning_objectives.length > 1 && (
              <button
                onClick={() => removeArrayItem('learning_objectives', index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem('learning_objectives')}
          className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
        >
          <Plus size={16} /> Add Objective
        </button>
      </div>

      {/* Prerequisites */}
      <div>
        <label className="block mb-2 font-medium">Prerequisites</label>
        {formData.prerequisites.map((prereq, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={prereq}
              onChange={(e) => updateArrayItem('prerequisites', index, e.target.value)}
              placeholder="What should students know before taking this course?"
              className={`flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
            {formData.prerequisites.length > 1 && (
              <button
                onClick={() => removeArrayItem('prerequisites', index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem('prerequisites')}
          className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
        >
          <Plus size={16} /> Add Prerequisite
        </button>
      </div>

      {/* Skills Gained */}
      <div>
        <label className="block mb-2 font-medium">Skills Students Will Gain</label>
        {formData.skills_gained.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateArrayItem('skills_gained', index, e.target.value)}
              placeholder="Skill name"
              className={`flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
            />
            {formData.skills_gained.length > 1 && (
              <button
                onClick={() => removeArrayItem('skills_gained', index)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <X size={18} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => addArrayItem('skills_gained')}
          className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>
    </div>
  );
};

// ========================
// Course Content Tab
// ========================

interface CourseContentTabProps {
  formData: CourseFormData;
  setFormData: React.Dispatch<React.SetStateAction<CourseFormData>>;
}

const CourseContentTab: React.FC<CourseContentTabProps> = ({ formData, setFormData }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const addSection = () => {
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        title: '',
        description: '',
        order: prev.sections.length,
        lectures: []
      }]
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index)
    }));
  };

  const updateSection = (index: number, field: keyof CourseSection, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const addLecture = (sectionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          lectures: [...section.lectures, {
            title: '',
            type: 'video',
            duration_minutes: 0,
            is_preview: false,
            order: section.lectures.length
          }]
        } : section
      )
    }));
  };

  const removeLecture = (sectionIndex: number, lectureIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          lectures: section.lectures.filter((_, j) => j !== lectureIndex)
        } : section
      )
    }));
  };

  const updateLecture = (sectionIndex: number, lectureIndex: number, field: keyof CourseLecture, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === sectionIndex ? {
          ...section,
          lectures: section.lectures.map((lecture, j) =>
            j === lectureIndex ? { ...lecture, [field]: value } : lecture
          )
        } : section
      )
    }));
  };

  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'reading': return <FileText size={16} />;
      case 'quiz': return <CheckSquare size={16} />;
      case 'assignment': return <FileEdit size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-1">Course Sections & Lectures</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Organize your course content into sections and lectures
          </p>
        </div>
        <button
          onClick={addSection}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add Section
        </button>
      </div>

      {formData.sections.length === 0 ? (
        <div className={`text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg`}>
          <p className="text-gray-500 dark:text-gray-400">No sections yet. Click "Add Section" to start building your course.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {formData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden`}>
              {/* Section Header */}
              <div className={`p-4 bg-white dark:bg-gray-800 flex items-center gap-3`}>
                <button className="cursor-move text-gray-400">
                  <GripVertical size={20} />
                </button>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(sectionIndex, 'title', e.target.value)}
                    placeholder="Section title"
                    className={`px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                  />
                  <input
                    type="text"
                    value={section.description || ''}
                    onChange={(e) => updateSection(sectionIndex, 'description', e.target.value)}
                    placeholder="Section description (optional)"
                    className={`px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                  />
                </div>
                <button
                  onClick={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
                  className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded`}
                >
                  {expandedSection === sectionIndex ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <button
                  onClick={() => removeSection(sectionIndex)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Lectures */}
              {expandedSection === sectionIndex && (
                <div className={`p-4 border-t border-gray-200 dark:border-gray-700 space-y-3`}>
                  {section.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-4">
                          <input
                            type="text"
                            value={lecture.title}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'title', e.target.value)}
                            placeholder="Lecture title"
                            className={`w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <select
                            value={lecture.type}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'type', e.target.value)}
                            className={`w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                          >
                            <option value="video">Video</option>
                            <option value="reading">Reading</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <input
                            type="number"
                            value={lecture.duration_minutes}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'duration_minutes', parseInt(e.target.value))}
                            placeholder="Duration (min)"
                            min="0"
                            className={`w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                          />
                        </div>
                        <div className="md:col-span-3 flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={lecture.is_preview}
                              onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'is_preview', e.target.checked)}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                            />
                            <span className="text-sm">Preview</span>
                          </label>
                        </div>
                        <div className="md:col-span-1 flex justify-end">
                          <button
                            onClick={() => removeLecture(sectionIndex, lectureIndex)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Content/URL based on type */}
                      <div className="mt-3">
                        {lecture.type === 'video' && (
                          <input
                            type="url"
                            value={lecture.video_url || ''}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'video_url', e.target.value)}
                            placeholder="Video URL (YouTube, Vimeo, etc.)"
                            className={`w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                          />
                        )}
                        {(lecture.type === 'reading' || lecture.type === 'assignment') && (
                          <textarea
                            value={lecture.content || ''}
                            onChange={(e) => updateLecture(sectionIndex, lectureIndex, 'content', e.target.value)}
                            placeholder="Content or instructions"
                            rows={3}
                            className={`w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
                          />
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addLecture(sectionIndex)}
                    className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ========================
// Pricing Tab
// ========================

interface PricingTabProps {
  formData: CourseFormData;
  updateField: (field: keyof CourseFormData, value: any) => void;
}

const PricingTab: React.FC<PricingTabProps> = ({ formData, updateField }) => {
  return (
    <div className="space-y-6">
      {/* Pricing */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Course Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Price *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => updateField('price', parseFloat(e.target.value))}
                min="0"
                step="0.01"
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
              />
            </div>
            <p className={`text-xs mt-1 text-gray-500 dark:text-gray-400`}>Set to 0 for free courses</p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Discount Price (Optional)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={formData.discount_price ?? ''}
                onChange={(e) => updateField('discount_price', e.target.value ? parseFloat(e.target.value) : undefined)}
                min="0"
                step="0.01"
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
              />
            </div>
            {formData.discount_price && formData.discount_price < formData.price && (
              <p className="text-xs mt-1 text-green-600">
                {Math.round(((formData.price - formData.discount_price) / formData.price) * 100)}% discount
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Publishing Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Publishing Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Course Status *</label>
            <select
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none`}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <p className={`text-xs mt-1 text-gray-500 dark:text-gray-400`}>
              {formData.status === 'draft' && 'Course is not visible to students'}
              {formData.status === 'published' && 'Course is live and visible to students'}
              {formData.status === 'archived' && 'Course is hidden but data is preserved'}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => updateField('is_featured', e.target.checked)}
              className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
            />
            <div>
              <label htmlFor="is_featured" className="font-medium cursor-pointer">
                Feature this course
              </label>
              <p className={`text-sm text-gray-500 dark:text-gray-400`}>
                Featured courses appear on the homepage and get priority in search results
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Upload */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Course Thumbnail</h3>
        <div className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6`}>
          <div className="flex flex-col items-center justify-center">
            <Upload size={32} className="text-gray-500 dark:text-gray-400" />
            <p className="mt-2 text-sm font-medium">Upload course thumbnail</p>
            <p className={`text-xs mt-1 text-gray-500 dark:text-gray-400`}>PNG, JPG up to 5MB</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  updateField('thumbnail', e.target.files[0]);
                }
              }}
              className="mt-4"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Course Summary</h3>
        <div className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2`}>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Title:</span>
            <span className="font-medium">{formData.title || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Duration:</span>
            <span className="font-medium">
              {formData.duration_hours}h {formData.duration_minutes}m
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Sections:</span>
            <span className="font-medium">{formData.sections.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Lectures:</span>
            <span className="font-medium">
              {formData.sections.reduce((acc, s) => acc + s.lectures.length, 0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Price:</span>
            <span className="font-medium">
              {formData.price === 0 ? 'Free' :
                formData.discount_price ?
                  `${formData.discount_price} (was ${formData.price})` :
                  `${formData.price}`
              }
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Status:</span>
            <span className={`px-2 py-1 rounded text-xs ${
              formData.status === 'published' ? 'bg-green-100 text-green-800' :
              formData.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {formData.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTrainingManagement
