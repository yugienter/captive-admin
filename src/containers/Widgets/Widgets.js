import React from 'react';
import { useHistory } from 'react-router-dom';
export default function() {
  const history = useHistory();
  history.replace('/dashboard/payment-manage');
  
  return (
    <div></div>
  );
}