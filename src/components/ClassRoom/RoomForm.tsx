import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { usersData } from "../../data/profile-data/userData";

type FormValues = {
  university: string;
  department: string;
  section: string;
  subsection: string;
};

const unique = (arr: Array<string | undefined>) => Array.from(new Set(arr.filter(Boolean))) as string[];

const RoomForm: React.FC<{ onSubmit: (data: FormValues) => void; onCancel?: () => void }> = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { university: "", department: "", section: "", subsection: "" },
  });

  const selectedUniversity = watch("university");
  const selectedDepartment = watch("department");

  const universities = useMemo(() => unique(usersData.map((u) => u.university?.name)), []);

  const departments = useMemo(() => {
    if (!selectedUniversity) return unique(usersData.map((u) => u.university?.department));
    return unique(usersData.filter((u) => u.university?.name === selectedUniversity).map((u) => u.university?.department));
  }, [selectedUniversity]);

  const sections = useMemo(() => {
    return unique(
      usersData
        .filter((u) => (selectedUniversity ? u.university?.name === selectedUniversity : true))
        .filter((u) => (selectedDepartment ? u.university?.department === selectedDepartment : true))
        .map((u) => u.university?.section)
    );
  }, [selectedUniversity, selectedDepartment]);

  const subsections = useMemo(() => unique(usersData.map((u) => u.university?.subsection)), []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <div>
        <label className="block text-sm font-semibold text-gray-700">University</label>
        <select {...register("university", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm">
          <option value="">Select university</option>
          {universities.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Department</label>
        <select {...register("department", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm">
          <option value="">Select department</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Section</label>
          <select {...register("section", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm">
            <option value="">Select section</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Subsection</label>
          <select {...register("subsection", { required: true })} className="mt-1 block w-full rounded-md border-gray-300 bg-white px-3 py-2 shadow-sm">
            <option value="">Select subsection</option>
            {subsections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-md border border-gray-300 px-4 py-2 text-sm">Cancel</button>
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Create Room</button>
      </div>
    </form>
  );
};

export default RoomForm;
