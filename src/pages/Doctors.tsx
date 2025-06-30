
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DoctorCard from '@/components/DoctorCard';
import { Search, Filter } from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const mockDoctors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialization: 'Cardiologist',
      location: 'New York, NY',
      rating: 4.9,
      experience: 12,
      image: '',
      nextAvailable: 'Tomorrow 2:00 PM'
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialization: 'Dermatologist',
      location: 'Los Angeles, CA',
      rating: 4.8,
      experience: 8,
      image: '',
      nextAvailable: 'Today 4:30 PM'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      specialization: 'Pediatrician',
      location: 'Chicago, IL',
      rating: 4.9,
      experience: 15,
      image: '',
      nextAvailable: 'Monday 10:00 AM'
    },
    {
      id: '4',
      name: 'David Thompson',
      specialization: 'Orthopedic',
      location: 'Houston, TX',
      rating: 4.7,
      experience: 10,
      image: '',
      nextAvailable: 'Tuesday 3:00 PM'
    }
  ];

  const specializations = ['Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'Neurologist'];
  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'];

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
    const matchesLocation = !selectedLocation || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialization && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-gray-600">Browse through our network of qualified healthcare professionals</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-semibold">Search & Filter</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialization('');
                  setSelectedLocation('');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('');
                setSelectedLocation('');
              }}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
