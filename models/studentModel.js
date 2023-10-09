const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ObjectId } = require('mongodb');

const StudentModel = {
  getAllStudents: async () => {
    try {
      const students = await prisma.student.findMany();
      return students;
    } catch (error) {
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id: Number(id) },
      });
      return student;
    } catch (error) {
      throw error;
    }
  },

  createStudent: async (name, email) => {
    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
          email,
        },
      });
      return newStudent;
    } catch (error) {
      throw error;
    }
  },

  partiallyUpdateStudentById: async (id, name, email) => {
    try {
      // Ensure that 'id' is a valid MongoDB ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }

      const updatedStudent = await prisma.student.update({
        where: { id },
        data: {
          name,
          email,
        },
      });
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  },

  updateStudentById: async (id, name, email) => {
    try {
      // Ensure that 'id' is a valid MongoDB ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }
  
      const updatedStudent = await prisma.student.update({
        where: { id }, // Use the 'id' as a string here
        data: {
          name,
          email,
        },
      });
      return updatedStudent;
    } catch (error) {
      throw error;
    }
  },
  

  deleteStudentById: async (id) => {
    try {
      // Ensure that 'id' is a valid MongoDB ObjectId
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }
  
      await prisma.student.delete({
        where: { id }, // Use the 'id' as a string here
      });
    } catch (error) {
      throw error;
    }
  },  
};

module.exports = StudentModel;
