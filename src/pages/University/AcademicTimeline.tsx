import React from "react";
import {
  FaCalendarPlus,
  FaGraduationCap,
  FaClipboardList,
  FaBookOpen,
  FaPencilAlt,
  FaCheckCircle,
  FaHeart,
  FaClock,
} from "react-icons/fa";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  isCompleted?: boolean;
}

const AcademicTimeline: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      date: "August 15, 2024",
      title: "Course Registration Begins",
      description:
        "Online course registration portal opens. Consult your advisor.",
      icon: FaCalendarPlus,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      isCompleted: true,
    },
    {
      id: "2",
      date: "August 25, 2024",
      title: "Classes Start",
      description:
        "First day of classes for the Fall 2024 semester. Welcome back!",
      icon: FaGraduationCap,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      isCompleted: true,
    },
    {
      id: "3",
      date: "September 5, 2024",
      title: "Last Day for Course Withdrawal",
      description: "Last day to add or drop courses without penalty.",
      icon: FaClipboardList,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      id: "4",
      date: "October 10, 2024",
      title: "Midterm Exams Begin",
      description:
        "Midterm examination period starts. Good luck with your studies!",
      icon: FaPencilAlt,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
    {
      id: "5",
      date: "November 15, 2024",
      title: "Registration for Spring 2025",
      description: "Early registration opens for Spring 2025 semester.",
      icon: FaBookOpen,
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-100",
    },
    {
      id: "6",
      date: "December 20, 2024",
      title: "Final Exams",
      description: "Final examination period. Prepare well and stay focused!",
      icon: FaCheckCircle,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Academic Timeline
          </h1>
          <p className="text-lg text-gray-600">
            Key dates and deadlines for the Fall 2024 semester.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200"></div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="group relative flex items-start">
                {/* Icon Container */}
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${event.iconBg} border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <event.icon className={`h-6 w-6 ${event.iconColor}`} />
                  {event.isCompleted && (
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                      <FaCheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Content Card */}
                <div
                  className={`ml-8 flex-1 ${index % 2 === 0 ? "md:mr-8" : "md:ml-16"}`}
                >
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    {/* Date Badge */}
                    <div className="mb-3 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-sm font-medium text-white">
                      <FaClock className="mr-2 h-3 w-3" />
                      {event.date}
                    </div>

                    {/* Event Title */}
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                      {event.title}
                    </h3>

                    {/* Event Description */}
                    <p className="leading-relaxed text-gray-600">
                      {event.description}
                    </p>

                    {/* Status Indicator */}
                    {event.isCompleted && (
                      <div className="mt-4 inline-flex items-center text-sm font-medium text-green-600">
                        <FaCheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                <div
                  className={`absolute top-8 left-16 h-0.5 w-8 bg-gradient-to-r ${
                    index % 2 === 0
                      ? "from-blue-200 to-transparent"
                      : "from-transparent to-purple-200"
                  } hidden md:block`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full border border-gray-100 bg-white px-6 py-3 shadow-lg">
            <FaHeart className="mr-2 h-5 w-5 text-red-500" />
            <span className="font-medium text-gray-700">
              Stay organized and achieve your academic goals!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicTimeline;
