import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import apiRequest from './apiRequest';

function Bar() {
  const [rebuilds, setRebuilds] = useState([]);

const getRebuild=async ()=> {
  const data= await apiRequest ('http://localhost:5000/rebuild-list');
  console.log(data);
  setRebuilds(data);
}

useEffect(()=> {
  getRebuild();
},[])


  const goalRebuild= 20;
  const totalRebuilds = rebuilds.length;
  const percentage = totalRebuilds > 0 ? (totalRebuilds / goalRebuild) * 100 : 0;

  return <ProgressBar now={percentage} label={`${percentage.toFixed(2)}%`} />;
}

export default Bar;
