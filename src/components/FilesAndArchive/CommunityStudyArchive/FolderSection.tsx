import React from "react";
import { FaFolder } from "react-icons/fa";
import { useAppSelector } from "../../../store/hooks";
import { selectTheoryCourses, selectSessionalCourses } from "../../../store/slices/communityStudyArchiveSlice";

const FolderSection: React.FC = () => {
  // Redux state - get courses based on selected level and term
  const theoryCourses = useAppSelector(selectTheoryCourses);
  const sessionalCourses = useAppSelector(selectSessionalCourses);

  return (
    <div className="space-y-6">
      {/* Theory Courses */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Theory Courses ({theoryCourses.length})
        </h3>
        {theoryCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {theoryCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-b border-gray-100 bg-gray-50 p-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    {course.name} ({course.code})
                  </h4>
                  <p className="text-xs text-gray-500">{course.fileCount} total files</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {course.folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="group flex cursor-pointer items-center justify-between p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex flex-1 items-center space-x-3">
                        <div className="text-lg">
                          <FaFolder className="text-blue-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {folder.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {folder.fileCount} files
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">No theory courses found for this level and term</p>
          </div>
        )}
      </div>

      {/* Sessional Courses */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Sessional Courses ({sessionalCourses.length})
        </h3>
        {sessionalCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {sessionalCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="border-b border-gray-100 bg-gray-50 p-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    {course.name} ({course.code})
                  </h4>
                  <p className="text-xs text-gray-500">{course.fileCount} total files</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {course.folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="group flex cursor-pointer items-center justify-between p-3 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex flex-1 items-center space-x-3">
                        <div className="text-lg">
                          <FaFolder className="text-green-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {folder.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {folder.fileCount} files
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">No sessional courses found for this level and term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderSection;
