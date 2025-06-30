
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  experience: number;
  image: string;
  nextAvailable: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Dr. {doctor.name}</h3>
            <Badge variant="secondary" className="mb-2">
              {doctor.specialization}
            </Badge>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{doctor.rating}</span>
              </div>
              <span>{doctor.experience} years exp.</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <Calendar className="w-4 h-4" />
            <span>Next available: {doctor.nextAvailable}</span>
          </div>
          <div className="pt-2">
            <Link to={`/book-appointment/${doctor.id}`}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
