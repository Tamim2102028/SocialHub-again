import React from "react";
import {
  FaChalkboardTeacher,
  FaVideo,
  FaUsers,
  FaComments,
} from "react-icons/fa";

const Section: React.FC = () => {
  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="col-span-2 space-y-5">
        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-2 h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Live Class
              </h2>
            </div>
          </div>
          <div className="flex min-h-[260px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
            <div className="text-center">
              <FaVideo className="mx-auto mb-3 h-8 w-8 text-gray-500" />
              <p className="text-gray-700">Live video feature coming soon.</p>
              <p className="text-sm text-gray-500">
                We will add real-time class streaming here.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow">
          <h3 className="mb-3 text-base font-semibold text-gray-900">
            Upcoming Classes
          </h3>
          <ul className="divide-y divide-gray-200">
            {["Math - Algebra", "Physics - Optics", "English - Writing"].map(
              (title, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium text-gray-900">{title}</p>
                    <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                  </div>
                  <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50">
                    Details
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow">
          <div className="mb-3 flex items-center">
            <FaUsers className="mr-2 h-4 w-4 text-blue-600" />
            <h3 className="text-base font-semibold text-gray-900">
              Participants
            </h3>
          </div>
          <ul className="space-y-2">
            {["Sakib", "Rahim", "Nusrat", "Karim"].map((name) => (
              <li key={name} className="flex items-center justify-between">
                <span className="text-gray-800">{name}</span>
                <span className="text-xs text-gray-500">online</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-gray-300 bg-white p-5 shadow">
          <div className="mb-3 flex items-center">
            <FaComments className="mr-2 h-4 w-4 text-blue-600" />
            <h3 className="text-base font-semibold text-gray-900">
              Class Chat
            </h3>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            Chat feature placeholder. Students can discuss during class.
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Section;
