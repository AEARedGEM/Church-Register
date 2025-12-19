import React, { useState, useEffect } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import toast, { Toaster } from 'react-hot-toast';
import {
  BookOpen, Plus, Trash2, GripVertical, Video, FileText,
  ClipboardCheck, FileEdit, Eye, ChevronDown, ChevronUp,
  Upload, X, Save, ArrowLeft, Youtube, FileType, Image as ImageIcon, TrendingUp
} from 'lucide-react';

// ========================
// TypeScript Types
// ========================

interface CourseCategory {
  id: number;
  name: string;
  slug: string;
}

interface SkillType {
  id: number;
  name: string;
  slug: string;
}

interface Instructor {
  id: number;
  name: string;
  email: string;
}

interface SlideResource {
  url: string;
  order: number;
}

interface DocumentResource {
  name: string;
  url: string;
  size?: number;
  mime_type?: string;
}

interface FileResource {
  url: string;
  name: string;
  size: number;
  mime_type: string;
}

interface LectureResources {
  slides?: SlideResource[];
  documents?: DocumentResource[];
  file?: FileResource;
  additional_links?: string[];
}

type LectureType = 'video' | 'youtube' | 'slide' | 'document' | 'pdf' | 'text' | 'reading' | 'quiz' | 'assignment';

interface Lecture {
  id?: number;
  title: string;
  type: LectureType;
  content: string;
  video_url: string;
  duration_minutes: number;
  is_preview: boolean;
  order?: number;
  slides?: File[];
  slideUrls?: string[];
  document?: File;
  documentUrl?: string;
  resources?: LectureResources;
}

interface Section {
  id?: number;
  title: string;
  description: string;
  order?: number;
  lectures: Lecture[];
}

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  thumbnail: string | null;
  course_category_id: number;
  skill_type_id: number;
  instructor_id: number;
  duration_hours: number;
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discount_price: number | null;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  learning_objectives: string[];
  prerequisites: string[];
  skills_gained: string[];
  sections: Section[];
  course_category: CourseCategory;
  skill_type: SkillType;
  instructor: Instructor;
}

interface Props {
  course: Course;
  categories: CourseCategory[];
  skillTypes: SkillType[];
  instructors: Instructor[];
}

interface CourseFormData {
  title: string;
  description: string;
  short_description: string;
  course_category_id: string;
  skill_type_id: string;
  instructor_id: string;
  duration_hours: number;
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discount_price: number | null;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  learning_objectives: string[];
  prerequisites: string[];
  skills_gained: string[];
  thumbnail: File | null;
  sections: Section[];
  _method?: string;
}

// ========================
// Lecture Type Configuration
// ========================

const lectureTypes = [
  { value: 'video' as const, label: 'Video Upload', icon: Video, description: 'Upload video file' },
  { value: 'youtube' as const, label: 'YouTube', icon: Youtube, description: 'YouTube video URL' },
  { value: 'slide' as const, label: 'Slides', icon: ImageIcon, description: 'Upload image slides' },
  { value: 'document' as const, label: 'Document', icon: FileType, description: 'Upload PDF/DOC' },
  { value: 'text' as const, label: 'Text Content', icon: FileText, description: 'Rich text content' },
  { value: 'reading' as const, label: 'Reading', icon: BookOpen, description: 'Reading material' },
  { value: 'quiz' as const, label: 'Quiz', icon: ClipboardCheck, description: 'Quiz questions' },
  { value: 'assignment' as const, label: 'Assignment', icon: FileEdit, description: 'Assignment tasks' },
];

// ========================
// Main Component
// ========================

