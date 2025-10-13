import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { coursesData, type Course } from "../../components/FilesAndArchive/CommunityStudyArchive/data/courses";
import { levelsData, termsData } from "../../components/FilesAndArchive/CommunityStudyArchive/data/levels";

export interface CommunityStudyArchiveState {
  selectedLevel: string;
  selectedTerm: string;
  activeArchiveTab: "official" | "seniors" | "classmates";
  searchQuery: string;
  courses: Course[];
  levels: string[];
  terms: string[];
}

// Initial state
const initialState: CommunityStudyArchiveState = {
  selectedLevel: "Level 1",
  selectedTerm: "Term 1",
  activeArchiveTab: "official",
  searchQuery: "",
  courses: coursesData,
  levels: levelsData,
  terms: termsData
};

// Slice
const communityStudyArchiveSlice = createSlice({
  name: "communityStudyArchive",
  initialState,
  reducers: {
    setSelectedLevel: (state, action: PayloadAction<string>) => {
      state.selectedLevel = action.payload;
    },
    setSelectedTerm: (state, action: PayloadAction<string>) => {
      state.selectedTerm = action.payload;
    },
    setActiveArchiveTab: (state, action: PayloadAction<"official" | "seniors" | "classmates">) => {
      state.activeArchiveTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    }
  }
});

// Actions
export const {
  setSelectedLevel,
  setSelectedTerm,
  setActiveArchiveTab,
  setSearchQuery
} = communityStudyArchiveSlice.actions;

// Selectors
export const selectSelectedLevel = (state: { communityStudyArchive: CommunityStudyArchiveState }) => 
  state.communityStudyArchive.selectedLevel;

export const selectSelectedTerm = (state: { communityStudyArchive: CommunityStudyArchiveState }) => 
  state.communityStudyArchive.selectedTerm;

export const selectActiveArchiveTab = (state: { communityStudyArchive: CommunityStudyArchiveState }) => 
  state.communityStudyArchive.activeArchiveTab;

export const selectSearchQuery = (state: { communityStudyArchive: CommunityStudyArchiveState }) => 
  state.communityStudyArchive.searchQuery;

export const selectLevels = (state: { communityStudyArchive: CommunityStudyArchiveState }) => 
  state.communityStudyArchive.levels;

export const selectTerms = (state: { communityStudyArchive: CommunityStudyArchiveState }) => 
  state.communityStudyArchive.terms;

// Filtered courses based on selected level and term
export const selectFilteredCourses = (state: { communityStudyArchive: CommunityStudyArchiveState }) => {
  const { courses, selectedLevel, selectedTerm, searchQuery } = state.communityStudyArchive;
  
  return courses.filter(course => 
    course.level === selectedLevel && 
    course.term === selectedTerm &&
    (searchQuery === "" || 
     course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     course.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};

// Theory courses only
export const selectTheoryCourses = (state: { communityStudyArchive: CommunityStudyArchiveState }) => {
  const filteredCourses = selectFilteredCourses(state);
  return filteredCourses.filter(course => course.type === "theory");
};

// Sessional courses only
export const selectSessionalCourses = (state: { communityStudyArchive: CommunityStudyArchiveState }) => {
  const filteredCourses = selectFilteredCourses(state);
  return filteredCourses.filter(course => course.type === "sessional");
};

export default communityStudyArchiveSlice.reducer;
