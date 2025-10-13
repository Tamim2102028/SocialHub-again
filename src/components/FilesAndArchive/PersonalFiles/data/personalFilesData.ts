export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  createdAt: string;
  fileType?: string;
  shared?: boolean;
  isPublic?: boolean;
}

export interface BreadcrumbItem {
  id: string;
  name: string;
}

// Hierarchical folder structure
export const folderContents: Record<string, FileItem[]> = {
  // Root folder contents
  root: [
    {
      id: "1",
      name: "Shared with me",
      type: "folder",
      createdAt: "2025-09-15",
    },
    {
      id: "2",
      name: "Personal Documents",
      type: "folder",
      createdAt: "2025-09-10",
    },
    {
      id: "3",
      name: "Study Materials",
      type: "folder",
      createdAt: "2025-09-05",
    },
    {
      id: "4",
      name: "profile_picture.jpg",
      type: "file",
      size: "800 KB",
      createdAt: "2025-09-01",
      fileType: "image",
    },
    {
      id: "5",
      name: "Resume_2025.pdf",
      type: "file",
      size: "1.2 MB",
      createdAt: "2025-08-28",
      fileType: "pdf",
    },
    {
      id: "6",
      name: "Assignment_Notes.docx",
      type: "file",
      size: "450 KB",
      createdAt: "2025-08-25",
      fileType: "docx",
      shared: true,
    },
  ],

  // Shared with me folder contents
  "1": [
    {
      id: "1-1",
      name: "Project_Collaboration.zip",
      type: "file",
      size: "5.2 MB",
      createdAt: "2025-09-14",
      fileType: "zip",
      shared: true,
    },
    {
      id: "1-2",
      name: "Meeting_Minutes.docx",
      type: "file",
      size: "250 KB",
      createdAt: "2025-09-12",
      fileType: "docx",
      shared: true,
    },
    {
      id: "1-3",
      name: "Shared Photos",
      type: "folder",
      createdAt: "2025-09-10",
    },
  ],

  // Personal Documents folder contents
  "2": [
    {
      id: "2-1",
      name: "Tax Returns",
      type: "folder",
      createdAt: "2025-09-08",
    },
    {
      id: "2-2",
      name: "Banking",
      type: "folder",
      createdAt: "2025-09-07",
    },
    {
      id: "2-3",
      name: "Personal_Letter.docx",
      type: "file",
      size: "180 KB",
      createdAt: "2025-09-06",
      fileType: "docx",
    },
    {
      id: "2-4",
      name: "ID_Scan.pdf",
      type: "file",
      size: "2.1 MB",
      createdAt: "2025-09-05",
      fileType: "pdf",
    },
  ],

  // Study Materials folder contents
  "3": [
    {
      id: "3-1",
      name: "Computer Science",
      type: "folder",
      createdAt: "2025-09-04",
    },
    {
      id: "3-2",
      name: "Mathematics",
      type: "folder",
      createdAt: "2025-09-03",
    },
    {
      id: "3-3",
      name: "Research_Paper.pdf",
      type: "file",
      size: "3.8 MB",
      createdAt: "2025-09-02",
      fileType: "pdf",
    },
    {
      id: "3-4",
      name: "Study_Schedule.xlsx",
      type: "file",
      size: "85 KB",
      createdAt: "2025-09-01",
      fileType: "xlsx",
    },
  ],

  // Shared Photos subfolder contents
  "1-3": [
    {
      id: "1-3-1",
      name: "vacation_photo1.jpg",
      type: "file",
      size: "2.5 MB",
      createdAt: "2025-09-09",
      fileType: "image",
      shared: true,
    },
    {
      id: "1-3-2",
      name: "team_building.jpg",
      type: "file",
      size: "1.8 MB",
      createdAt: "2025-09-08",
      fileType: "image",
      shared: true,
    },
  ],

  // Tax Returns subfolder contents
  "2-1": [
    {
      id: "2-1-1",
      name: "Tax_Return_2024.pdf",
      type: "file",
      size: "1.5 MB",
      createdAt: "2025-09-07",
      fileType: "pdf",
    },
    {
      id: "2-1-2",
      name: "Tax_Return_2023.pdf",
      type: "file",
      size: "1.3 MB",
      createdAt: "2025-09-06",
      fileType: "pdf",
    },
  ],

  // Banking subfolder contents
  "2-2": [
    {
      id: "2-2-1",
      name: "Bank_Statements_2024",
      type: "folder",
      createdAt: "2025-09-05",
    },
    {
      id: "2-2-2",
      name: "Account_Summary.pdf",
      type: "file",
      size: "320 KB",
      createdAt: "2025-09-04",
      fileType: "pdf",
    },
  ],

  // Computer Science subfolder contents
  "3-1": [
    {
      id: "3-1-1",
      name: "Algorithms_Notes.pdf",
      type: "file",
      size: "2.8 MB",
      createdAt: "2025-09-03",
      fileType: "pdf",
    },
    {
      id: "3-1-2",
      name: "Python_Projects",
      type: "folder",
      createdAt: "2025-09-02",
    },
    {
      id: "3-1-3",
      name: "Data_Structures.docx",
      type: "file",
      size: "1.1 MB",
      createdAt: "2025-09-01",
      fileType: "docx",
    },
  ],

  // Mathematics subfolder contents
  "3-2": [
    {
      id: "3-2-1",
      name: "Calculus_Solutions.pdf",
      type: "file",
      size: "4.2 MB",
      createdAt: "2025-08-31",
      fileType: "pdf",
    },
    {
      id: "3-2-2",
      name: "Statistics_Notes.docx",
      type: "file",
      size: "890 KB",
      createdAt: "2025-08-30",
      fileType: "docx",
    },
  ],
};

// Helper function to get current folder contents
export const getCurrentFolderContents = (
  currentPath: BreadcrumbItem[]
): FileItem[] => {
  if (currentPath.length === 0) {
    return folderContents["root"] || [];
  }

  const currentFolderId = currentPath[currentPath.length - 1].id;
  return folderContents[currentFolderId] || [];
};

// For backward compatibility
export const personalFilesData: FileItem[] = folderContents["root"];
