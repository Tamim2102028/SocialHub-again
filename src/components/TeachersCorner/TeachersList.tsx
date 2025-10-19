import React from "react";
import type { Teacher } from "../../data/teachersData";
import TeacherCard from "./TeacherCard";

interface Props {
  teachers: Teacher[];
  onSelect: (t: Teacher) => void;
}

const TeachersList: React.FC<Props> = ({ teachers, onSelect }) => {
  return (
    <div className="space-y-4">
      {teachers.map((t) => (
        <div key={t.id} onClick={() => onSelect(t)}>
          <TeacherCard teacher={t} />
        </div>
      ))}
    </div>
  );
};

export default TeachersList;
