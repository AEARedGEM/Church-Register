import React, { useRef } from 'react';
import { usePage, Link, Head } from '@inertiajs/react';
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import ModernLayout from '@/Layouts/Training/TrainingLayout';
import { Award, Download, Share2, Shield, ArrowLeft, Printer, Mail } from 'lucide-react';
import jsPDF from 'jspdf';
interface CertificateData {
  certificate_id: string;
  student_name: string;
  course_name: string;
  completion_date: string;
  instructor_name: string;
  course_hours: number;
  score: number;
  verification_url: string;
}

interface PageProps extends InertiaPageProps {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
  enrollment: {
    id: number;
    completed_at: string;
    course: {
      title: string;
      course_category: {
        name: string;
      };
      instructor: {
        name: string;
      };
    };
  };
  certificateData: CertificateData;
}

export default function CertificateDetail() {
  const { auth, enrollment, certificateData } = usePage<PageProps>().props;
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    try {
      // Create a simple PDF with certificate content (avoid html2canvas issues)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Get the width and height
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add white background
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      // Add golden border
      pdf.setDrawColor(218, 165, 32);
      pdf.setLineWidth(3);
      pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

      // Set text properties
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'bold');

      // Add certificate title
      pdf.setFontSize(48);
      pdf.text('Certificate of Christian Education', pageWidth / 2, 40, { align: 'center' });

      // Add certificate number
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Certificate ID: ${certificateData.certificate_id}`, pageWidth / 2, 50, { align: 'center' });

      // Add "This is to certify that" text
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('This is to certify that', pageWidth / 2, 65, { align: 'center' });

      // Add student name
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text(certificateData.student_name, pageWidth / 2, 85, { align: 'center' });

      // Add "has successfully completed" text
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text('has successfully completed the Word Ministry programme', pageWidth / 2, 100, { align: 'center' });

      // Add course name
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(180, 25, 55);
      pdf.text(certificateData.course_name, pageWidth / 2, 115, { align: 'center' });

      // Add course description
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`A ${certificateData.course_hours}-hour Sunday School and Bible Study programme`, pageWidth / 2, 125, { align: 'center' });

      // Add completion date
      pdf.setFontSize(11);
      pdf.text(`Completion Date: ${certificateData.completion_date}`, pageWidth / 2, 145, { align: 'center' });

      pdf.text(`Facilitator: ${certificateData.instructor_name}`, pageWidth / 2, 155, { align: 'center' });

      // Add signature line
      pdf.setDrawColor(0, 0, 0);
      pdf.line(30, 170, 90, 170);
      pdf.setFontSize(9);
      pdf.text('Prophet (Dr.) Samuel Olugbenga Ilesanmi', 60, 175, { align: 'center' });
      pdf.text('President, APGA Worldwide Church', 60, 180, { align: 'center' });

      // Add verification URL
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Verify: ${certificateData.verification_url}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

      // Save the PDF
      pdf.save(`APGA-Word-Ministry-Certificate-${certificateData.certificate_id}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${certificateData.course_name} - Certificate`,
          text: `I've completed ${certificateData.course_name}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <ModernLayout>
            <Head title="Church Certificate"/>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href={route('training.certificates')}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Certificates</span>
          </Link>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
            <button
              onClick={() => {
                // Create comprehensive print styles with better selectors
                const printStyles = document.createElement('style');
                printStyles.id = 'print-styles';
                printStyles.textContent = `
                  @media print {
                    * {
                      margin: 0 !important;
                      padding: 0 !important;
                      box-shadow: none !important;
                    }
                    html, body {
                      background: white !important;
                      color: black !important;
                      height: auto !important;
                      width: 100% !important;
                    }
                    body > * {
                      display: none !important;
                    }
                    [data-print-certificate] {
                      display: block !important;
                      position: static !important;
                      width: 100% !important;
                      margin: 0 !important;
                      padding: 20px !important;
                      background: white !important;
                      color: black !important;
                      page-break-after: avoid;
                    }
                    [data-print-certificate],
                    [data-print-certificate] * {
                      background: white !important;
                      color: black !important;
                      opacity: 1 !important;
                      visibility: visible !important;
                      display: inherit !important;
                      border-color: #333 !important;
                    }
                    [data-print-certificate] h1,
                    [data-print-certificate] h2,
                    [data-print-certificate] h3,
                    [data-print-certificate] p,
                    [data-print-certificate] span {
                      color: black !important;
                      background: white !important;
                    }
                    [data-print-certificate] svg {
                      filter: grayscale(100%);
                    }
                    [data-print-certificate] img {
                      max-width: 100%;
                      display: block !important;
                    }
                    .dark\\:bg-gray-800,
                    .dark\\:text-white,
                    [class*="dark:"] {
                      background-color: white !important;
                      color: black !important;
                      border-color: #ccc !important;
                    }
                  }
                `;
                document.head.appendChild(printStyles);

                // Delay print to ensure styles are applied
                setTimeout(() => {
                  window.print();
                  // Cleanup after print dialog closes
                  setTimeout(() => {
                    const styles = document.getElementById('print-styles');
                    if (styles) {
                      document.head.removeChild(styles);
                    }
                  }, 1000);
                }, 100);
              }}
              className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors"
            >
              <Printer className="w-5 h-5" />
              <span>Print</span>
            </button>
          </div>

          {/* Certificate Preview */}
          <div
            ref={certificateRef}
            data-print-certificate
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-4 border-yellow-400 dark:border-yellow-500 mb-8 print:border-8"
          >
            {/* Ornamental Border */}
            <div className="bg-gradient-to-r from-yellow-600 via-gray-600 to-yellow-600 h-3"></div>

            <div className="p-12 md:p-16 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              {/* Content */}
              <div className="relative text-center space-y-6">
                {/* Header */}
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Award className="w-16 h-16 text-yellow-500" />
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Certificate of Christian Education
                  </h1>
                </div>

                {/* Decorative Line */}
                <div className="flex items-center justify-center space-x-3 my-6">
                  <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
                </div>

                {/* Main Content */}
                <div className="space-y-6 py-8">
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    This is to certify that
                  </p>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white py-4 border-b-2 border-t-2 border-gray-300 dark:border-gray-600">
                    {certificateData.student_name}
                  </h2>

                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    has successfully completed the Word Ministry programme
                  </p>

                  <h3 className="text-3xl md:text-4xl font-semibold text-red-600 dark:text-red-400 px-8">
                    {certificateData.course_name}
                  </h3>

                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    A {certificateData.course_hours}-hour Sunday School and Bible Study programme
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t-2 border-b-2 border-gray-300 dark:border-gray-600 my-8">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Completion Date</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {certificateData.completion_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Certificate ID</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                      {certificateData.certificate_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Final Score</p>
                    <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                      {certificateData.score}%
                    </p>
                  </div>
                </div>

                {/* Church signatures */}
                <div className="flex flex-col md:flex-row justify-around items-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="h-px w-48 bg-gray-400 mb-2"></div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {certificateData.instructor_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sunday School / Bible Study Facilitator
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mb-4">
                      <div className="h-px w-48 bg-gray-400 mb-2"></div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Prophet (Dr.) Samuel Olugbenga Ilesanmi
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        President, APGA Worldwide Church
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="flex items-center justify-center pt-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-900 dark:bg-white mx-auto mb-3 rounded-lg flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=${encodeURIComponent(certificateData.verification_url)}`}
                        alt="QR Code"
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Scan to verify certificate
                    </p>
                  </div>
                </div>

                {/* Church authenticity badge */}
                <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400 pt-4">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">Official APGA Worldwide Church Certificate</span>
                </div>
              </div>
            </div>

            {/* Bottom Border */}
            <div className="bg-gradient-to-r from-yellow-600 via-gray-600 to-yellow-600 h-3"></div>
          </div>

          {/* Verification Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-600" />
              <span>Certificate Verification</span>
            </h3>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                This certificate can be verified by anyone using the certificate ID:
                <span className="font-mono font-semibold text-gray-900 dark:text-white ml-2">
                  {certificateData.certificate_id}
                </span>
              </p>
              <div className="flex items-start space-x-2 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 dark:text-red-200">
                  This certificate is issued by APGA Worldwide Church and may be verified using the certificate ID or QR code.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white mb-2">How to share:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 dark:text-red-400">•</span>
                    <span>Share your growth in the Word with your church fellowship</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 dark:text-red-400">•</span>
                    <span>Present it as recognition of your Sunday School and Bible Study commitment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-600 dark:text-red-400">•</span>
                    <span>Keep the verification link for church records</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Print Styles */}
          <style>{`
            @media print {
              body * {
                visibility: hidden;
              }
              #certificate-container, #certificate-container * {
                visibility: visible;
              }
              #certificate-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </ModernLayout>
  );
}
