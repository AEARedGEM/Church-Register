import React from 'react';
import { usePage, router, Link, Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import { Award, Download, Eye, Share2, Calendar, BookOpen, CheckCircle } from 'lucide-react';

interface Certificate {
  id: number;
  progress_percentage: number;
  completed_at: string;
  course: {
    id: number;
    title: string;
    thumbnail: string | null;
    duration_hours: number;
    course_category: {
      name: string;
    };
    instructor: {
      name: string;
    };
  };
}

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  certificates: Certificate[];
}

export default function CertificatesIndex() {
  const { auth, certificates } = usePage<PageProps>().props;

  const handleViewCertificate = (certificateId: number) => {
    router.visit(route('training.certificates.show', certificateId));
  };

  const getCertificateId = (id: number) => {
    return `CERT-${String(id).padStart(8, '0')}`;
  };

  return (
    <ModernLayout>
    <Head title="Certificate"/>
      <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-red-50 py-4 dark:from-blue-950 dark:via-slate-950 dark:to-red-950">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">

          {/* Achievement Stats */}
          {certificates.length > 0 && (
            <div className="mb-10 mt-8 rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 p-6 dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span>Achievement Summary</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-red-50 p-4 text-center dark:from-blue-900 dark:to-red-950">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {certificates.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Certificates
                  </div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-red-50 p-4 text-center dark:from-blue-900 dark:to-red-950">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                    {certificates.reduce((sum, cert) => sum + cert.course.duration_hours, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Hours Learned
                  </div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-red-50 p-4 text-center dark:from-blue-900 dark:to-red-950">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Completion Rate
                  </div>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-red-50 p-4 text-center dark:from-blue-900 dark:to-red-950">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                    {new Set(certificates.map(c => c.course.course_category.name)).size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Categories
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Certificates
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {certificates.length} {certificates.length === 1 ? 'certificate' : 'certificates'} earned
                </p>
              </div>
            </div>
          </div>

          {/* Certificates Grid */}
          {certificates.length === 0 ? (
            <div className="rounded-xl border border-red-100 bg-gradient-to-br from-white via-white to-rose-50 py-16 text-center dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950">
              <Award className="w-20 h-20 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Certificates Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Complete courses to earn certificates and showcase your achievements
              </p>
              <Link
                href={route('training.courses')}
                className="inline-block rounded-lg bg-gradient-to-r from-blue-600 via-red-500 to-red-600 px-6 py-3 font-medium text-white transition-colors hover:from-blue-700 hover:to-red-700"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="group overflow-hidden rounded-xl border-2 border-red-100 bg-gradient-to-br from-white via-white to-rose-50 transition-all duration-300 hover:border-yellow-400 hover:shadow-xl dark:border-blue-700 dark:from-slate-900 dark:via-blue-950 dark:to-red-950 dark:hover:border-yellow-500"
                >
                  {/* Certificate Badge */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-500 via-gray-500 to-gray-500 p-6 flex flex-col justify-between">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <Award className="w-10 h-10 text-white" />
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                          Verified
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <h3 className="text-white font-bold text-lg line-clamp-2 mb-2">
                        {certificate.course.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {certificate.course.course_category.name}
                      </p>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-5">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Completed: {new Date(certificate.completed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{certificate.course.duration_hours} hours</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-gray-600" />
                        <span className="font-mono text-xs">
                          {getCertificateId(certificate.id)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewCertificate(certificate.id)}
                        className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 via-red-500 to-red-600 px-4 py-2.5 font-medium text-white transition-colors hover:from-blue-700 hover:to-red-700"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleViewCertificate(certificate.id)}
                        className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-50 to-red-50 p-2.5 text-gray-700 transition-colors hover:from-blue-100 hover:to-red-100 dark:from-blue-900 dark:to-red-950 dark:text-gray-300 dark:hover:from-blue-800 dark:hover:to-red-900"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-50 to-red-50 p-2.5 text-gray-700 transition-colors hover:from-blue-100 hover:to-red-100 dark:from-blue-900 dark:to-red-950 dark:text-gray-300 dark:hover:from-blue-800 dark:hover:to-red-900"
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </ModernLayout>
  );
}
