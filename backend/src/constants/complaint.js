// ===============================
// 1. Complaint Status
// ===============================

export const COMPLAINT_STATUS = {
  PENDING: "pending",
  ASSIGNED: "assigned",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  REJECTED: "rejected",
};

export const COMPLAINT_STATUS_VALUES = [
  COMPLAINT_STATUS.PENDING,
  COMPLAINT_STATUS.ASSIGNED,
  COMPLAINT_STATUS.IN_PROGRESS,
  COMPLAINT_STATUS.COMPLETED,
  COMPLAINT_STATUS.REJECTED,
];

// ===============================
// 2. Complaint Priority
// ===============================

export const COMPLAINT_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

export const COMPLAINT_PRIORITY_VALUES = Object.values(COMPLAINT_PRIORITY);

// ===============================
// 3. Complaint Categories
// ===============================

export const COMPLAINT_CATEGORY = {
  ELECTRICAL: "electrical",
  PLUMBING: "plumbing",
  CLEANING: "cleaning",
  FURNITURE: "furniture",
  INTERNET: "internet",
  OTHER: "other",
};

export const COMPLAINT_CATEGORY_VALUES = Object.values(COMPLAINT_CATEGORY);
