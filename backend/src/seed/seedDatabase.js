// ===============================
// 1. Imports
// ===============================

import mongoose from "mongoose";
import dotenv from "dotenv";

import Staff from "../models/Staff.js";
import Hostel from "../models/Hostel.js";
import Complaint from "../models/Complaint.js";

import connectDB from "../config/db.js";
import { ROLES } from "../constants/roles.js";
import {
  COMPLAINT_PRIORITY,
  COMPLAINT_STATUS,
  COMPLAINT_CATEGORY,
} from "../constants/complaint.js";

// ===============================
// 2. Load Environment Variables
// ===============================

dotenv.config();

// ===============================
// 3. Seed Database
// ===============================

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    await connectDB();
    console.log("✅ Database connected.");
    console.log("🗑️ Clearing existing data...");

    await Complaint.deleteMany({});
    await Staff.deleteMany({});
    await Hostel.deleteMany({});

    console.log("✅ Existing data cleared.");
    // ===============================
    // 4. Create Super Admin
    // ===============================

    console.log("👑 Creating Super Admin...");

    const superAdmin = await Staff.create({
      name: "Super Admin",
      email: "admin@fixflow.com",
      password: "Admin@123",
      role: ROLES.ADMIN,
    });

    console.log("✅ Super Admin created.");

    // ===============================
    // 5. Create Hostel
    // ===============================

    console.log("🏠 Creating Hostel...");

    const hostel = await Hostel.create({
      name: "ABC Boys Hostel",
      code: "ABCH001",
      capacity: 300,
      address: "Bhopal, Madhya Pradesh",
      createdBy: superAdmin._id,
    });

    console.log("✅ Hostel created.");

    // ===============================
    // 6. Create Head Warden
    // ===============================

    console.log("👨‍💼 Creating Head Warden...");

    const headWarden = await Staff.create({
      name: "Rahul Sharma",
      email: "headwarden@fixflow.com",
      password: "Head@123",
      role: ROLES.WARDEN,
      hostel: hostel._id,
      isHeadWarden: true,
    });

    console.log("✅ Head Warden created.");

    // ===============================
    // 7. Create Warden
    // ===============================

    console.log("👨‍💼 Creating Warden...");

    const warden = await Staff.create({
      name: "Amit Verma",
      email: "warden@fixflow.com",
      password: "Warden@123",
      role: ROLES.WARDEN,
      hostel: hostel._id,
    });

    console.log("✅ Warden created.");

    // ===============================
    // 8. Create Workers
    // ===============================

    console.log("👷 Creating Workers...");

    const workers = [];

    workers.push(
      await Staff.create({
        name: "Ramesh Electrician",
        email: "electrician@fixflow.com",
        password: "Worker@123",
        role: ROLES.WORKER,
        hostel: hostel._id,
      }),
    );

    workers.push(
      await Staff.create({
        name: "Suresh Plumber",
        email: "plumber@fixflow.com",
        password: "Worker@123",
        role: ROLES.WORKER,
        hostel: hostel._id,
      }),
    );

    workers.push(
      await Staff.create({
        name: "Mahesh General",
        email: "general@fixflow.com",
        password: "Worker@123",
        role: ROLES.WORKER,
        hostel: hostel._id,
      }),
    );

    console.log("✅ Workers created.");

    // ===============================
    // 9. Create Students
    // ===============================

    console.log("🎓 Creating Students...");

    const students = [];

    students.push(
      await Staff.create({
        name: "Aman Gupta",
        enrollmentNumber: "202401001",
        email: "aman@fixflow.com",
        password: "202401001",
        role: ROLES.STUDENT,
        hostel: hostel._id,
      }),
    );

    students.push(
      await Staff.create({
        name: "Rohit Yadav",
        enrollmentNumber: "202401002",
        email: "rohit@fixflow.com",
        password: "202401002",
        role: ROLES.STUDENT,
        hostel: hostel._id,
      }),
    );

    students.push(
      await Staff.create({
        name: "Vivek Mishra",
        enrollmentNumber: "202401003",
        email: "vivek@fixflow.com",
        password: "202401003",
        role: ROLES.STUDENT,
        hostel: hostel._id,
      }),
    );

    students.push(
      await Staff.create({
        name: "Harsh Jain",
        enrollmentNumber: "202401004",
        email: "harsh@fixflow.com",
        password: "202401004",
        role: ROLES.STUDENT,
        hostel: hostel._id,
      }),
    );

    students.push(
      await Staff.create({
        name: "Arjun Patel",
        enrollmentNumber: "202401005",
        email: "arjun@fixflow.com",
        password: "202401005",
        role: ROLES.STUDENT,
        hostel: hostel._id,
      }),
    );

    console.log("✅ Students created.");

    // ===============================
    // 10. Create Complaints
    // ===============================

    console.log("📝 Creating Complaints...");

    await Complaint.create([
      {
        title: "Fan not working",
        description: "Ceiling fan in Room 101 is not rotating.",
        category: COMPLAINT_CATEGORY.ELECTRICAL,
        priority: COMPLAINT_PRIORITY.HIGH,
        status: COMPLAINT_STATUS.PENDING,
        createdBy: students[0]._id,
        hostel: hostel._id,
      },
      {
        title: "Bathroom tap leaking",
        description: "Tap is continuously leaking in Room 105.",
        category: COMPLAINT_CATEGORY.PLUMBING,
        priority: COMPLAINT_PRIORITY.MEDIUM,
        status: COMPLAINT_STATUS.ASSIGNED,
        createdBy: students[1]._id,
        hostel: hostel._id,
        assignedWorker: workers[1]._id,
        assignedBy: headWarden._id,
      },
      {
        title: "Tube light fused",
        description: "Tube light is not working.",
        category: COMPLAINT_CATEGORY.ELECTRICAL,
        priority: COMPLAINT_PRIORITY.LOW,
        status: COMPLAINT_STATUS.IN_PROGRESS,
        createdBy: students[2]._id,
        hostel: hostel._id,
        assignedWorker: workers[0]._id,
        assignedBy: headWarden._id,
      },
      {
        title: "Water cooler not cooling",
        description: "Water cooler on ground floor isn't cooling.",
        category: COMPLAINT_CATEGORY.OTHER,
        priority: COMPLAINT_PRIORITY.HIGH,
        status: COMPLAINT_STATUS.COMPLETED,
        createdBy: students[3]._id,
        hostel: hostel._id,
        assignedWorker: workers[2]._id,
        assignedBy: headWarden._id,
      },
      {
        title: "Room lock broken",
        description: "Door lock is damaged.",
        category: COMPLAINT_CATEGORY.FURNITURE,
        priority: COMPLAINT_PRIORITY.MEDIUM,
        status: COMPLAINT_STATUS.PENDING,
        createdBy: students[4]._id,
        hostel: hostel._id,
      },
      {
        title: "Window glass cracked",
        description: "Glass pane cracked due to heavy wind.",
        category: COMPLAINT_CATEGORY.FURNITURE,
        priority: COMPLAINT_PRIORITY.LOW,
        status: COMPLAINT_STATUS.ASSIGNED,
        createdBy: students[0]._id,
        hostel: hostel._id,
        assignedWorker: workers[2]._id,
        assignedBy: headWarden._id,
      },
      {
        title: "WiFi not working",
        description: "Unable to connect to hostel WiFi.",
        category: COMPLAINT_CATEGORY.INTERNET,
        priority: COMPLAINT_PRIORITY.HIGH,
        status: COMPLAINT_STATUS.IN_PROGRESS,
        createdBy: students[1]._id,
        hostel: hostel._id,
        assignedWorker: workers[2]._id,
        assignedBy: headWarden._id,
      },
      {
        title: "Wash basin clogged",
        description: "Water is not draining properly.",
        category: COMPLAINT_CATEGORY.PLUMBING,
        priority: COMPLAINT_PRIORITY.MEDIUM,
        status: COMPLAINT_STATUS.COMPLETED,
        createdBy: students[2]._id,
        hostel: hostel._id,
        assignedWorker: workers[1]._id,
        assignedBy: headWarden._id,
      },
      {
        title: "Dustbin not cleaned",
        description: "Dustbin outside Room 202 hasn't been cleaned.",
        category: COMPLAINT_CATEGORY.CLEANING,
        priority: COMPLAINT_PRIORITY.LOW,
        status: COMPLAINT_STATUS.PENDING,
        createdBy: students[3]._id,
        hostel: hostel._id,
      },
      {
        title: "Power socket damaged",
        description: "Socket sparks when plugging in charger.",
        category: COMPLAINT_CATEGORY.ELECTRICAL,
        priority: COMPLAINT_PRIORITY.HIGH,
        status: COMPLAINT_STATUS.ASSIGNED,
        createdBy: students[4]._id,
        hostel: hostel._id,
        assignedWorker: workers[0]._id,
        assignedBy: headWarden._id,
      },
    ]);

    console.log("✅ Complaints created.");
  } catch (error) {
    console.error(error);

    process.exit(1);
  } finally {
    await mongoose.connection.close();

    console.log("🔌 Database connection closed.");
  }
};

seedDatabase();
