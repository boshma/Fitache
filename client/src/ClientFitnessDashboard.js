// client/src/ClientFitnessDashboard.js

import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';


const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  minHeight: 280,
  boxShadow: theme.shadows && theme.shadows[3] ? theme.shadows[3] : '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));


const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textTransform: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


const FitnessDashboard = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [mealData, setMealData] = useState([]);
  const [mealName, setMealName] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');

  const handleAddWorkout = () => {
    // Add workout data to workoutData state
  };

    // Fetch meals for the current day
    const fetchMealsToday = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/meals-today', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
  
        setMealData(response.data);
      } catch (error) {
        console.error('An error occurred while fetching meals', error);
      }
    };
  
    useEffect(() => {
      fetchMealsToday();
    }, []);

  const handleAddMeal = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/dashboard/add-meal', {
        name: mealName,
        carbs: carbs,
        proteins: proteins,
        fats: fats,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      console.log(response.data);

      const { meal } = response.data;
      setMealData([...mealData, meal]);

      // Reset the input fields
      setMealName('');
      setCarbs('');
      setProteins('');
      setFats('');
    } catch (error) {
      console.error('An error occurred while adding the meal', error);
    }
  };

  return (
    <StyledContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h5">Workouts</Typography>
              <TextField label="Exercise" fullWidth />
              <TextField label="Repetitions" fullWidth />
              <TextField label="Weight" fullWidth />
              <StyledButton onClick={handleAddWorkout}>Add Exercise</StyledButton>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h5">Meals</Typography>
              <TextField
                label="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Carbs"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                fullWidth
              />
              <TextField
                label="Proteins"
                value={proteins}
                onChange={(e) => setProteins(e.target.value)}
                fullWidth
              />
              <TextField
                label="Fats"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                fullWidth
              />
              <StyledButton onClick={handleAddMeal}>Add Meal</StyledButton>

              <ul>
              {mealData.map((meal, index) => (
              <li key={index}>
                Name: {meal.name}, Carbs: {meal.carbs}, Proteins: {meal.proteins}, Fats: {meal.fats}
              </li>
            ))}
          </ul>
        </StyledCardContent>
      </StyledCard>
    </Grid>

    <Grid item xs={12}>
      <StyledCard>
        <StyledCardContent>
          <Typography variant="h5">Your Daily Summary</Typography>
          <div>
            <h6>Workouts</h6>
            {/* You can add a custom workout data display here */}
          </div>
          <div>
            <h6>Meals</h6>
            <ul>
              {mealData.map((meal, index) => (
                <li key={index}>
                  Name: {meal.name}, Carbs: {meal.carbs}, Proteins: {meal.proteins}, Fats: {meal.fats}
                </li>
              ))}
            </ul>
          </div>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  </Grid>
</StyledContainer>
);
};

export default FitnessDashboard;