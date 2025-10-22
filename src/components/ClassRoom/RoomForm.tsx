import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { usersData } from "../../data/profile-data/userData";
import { FaUniversity } from "react-icons/fa";

type FormValues = {
  university: string;
  department: string;
  section: string;
  subsection: string;
};

const unique = (arr: Array<string | undefined>) =>
  Array.from(new Set(arr.filter(Boolean))) as string[];

const RoomForm: React.FC<{
  onSubmit: (data: FormValues) => void;
  onCancel?: () => void;
}> = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, watch, formState } = useForm<FormValues>({
    defaultValues: {
      university: "",
      department: "",
      section: "",
      subsection: "",
    },
  });

  const { errors } = formState;
  const selectedUniversity = watch("university");
  const selectedDepartment = watch("department");

  const universities = useMemo(
    () => unique(usersData.map((u) => u.university?.name)),
    []
  );

  const departments = useMemo(() => {
    if (!selectedUniversity)
      return unique(usersData.map((u) => u.university?.department));
    return unique(
      usersData
        .filter((u) => u.university?.name === selectedUniversity)
        .map((u) => u.university?.department)
    );
  }, [selectedUniversity]);

  const sections = useMemo(() => {
    return unique(
      usersData
        .filter((u) =>
          selectedUniversity ? u.university?.name === selectedUniversity : true
        )
        .filter((u) =>
          selectedDepartment
            ? u.university?.department === selectedDepartment
            : true
        )
        .map((u) => u.university?.section)
    );
  }, [selectedUniversity, selectedDepartment]);

  const subsections = useMemo(
    () => unique(usersData.map((u) => u.university?.subsection)),
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-md bg-blue-50 p-2 text-blue-600">
          <FaUniversity />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Create a new room
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            University
          </label>
          <div className="relative mt-1">
            <select
              {...register("university", {
                required: "University is required",
              })}
              className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 pr-8 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select university</option>
              {universities.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          {errors.university?.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.university?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <div className="relative mt-1">
            <select
              {...register("department", {
                required: "Department is required",
              })}
              className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 pr-8 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          {errors.department?.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.department?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Section
          </label>
          <div className="relative mt-1">
            <select
              {...register("section", { required: "Section is required" })}
              className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 pr-8 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select section</option>
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {errors.section?.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.section?.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subsection
          </label>
          <div className="relative mt-1">
            <select
              {...register("subsection", {
                required: "Subsection is required",
              })}
              className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 pr-8 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select subsection</option>
              {subsections.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {errors.subsection?.message && (
            <p className="mt-1 text-xs text-red-600">
              {errors.subsection?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Room
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
