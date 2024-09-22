const express = require('express');
const router = express.Router(); // Create a new Router

// Sample data for demonstration (or you could read from a database/file)
let hospitals = [
  { id: 1, name: 'City Hospital', patientCount: 150, location: 'New York' },
  { id: 2, name: 'Green Valley Hospital', patientCount: 85, location: 'Los Angeles' }
];

// GET all hospitals
router.get('/', (req, res) => {
  res.json(hospitals);
});

// GET a single hospital by ID
router.get('/:id', (req, res) => {
  const hospital = hospitals.find(h => h.id === parseInt(req.params.id));
  if (hospital) {
    res.json(hospital);
  } else {
    res.status(404).json({ message: 'Hospital not found' });
  }
});

// POST: Add a new hospital
router.post('/', (req, res) => {
  const newHospital = {
    id: hospitals.length + 1,
    name: req.body.name,
    patientCount: req.body.patientCount,
    location: req.body.location
  };
  hospitals.push(newHospital);
  res.status(201).json(newHospital);
});

// PUT: Update a hospital by ID
router.put('/:id', (req, res) => {
  const hospital = hospitals.find(h => h.id === parseInt(req.params.id));
  if (hospital) {
    hospital.name = req.body.name || hospital.name;
    hospital.patientCount = req.body.patientCount || hospital.patientCount;
    hospital.location = req.body.location || hospital.location;
    res.json(hospital);
  } else {
    res.status(404).json({ message: 'Hospital not found' });
  }
});

// DELETE: Delete a hospital by ID
router.delete('/:id', (req, res) => {
  const index = hospitals.findIndex(h => h.id === parseInt(req.params.id));
  if (index !== -1) {
    hospitals.splice(index, 1);
    res.json({ message: 'Hospital deleted' });
  } else {
    res.status(404).json({ message: 'Hospital not found' });
  }
});

module.exports = router; // Export the router