export default function EditCourse({ course, categories, skillTypes, instructors }: Props) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    course.thumbnail ? `/storage/${course.thumbnail}` : ''
  );
  const { flash } = usePage().props as any;

  const getInitialData = (): CourseFormData => ({
    title: course.title,
    description: course.description,
    short_description: course.short_description,
    course_category_id: course.course_category_id.toString(),
    skill_type_id: course.skill_type_id.toString(),
    instructor_id: course.instructor_id.toString(),
    duration_hours: course.duration_hours,
    duration_minutes: course.duration_minutes,
    difficulty_level: course.difficulty_level,
    price: course.price,
    discount_price: course.discount_price,
    status: course.status,
    is_featured: course.is_featured,
    learning_objectives: course.learning_objectives?.length > 0 ? course.learning_objectives : [''],
    prerequisites: course.prerequisites?.length > 0 ? course.prerequisites : [''],
    skills_gained: course.skills_gained?.length > 0 ? course.skills_gained : [''],
    thumbnail: null,
    sections: course.sections || [],
    _method: 'PUT',
  });

  const { data, setData, post, processing, errors } = useForm<CourseFormData & Record<string, any>>(getInitialData());

  // Handle flash messages from Laravel
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, {
        duration: 4000,
        position: 'top-right',
      });
    }
    if (flash?.error) {
      toast.error(flash.error, {
        duration: 4000,
        position: 'top-right',
      });
    }
  }, [flash]);

  // Show validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0] as string;
      toast.error(firstError, {
        duration: 4000,
        position: 'top-right',
      });
    }
  }, [errors]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const loadingToast = toast.loading('Updating course...');

    // Filter empty strings
    const filteredObjectives = data.learning_objectives.filter(obj => obj.trim() !== '');
    const filteredPrerequisites = data.prerequisites.filter(pre => pre.trim() !== '');
    const filteredSkills = data.skills_gained.filter(skill => skill.trim() !== '');

    // Build sanitized sections structure
    const sectionsToAppend = data.sections.map(section => ({
      id: section.id,
      title: section.title,
      description: section.description,
      order: section.order,
      lectures: (section.lectures || []).map(lec => ({
        id: lec.id,
        title: lec.title,
        type: lec.type,
        content: lec.content,
        video_url: lec.video_url,
        duration_minutes: lec.duration_minutes,
        is_preview: lec.is_preview,
        order: lec.order,
        slides: lec.slides || [],
        document: lec.document || null,
      })),
    }));

    const formData = new FormData();

    // Append simple fields
    formData.append('title', data.title || '');
    formData.append('description', data.description || '');
    formData.append('short_description', data.short_description || '');
    formData.append('course_category_id', String(data.course_category_id || ''));
    formData.append('skill_type_id', String(data.skill_type_id || ''));
    formData.append('instructor_id', String(data.instructor_id || ''));
    formData.append('duration_hours', String(data.duration_hours || 0));
    formData.append('duration_minutes', String(data.duration_minutes || 0));
    formData.append('difficulty_level', String(data.difficulty_level));
    formData.append('price', String(data.price || 0));
    if (data.discount_price !== null && data.discount_price !== undefined) {
      formData.append('discount_price', String(data.discount_price));
    }
    formData.append('status', String(data.status));
    formData.append('is_featured', data.is_featured ? '1' : '0');
    formData.append('_method', 'PUT');

    // Send lists as JSON strings
    formData.append('learning_objectives', JSON.stringify(filteredObjectives));
    formData.append('prerequisites', JSON.stringify(filteredPrerequisites));
    formData.append('skills_gained', JSON.stringify(filteredSkills));

    // Append thumbnail file if present
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail as File);
    }

    // Recursive helper to append nested objects/arrays and files
    const appendFormData = (value: any, keyPrefix: string) => {
      if (value === null || value === undefined) return;

      if (value instanceof File) {
        formData.append(keyPrefix, value);
        return;
      }

      if (typeof value === 'boolean') {
        formData.append(keyPrefix, value ? '1' : '0');
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((v, i) => {
          appendFormData(v, `${keyPrefix}[${i}]`);
        });
        return;
      }

      if (typeof value === 'object') {
        Object.keys(value).forEach(k => {
          appendFormData(value[k], `${keyPrefix}[${k}]`);
        });
        return;
      }

      formData.append(keyPrefix, String(value));
    };

    // Append sanitized sections
    appendFormData(sectionsToAppend, 'sections');

    // POST using router with _method override
    router.post(route('admin.training.update', course.id), formData, {
      onSuccess: () => {
        toast.dismiss(loadingToast);
        toast.success('Course updated successfully!', {
          duration: 4000,
          position: 'top-right',
        });
      },
      onError: (errors) => {
        toast.dismiss(loadingToast);
        const errorMessage = Object.values(errors)[0] as string || 'Failed to update course. Please check the form.';
        toast.error(errorMessage, {
          duration: 5000,
          position: 'top-right',
        });
      },
      onFinish: () => {
        toast.dismiss(loadingToast);
      },
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file', {
          duration: 3000,
          position: 'top-right',
        });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB', {
          duration: 3000,
          position: 'top-right',
        });
        return;
      }

      setData('thumbnail', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      toast.success('Thumbnail uploaded successfully', {
        duration: 2000,
        position: 'top-right',
      });
    }
  };

  const addSection = () => {
    const newOrder = data.sections.length;
    setData('sections', [
      ...data.sections,
      { title: '', description: '', order: newOrder, lectures: [] },
    ]);
    setExpandedSections([...expandedSections, data.sections.length]);
    toast.success('Section added', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const removeSection = (index: number) => {
    setData('sections', data.sections.filter((_, i) => i !== index));
    setExpandedSections(expandedSections.filter(i => i !== index));
    toast.success('Section removed', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...data.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setData('sections', newSections);
  };

  const addLecture = (sectionIndex: number) => {
    const newSections = [...data.sections];
    const newOrder = newSections[sectionIndex].lectures.length;
    newSections[sectionIndex].lectures.push({
      title: '',
      type: 'video',
      content: '',
      video_url: '',
      duration_minutes: 0,
      is_preview: false,
      order: newOrder,
      slides: [],
      slideUrls: [],
    });
    setData('sections', newSections);
    toast.success('Lecture added', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const removeLecture = (sectionIndex: number, lectureIndex: number) => {
    const newSections = [...data.sections];
    newSections[sectionIndex].lectures = newSections[sectionIndex].lectures.filter((_, i) => i !== lectureIndex);
    setData('sections', newSections);
    toast.success('Lecture removed', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const updateLecture = (
    sectionIndex: number,
    lectureIndex: number,
    field: keyof Lecture,
    value: any
  ) => {
    const newSections = [...data.sections];
    const lecture = newSections[sectionIndex].lectures[lectureIndex];
    (lecture[field] as any) = value;
    setData('sections', newSections);
  };

  const handleSlideUpload = (sectionIndex: number, lectureIndex: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newSections = [...data.sections];
    const lecture = newSections[sectionIndex].lectures[lectureIndex];

    const invalidFiles = Array.from(files).filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      toast.error('Please upload only image files', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const slideFiles = Array.from(files);
    lecture.slides = [...(lecture.slides || []), ...slideFiles];

    const urls = slideFiles.map(file => URL.createObjectURL(file));
    lecture.slideUrls = [...(lecture.slideUrls || []), ...urls];

    setData('sections', newSections);

    toast.success(`${slideFiles.length} slide(s) uploaded`, {
      duration: 2000,
      position: 'top-right',
    });
  };

  const removeSlide = (sectionIndex: number, lectureIndex: number, slideIndex: number) => {
    const newSections = [...data.sections];
    const lecture = newSections[sectionIndex].lectures[lectureIndex];

    if (lecture.slides) {
      lecture.slides = lecture.slides.filter((_, i) => i !== slideIndex);
    }
    if (lecture.slideUrls) {
      URL.revokeObjectURL(lecture.slideUrls[slideIndex]);
      lecture.slideUrls = lecture.slideUrls.filter((_, i) => i !== slideIndex);
    }

    setData('sections', newSections);
    toast.success('Slide removed', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const handleDocumentUpload = (sectionIndex: number, lectureIndex: number, file: File | null) => {
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size should be less than 50MB', {
        duration: 3000,
        position: 'top-right',
      });
      return;
    }

    const newSections = [...data.sections];
    const lecture = newSections[sectionIndex].lectures[lectureIndex];

    lecture.document = file;
    lecture.documentUrl = URL.createObjectURL(file);

    setData('sections', newSections);

    toast.success('File uploaded successfully', {
      duration: 2000,
      position: 'top-right',
    });
  };

  const toggleSection = (index: number) => {
    setExpandedSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const addArrayItem = (field: 'learning_objectives' | 'prerequisites' | 'skills_gained') => {
    setData(field, [...data[field], '']);
  };

  const removeArrayItem = (field: 'learning_objectives' | 'prerequisites' | 'skills_gained', index: number) => {
    setData(field, data[field].filter((_, i) => i !== index));
  };

  const updateArrayItem = (field: 'learning_objectives' | 'prerequisites' | 'skills_gained', index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    setData(field, newArray);
  };

  const renderLectureContent = (section: Section, sectionIndex: number, lecture: Lecture, lectureIndex: number) => {
    const updateField = (field: keyof Lecture, value: any) => {
      updateLecture(sectionIndex, lectureIndex, field, value);
    };

    switch (lecture.type) {
      case 'video':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video File (MP4, WebM, etc.)
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleDocumentUpload(sectionIndex, lectureIndex, file);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {lecture.documentUrl && (
                <p className="text-sm text-green-600 mt-1">✓ Video selected: {lecture.document?.name}</p>
              )}
            </div>
          </div>
        );

      case 'youtube':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube Video URL
            </label>
            <input
              type="url"
              value={lecture.video_url || ''}
              onChange={(e) => updateField('video_url', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'slide':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Slides (Images)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleSlideUpload(sectionIndex, lectureIndex, e.target.files)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            {lecture.slideUrls && lecture.slideUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {lecture.slideUrls.map((url, slideIndex) => (
                  <div key={slideIndex} className="relative">
                    <img src={url} alt={`Slide ${slideIndex + 1}`} className="w-full h-20 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeSlide(sectionIndex, lectureIndex, slideIndex)}
                      className="absolute -top-1 -right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'document':
      case 'pdf':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Document (PDF, DOC, DOCX)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleDocumentUpload(sectionIndex, lectureIndex, file);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {lecture.documentUrl && (
                <p className="text-sm text-green-600 mt-1">✓ Document selected: {lecture.document?.name}</p>
              )}
            </div>
          </div>
        );

      case 'text':
      case 'reading':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={lecture.content || ''}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder="Enter your content here..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'quiz':
      case 'assignment':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {lecture.type === 'quiz' ? 'Quiz Instructions' : 'Assignment Instructions'}
            </label>
            <textarea
              value={lecture.content || ''}
              onChange={(e) => updateField('content', e.target.value)}
              placeholder={`Enter ${lecture.type} instructions...`}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ModernLayout>
      <Head title={`Edit Course - ${course.title}`} />

      {/* Toast Container */}
      <Toaster />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => router.visit(route('admin.training.index'))}
              className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Edit Course
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                {course.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.visit(route('training.course.detail', course.id))}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm sm:text-base font-medium"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => {
                setData('status', 'draft');
                handleSubmit();
              }}
              disabled={processing}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
            >
              {processing ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={processing}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-medium"
            >
              <Save className="w-4 h-4 sm:w-5 sm:h-5" />
              {processing ? 'Saving...' : 'Update Course'}
            </button>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Complete Web Development Bootcamp"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                value={data.short_description}
                onChange={e => setData('short_description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description for course listings"
                maxLength={500}
              />
              {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Description *
              </label>
              <textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed course description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={data.course_category_id}
                  onChange={e => setData('course_category_id', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.course_category_id && <p className="text-red-500 text-sm mt-1">{errors.course_category_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skill Type *
                </label>
                <select
                  value={data.skill_type_id}
                  onChange={e => setData('skill_type_id', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Skill Type</option>
                  {skillTypes.map(skill => (
                    <option key={skill.id} value={skill.id}>{skill.name}</option>
                  ))}
                </select>
                {errors.skill_type_id && <p className="text-red-500 text-sm mt-1">{errors.skill_type_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instructor *
                </label>
                <select
                  value={data.instructor_id}
                  onChange={e => setData('instructor_id', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Instructor</option>
                  {instructors.map(inst => (
                    <option key={inst.id} value={inst.id}>{inst.name}</option>
                  ))}
                </select>
                {errors.instructor_id && <p className="text-red-500 text-sm mt-1">{errors.instructor_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty Level *
                </label>
                <select
                  value={data.difficulty_level}
                  onChange={e => setData('difficulty_level', e.target.value as 'beginner' | 'intermediate' | 'advanced')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (Hours) *
                </label>
                <input
                  type="number"
                  value={data.duration_hours}
                  onChange={e => setData('duration_hours', parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (Minutes) *
                </label>
                <input
                  type="number"
                  value={data.duration_minutes}
                  onChange={e => setData('duration_minutes', parseInt(e.target.value) || 0)}
                  min="0"
                  max="59"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  value={data.price}
                  onChange={e => setData('price', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Discount Price (₦)
                </label>
                <input
                  type="number"
                  value={data.discount_price || ''}
                  onChange={e => setData('discount_price', e.target.value ? parseFloat(e.target.value) : null)}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Thumbnail
              </label>
              <div className="flex items-center gap-4">
                {thumbnailPreview && (
                  <div className="relative">
                    <img src={thumbnailPreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {
                        setData('thumbnail', null);
                        setThumbnailPreview('');
                      }}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-5 h-5" />
                  {thumbnailPreview ? 'Change Image' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.is_featured}
                  onChange={e => setData('is_featured', e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Featured Course</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={data.status === 'published'}
                  onChange={e => setData('status', e.target.checked ? 'published' : 'draft')}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Publish Immediately</span>
              </label>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Learning Objectives</h2>
          <div className="space-y-2">
            {data.learning_objectives.map((obj, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={obj}
                  onChange={e => updateArrayItem('learning_objectives', index, e.target.value)}
                  placeholder="What will students learn?"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('learning_objectives', index)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('learning_objectives')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Objective
            </button>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Prerequisites</h2>
          <div className="space-y-2">
            {data.prerequisites.map((prereq, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={prereq}
                  onChange={e => updateArrayItem('prerequisites', index, e.target.value)}
                  placeholder="What should students know before taking this course?"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('prerequisites', index)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('prerequisites')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Prerequisite
            </button>
          </div>
        </div>

        {/* Skills Gained */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills Gained</h2>
          <div className="space-y-2">
            {data.skills_gained.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={e => updateArrayItem('skills_gained', index, e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('skills_gained', index)}
                  className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('skills_gained')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Skill
            </button>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Course Content</h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Section
            </button>
          </div>

          <div className="space-y-4">
            {data.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center gap-3 flex-1">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={section.title}
                      onChange={e => updateSection(sectionIndex, 'title', e.target.value)}
                      placeholder="Section Title"
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSection(sectionIndex)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                    >
                      {expandedSections.includes(sectionIndex) ? (
                        <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {expandedSections.includes(sectionIndex) && (
                  <div className="p-4 space-y-4">
                    <textarea
                      value={section.description}
                      onChange={e => updateSection(sectionIndex, 'description', e.target.value)}
                      placeholder="Section description (optional)"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <div className="space-y-3">
                      {section.lectures.map((lecture, lectureIndex) => (
                        <div key={lectureIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              value={lecture.title}
                              onChange={e => updateLecture(sectionIndex, lectureIndex, 'title', e.target.value)}
                              placeholder="Lecture title"
                              className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
                            />
                            <button
                              type="button"
                              onClick={() => removeLecture(sectionIndex, lectureIndex)}
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Lecture Type
                              </label>
                              <select
                                value={lecture.type}
                                onChange={e => updateLecture(sectionIndex, lectureIndex, 'type', e.target.value as LectureType)}
                                className="w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
                              >
                                {lectureTypes.map(type => (
                                  <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Duration (minutes)
                              </label>
                              <input
                                type="number"
                                value={lecture.duration_minutes}
                                onChange={e => updateLecture(sectionIndex, lectureIndex, 'duration_minutes', parseInt(e.target.value) || 0)}
                                placeholder="Min"
                                min="0"
                                className="w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Options
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={lecture.is_preview}
                                  onChange={e => updateLecture(sectionIndex, lectureIndex, 'is_preview', e.target.checked)}
                                  className="rounded border-gray-300 dark:border-gray-600"
                                />
                                <span className="text-xs text-gray-700 dark:text-gray-300">Free Preview</span>
                              </label>
                            </div>
                          </div>

                          <div className="mt-3">
                            {renderLectureContent(section, sectionIndex, lecture, lectureIndex)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addLecture(sectionIndex)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lecture
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModernLayout>
  );
}
