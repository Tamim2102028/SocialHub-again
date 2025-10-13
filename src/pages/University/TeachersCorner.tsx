import React, { useState } from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaMapMarkerAlt,
  FaSearch,
  FaBook,
  FaStar,
} from "react-icons/fa";

interface Teacher {
  id: number;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  image: string;
  specialization: string[];
  rating: number;
  coursesTeaching: string[];
}

const TeachersCorner: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = ["All", "CSE", "EEE", "ME", "CE", "IPE"];

  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Dr. Sadia Rahman",
      designation: "Professor",
      department: "CSE",
      email: "sadia.rahman@buet.ac.bd",
      phone: "+880 1711-111111",
      office: "ECE Building, Room 401",
      officeHours: "Sun, Tue: 10:00 AM - 12:00 PM",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      specialization: ["Machine Learning", "Data Science", "AI"],
      rating: 4.8,
      coursesTeaching: ["CSE 101", "CSE 405"],
    },
    {
      id: 2,
      name: "Dr. Md. Asif Hossain",
      designation: "Associate Professor",
      department: "EEE",
      email: "asif.hossain@buet.ac.bd",
      phone: "+880 1722-222222",
      office: "EEE Building, Room 302",
      officeHours: "Mon, Wed: 2:00 PM - 4:00 PM",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      specialization: ["Power Systems", "Renewable Energy"],
      rating: 4.6,
      coursesTeaching: ["EEE 201", "EEE 301"],
    },
    {
      id: 3,
      name: "Dr. Nusrat Jahan",
      designation: "Assistant Professor",
      department: "CSE",
      email: "nusrat.jahan@buet.ac.bd",
      phone: "+880 1733-333333",
      office: "ECE Building, Room 305",
      officeHours: "Sat, Mon: 11:00 AM - 1:00 PM",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      specialization: ["Software Engineering", "Web Development"],
      rating: 4.9,
      coursesTeaching: ["CSE 305", "CSE 307"],
    },
    {
      id: 4,
      name: "Dr. Tanvir Ahmed",
      designation: "Professor",
      department: "ME",
      email: "tanvir.ahmed@buet.ac.bd",
      phone: "+880 1744-444444",
      office: "ME Building, Room 201",
      officeHours: "Tue, Thu: 3:00 PM - 5:00 PM",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      specialization: ["Thermodynamics", "Heat Transfer"],
      rating: 4.7,
      coursesTeaching: ["ME 201", "ME 403"],
    },
    {
      id: 5,
      name: "Dr. Fatema Khatun",
      designation: "Lecturer",
      department: "CE",
      email: "fatema.khatun@buet.ac.bd",
      phone: "+880 1755-555555",
      office: "CE Building, Room 102",
      officeHours: "Sun, Wed: 9:00 AM - 11:00 AM",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      specialization: ["Structural Engineering", "Concrete Design"],
      rating: 4.5,
      coursesTeaching: ["CE 101", "CE 205"],
    },
    {
      id: 6,
      name: "Dr. Rafiqul Islam",
      designation: "Associate Professor",
      department: "IPE",
      email: "rafiqul.islam@buet.ac.bd",
      phone: "+880 1766-666666",
      office: "IPE Building, Room 203",
      officeHours: "Mon, Thu: 1:00 PM - 3:00 PM",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      specialization: ["Operations Research", "Supply Chain"],
      rating: 4.6,
      coursesTeaching: ["IPE 301", "IPE 405"],
    },
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesDept =
      selectedDept === "All" || teacher.department === selectedDept;
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialization.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Teachers' Corner</h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with faculty members and access their information
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <FaSearch className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, designation, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Department Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`rounded-lg px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                  selectedDept === dept
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >
              {/* Teacher Image and Basic Info */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white">
                <div className="mb-4 flex justify-center">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                </div>
                <h3 className="mb-1 text-xl font-bold">{teacher.name}</h3>
                <p className="mb-1 text-sm opacity-90">{teacher.designation}</p>
                <p className="text-sm font-semibold">
                  {teacher.department} Department
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center justify-center gap-1">
                  <FaStar className="h-4 w-4 text-yellow-300" />
                  <span className="font-semibold">{teacher.rating}</span>
                  <span className="text-sm opacity-75">/5.0</span>
                </div>
              </div>

              {/* Teacher Details */}
              <div className="p-5">
                {/* Specialization */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-semibold text-gray-700">
                    Specialization
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Courses Teaching */}
                <div className="mb-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FaBook className="h-4 w-4" />
                    Current Courses
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.coursesTeaching.map((course, index) => (
                      <span
                        key={index}
                        className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="h-4 w-4 text-blue-600" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaMapMarkerAlt className="h-4 w-4 text-blue-600" />
                    <span>{teacher.office}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaClock className="h-4 w-4 text-blue-600" />
                    <span className="text-xs">{teacher.officeHours}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition-colors hover:bg-blue-700">
                  Contact Teacher
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTeachers.length === 0 && (
          <div className="py-16 text-center">
            <FaUserTie className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No teachers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersCorner;
