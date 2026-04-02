import React, { useState, useEffect } from 'react';
import { MessageSquare, Calendar, Clock, User, MapPin, Phone, CheckCircle } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch appointments from your backend
      const response = await fetch('http://localhost:5000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📬 My Messages
          </h1>
          <p className="text-gray-600">
            {messages.length === 0 ? 'All caught up!' : `You have ${messages.length} message${messages.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Messages Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-16 px-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No messages yet
              </h2>
              <p className="text-gray-500 max-w-md">
                Messages will appear here when you book or update appointments
              </p>
            </div>
          ) : (
            /* Messages List */
            <div className="divide-y divide-gray-200">
              {messages.map((message, index) => (
                <div key={message.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                  {/* Message Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Appointment Confirmed
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(message.created_at || message.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Confirmed
                    </span>
                  </div>

                  {/* Message Content */}
                  <div className="ml-13 space-y-3">
                    <p className="text-gray-700">
                      Your appointment has been successfully booked with the following details:
                    </p>

                    {/* Appointment Details Grid */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Patient Name</p>
                          <p className="font-medium text-gray-900">
                            {message.patient_name}
                          </p>
                        </div>
                      </div>

                      {message.doctor_name && (
                        <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Doctor</p>
                            <p className="font-medium text-gray-900">
                              {message.doctor_name}
                            </p>
                            {message.department && (
                              <p className="text-sm text-gray-600">
                                {message.department}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-900">
                            {formatDate(message.date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium text-gray-900">
                            {message.time_slot}
                          </p>
                        </div>
                      </div>

                      {message.priority && (
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 mt-0.5">
                            {message.priority === 'High' && <span className="text-red-600">🔴</span>}
                            {message.priority === 'Medium' && <span className="text-yellow-600">🟡</span>}
                            {message.priority === 'Low' && <span className="text-green-600">🟢</span>}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Priority</p>
                            <p className="font-medium text-gray-900">
                              {message.priority}
                            </p>
                          </div>
                        </div>
                      )}

                      {message.hospital && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Hospital</p>
                            <p className="font-medium text-gray-900">
                              {message.hospital}
                            </p>
                            {message.city && (
                              <p className="text-sm text-gray-600">
                                {message.city}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {message.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-medium text-gray-900">
                              {message.phone}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 italic">
                      Please arrive 10 minutes before your scheduled appointment time.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
