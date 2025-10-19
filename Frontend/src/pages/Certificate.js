import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, Download, Home } from 'lucide-react';
import { toast } from 'react-toastify';
import { certificateAPI, courseAPI } from '../services/api';

function Certificate() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate();
  }, [courseId]);

  const fetchCertificate = async () => {
    try {
      const [courseRes, certRes] = await Promise.all([
        courseAPI.getCourse(courseId),
        certificateAPI.generateCertificate(courseId)
      ]);
      
      setCourse(courseRes.data.course);
      setCertificateUrl(certRes.data.certificateUrl);
      toast.success('Certificate generated successfully!');
    } catch (error) {
      toast.error('Failed to generate certificate');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificateUrl) {
      window.open(`http://localhost:5000${certificateUrl}`, '_blank');
      toast.success('Certificate downloaded!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Generating certificate...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center">
            <Award className="w-24 h-24 text-yellow-300 mx-auto mb-6 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-4">
              🎉 Congratulations!
            </h1>
            <p className="text-2xl text-purple-200 mb-8">
              You've successfully completed the course!
            </p>
            
            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-4 border-yellow-400 rounded-2xl p-12 mb-8">
              <div className="text-4xl font-bold text-white mb-4">
                Certificate of Completion
              </div>
              <div className="text-xl text-yellow-200 mb-6">
                This certifies that you have successfully completed
              </div>
              <div className="text-3xl font-bold text-white mb-8">
                {course?.title || 'Video Course'}
              </div>
              <div className="text-lg text-yellow-300">
                Date: {new Date().toLocaleDateString()}
              </div>
              <div className="mt-6 text-sm text-yellow-200">
                VidCertix - Interactive Learning Platform
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Certificate</span>
              </button>
              
              <Link
                to="/dashboard"
                className="block w-full bg-white/10 text-white font-bold py-4 px-8 rounded-xl hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Home className="w-5 h-5" />
                  <span>Back to Dashboard</span>
                </div>
              </Link>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-purple-200 mb-4">Share your achievement!</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Share on LinkedIn
                </button>
                <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-colors">
                  Share on Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;