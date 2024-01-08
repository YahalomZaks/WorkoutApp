import { useEffect } from "react";
import WorkoutsDetails from "../components/WorkoutsDetails";
import WorkoutsForm from "../components/workoutsForm";
import { BASE_URL } from "../setting";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`${BASE_URL}/api/workouts`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkout();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutsDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutsForm />
    </div>
  );
};

export default Home;
