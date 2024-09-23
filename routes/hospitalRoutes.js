const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const hospitalsFilePath = path.join(__dirname, '../hospitals.json');

// Function to read hospital data from JSON file
function readHospitals() {
  const data = fs.readFileSync(hospitalsFilePath);
  return JSON.parse(data);
}

// Function to write hospital data to JSON file
function writeHospitals(hospitals) {
  fs.writeFileSync(hospitalsFilePath, JSON.stringify(hospitals, null, 2));
}

// Get all hospitals (GET)
router.get('/', (req, res) => {
  try {
    const hospitals = readHospitals();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: 'Error reading hospitals data' });
  }
});

// Get a specific hospital by ID (GET)
router.get('/:id', (req, res) => {
  try {
    const hospitals = readHospitals();
    const hospital = hospitals.find(h => h.id === parseInt(req.params.id));
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });
    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: 'Error reading hospital data' });
  }
});

// Add a new hospital (POST)
router.post('/', (req, res) => {
  try {
    const hospitals = readHospitals();
    const newHospital = {
      id: hospitals.length ? hospitals[hospitals.length - 1].id + 1 : 1, // Auto-increment ID
      name: req.body.name,
      patientCount: req.body.patientCount,
      location: req.body.location
    };
    hospitals.push(newHospital);
    writeHospitals(hospitals);
    res.status(201).json(newHospital);
  } catch (error) {
    res.status(500).json({ message: 'Error saving new hospital' });
  }
});

// Update a hospital (PUT)
router.put('/:id', (req, res) => {
  try {
    const hospitals = readHospitals();
    const hospitalIndex = hospitals.findIndex(h => h.id === parseInt(req.params.id));
    if (hospitalIndex === -1) return res.status(404).json({ message: 'Hospital not found' });

    const updatedHospital = {
      ...hospitals[hospitalIndex],
      name: req.body.name || hospitals[hospitalIndex].name,
      patientCount: req.body.patientCount || hospitals[hospitalIndex].patientCount,
      location: req.body.location || hospitals[hospitalIndex].location
    };

    hospitals[hospitalIndex] = updatedHospital;
    writeHospitals(hospitals);
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: 'Error updating hospital' });
  }
});

// Delete a hospital (DELETE)
router.delete('/:id', (req, res) => {
  try {
    let hospitals = readHospitals();
    const hospitalIndex = hospitals.findIndex(h => h.id === parseInt(req.params.id));
    if (hospitalIndex === -1) return res.status(404).json({ message: 'Hospital not found' });

    hospitals = hospitals.filter(h => h.id !== parseInt(req.params.id));
    writeHospitals(hospitals);
    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hospital' });
  }
});

module.exports = router;
