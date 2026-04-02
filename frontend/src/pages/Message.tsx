import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function Messages() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📬 My Messages
          </h1>
          <p className="text-gray-600">All caught up!</p>
        </div>

        {/* Messages Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          {/* Empty State */}
          <div className="flex flex-col items-center justify-center text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No messages yet
            </h2>
            <p className="text-gray-500 max-w-md">
              Messages will appear here when you book or update appointments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
