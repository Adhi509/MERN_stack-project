
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Clock, MapPin, Star, User } from 'lucide-react';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [appointmentType, setAppointmentType] = useState<string>('consultation');
  const [notes, setNotes] = useState<string>('');

  // Mock doctor data - in real app, this would come from API
  const mockDoctor = {
    id: doctorId,
    name: 'Sarah Johnson',
    specialization: 'Cardiologist',
    location: 'New York, NY',
    rating: 4.9,
    experience: 12,
    image: '',
    fee: 150
  };

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'checkup', label: 'Regular Check-up' },
    { value: 'emergency', label: 'Emergency Consultation' }
  ];

  const handleBookAppointment = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time for your appointment.",
        variant: "destructive"
      });
      return;
    }

    // Mock booking - in real app, this would be an API call
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with Dr. ${mockDoctor.name} has been scheduled for ${selectedDate.toDateString()} at ${selectedTime}.`
    });

    // Navigate back to dashboard or appointments page
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600 mt-2">Schedule your visit with the doctor</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {mockDoctor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Dr. {mockDoctor.name}</h3>
                      <Badge variant="secondary">{mockDoctor.specialization}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{mockDoctor.rating} Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{mockDoctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{mockDoctor.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-lg font-semibold text-green-600">
                      Consultation Fee: ${mockDoctor.fee}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Your Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="flex items-center space-x-1"
                      >
                        <Clock className="w-3 h-3" />
                        <span>{time}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Appointment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {appointmentTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant={appointmentType === type.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAppointmentType(type.value)}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe your symptoms or reason for visit..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Booking Summary</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Doctor:</strong> Dr. {mockDoctor.name}</p>
                      <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
                      <p><strong>Time:</strong> {selectedTime}</p>
                      <p><strong>Type:</strong> {appointmentTypes.find(t => t.value === appointmentType)?.label}</p>
                      <p><strong>Fee:</strong> ${mockDoctor.fee}</p>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button 
                  onClick={handleBookAppointment}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={!selectedDate || !selectedTime}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
