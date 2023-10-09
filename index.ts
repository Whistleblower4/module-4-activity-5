const express = require('express');
const bodyParser = require('body-parser');
const StudentModel = require('./models/studentModel');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await StudentModel.getAllStudents();
    res.status(200).json({
      status: 'success',
      results: students.length,
      data: {
        students,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch students',
      error: error.message,
    });
  }
});

// Get student by ID
app.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await StudentModel.getStudentById(id);
    if (student) {
      res.status(200).json({
        status: 'success',
        data: {
          student,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch student',
      error: error.message,
    });
  }
});

// Update student by ID (PUT)
app.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedStudent = await StudentModel.updateStudentById(id, name, email);

    if (updatedStudent) {
      res.status(200).json({
        status: 'success',
        data: updatedStudent,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to update student',
      error: error.message,
    });
  }
});

// Partially update student by ID (PATCH)
app.patch('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedStudent = await StudentModel.partiallyUpdateStudentById(id, name, email);

    if (updatedStudent) {
      res.status(200).json({
        status: 'success',
        data: updatedStudent,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Student not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to partially update student',
      error: error.message,
    });
  }
});

// Delete student by ID (DELETE)
app.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await StudentModel.deleteStudentById(id);
    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete student',
      error: error.message,
    });
  }
});

// Create a new student (POST)
app.post('/students', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newStudent = await StudentModel.createStudent(name, email);
    res.status(201).json({
      status: 'success',
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create student',
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
