

// Home.tsx
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = localStorage.getItem('email');

  useEffect(() => {
    if (user) {
      setLoading(true);
      api
        .get(`/modules`)
        .then((r) => setModules(r.data))
        .catch((err) => {
          if (err.response?.status === 401) {
            localStorage.clear();
            navigate('/');
          }
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/'); // Redirect non-logged-in users to /
    }
  }, [user, navigate]);

  const handleModuleClick = async (moduleId: number) => {
    if (moduleId === 4) {
      navigate('/quiz');
      return;
    }

    try {
      const response = await api.get(`/modules/${moduleId}`);
      setSelectedModule(response.data);
    } catch (err) {
      console.error('Failed to load module:', err);
    }
  };

  const courses = [
    {
      id: 1,
      title: 'AI Fundamentals for Financial Services',
      description: 'Master the basics of AI, ML, and DL in the context of financial services',
      modules: 3,
      duration: '2 hours',
      level: 'Beginner',
      color: 'from-blue-500 to-purple-600',
    },
    // {
    //   id: 2,
    //   title: 'Advanced AI Applications in Fintech',
    //   description: 'Explore cutting-edge AI applications in fraud detection, risk assessment, and customer service',
    //   modules: 4,
    //   duration: '3 hours',
    //   level: 'Advanced',
    //   color: 'from-green-500 to-teal-600',
    // },
    // {
    //   id: 3,
    //   title: 'Regulatory Compliance & AI Ethics',
    //   description: 'Understanding regulatory requirements and ethical considerations in AI deployment',
    //   modules: 2,
    //   duration: '1.5 hours',
    //   level: 'Intermediate',
    //   color: 'from-orange-500 to-red-600',
    // },
  ];

  // Logged-in user's dashboard
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="relative z-10 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {!selectedModule ? (
            <>
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  AI for Financial Services
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Complete learning path covering AI fundamentals, advanced applications, and regulatory compliance in financial technology
                </p>
              </div>

              {/* Course Catalog */}
              <div className="py-20 bg-white/90 rounded-2xl shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Course Catalog</h2>
                    <p className="text-xl text-gray-600">Comprehensive learning paths for every skill level</p>
                  </div>

                  {/* <div className="grid md:grid-cols-1 gap-8"> */}
                  <div className="flex  justify-center gap-8">
                    {courses  .map((course) => (
                      <div key={course.id} className="group cursor-pointer max-w-2xl w-full">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                          {/* Conditional Background */}
                          {/* Header Section */}
                          {course.id === 1 ? (
                            // Special case for Course 1 → OpenAI logo background
                            <div className="relative h-48 flex items-end justify-center p-6 bg-gray-900/5">
                              {/* Logo */}
                              <img
                                src="/logos/openai.png"
                                alt="OpenAI Logo"
                                className="absolute inset-0 w-full h-full object-contain opacity-20"
                              />
                              {/* Overlayed Text */}
                              <div className="relative text-center text-gray-900 z-10">
                                <div className="text-sm font-medium opacity-80 mb-1">{course.level}</div>
                                <h3 className="text-xl font-bold">{course.title}</h3>
                              </div>
                            </div>
                          ) : (
                            // Default case → Gradient background
                            <div className={`h-48 bg-gradient-to-br ${course.color} p-6 flex items-end`}>
                              <div className="text-white">
                                <div className="text-sm font-medium opacity-90 mb-1">{course.level}</div>
                                <h3 className="text-xl font-bold">{course.title}</h3>
                              </div>
                            </div>
                          )}
                          <div className="p-6">
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <span>{course.modules} modules</span>
                              <span>{course.duration}</span>
                            </div>
                            <Link
                              to="/course" // Navigate to /course
                              className="block w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center hover:bg-blue-300 hover:text-black"
                            >
                              Start Learning
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            
            </>
          ) : (
            /* Module Content View */
            <div className="max-w-4xl mx-auto">
            </div>
          )}
        </div>
      </div>
    </div>
  );
}