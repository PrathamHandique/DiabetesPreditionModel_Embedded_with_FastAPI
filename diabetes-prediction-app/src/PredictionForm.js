import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

function PredictionForm() {
  const [formData, setFormData] = useState({
    pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: '',
  });

  const [predictionResult, setPredictionResult] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/diabetes_prediction', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setPredictionResult(response.data);
    } catch (error) {
      console.error('There was an error making the request:', error);
      setPredictionResult('Error making prediction.');
    }
  };

  return (
    <div>
      <h1>Diabetes Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" name="pregnancies" placeholder="Pregnancies" value={formData.pregnancies} onChange={handleChange} />
        <input type="number" name="Glucose" placeholder="Glucose" value={formData.Glucose} onChange={handleChange} />
        <input type="number" name="BloodPressure" placeholder="Blood Pressure" value={formData.BloodPressure} onChange={handleChange} />
        <input type="number" name="SkinThickness" placeholder="Skin Thickness" value={formData.SkinThickness} onChange={handleChange} />
        <input type="number" name="Insulin" placeholder="Insulin" value={formData.Insulin} onChange={handleChange} />
        <input type="number" name="BMI" placeholder="BMI" step="0.1" value={formData.BMI} onChange={handleChange} />
        <input type="number" name="DiabetesPedigreeFunction" placeholder="Diabetes Pedigree Function" step="0.001" value={formData.DiabetesPedigreeFunction} onChange={handleChange} />
        <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>
      <h2>Result: {predictionResult}</h2>
    </div>
  );
}

export default PredictionForm;
