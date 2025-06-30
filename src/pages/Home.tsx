
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar, Users, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Find Doctors',
      description: 'Search and filter doctors by specialization, location, and availability'
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments instantly with real-time slot availability'
    },
    {
      icon: Users,
      title: 'Expert Care',
      description: 'Connect with verified healthcare professionals'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health information is protected with enterprise-grade security'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Health,{' '}
            <span className="text-blue-600">Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book appointments with trusted healthcare professionals in just a few clicks. 
            Skip the waiting rooms and get the care you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/doctors">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Find Doctors
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="px-8">
                Join as Patient
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Verified Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600">Specializations</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose DocSpot?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing healthcare accessibility with cutting-edge technology 
            and patient-centered care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients who trust DocSpot for their healthcare needs.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="px-8">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
