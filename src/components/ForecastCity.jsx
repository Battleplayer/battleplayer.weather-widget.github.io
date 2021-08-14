import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Spinner, Col } from 'react-bootstrap';
import { weatherData } from 'modules/forecast5DaysModule/reselect';

const ForecastCity = memo(() => {
  const forecast5city = useSelector((state) => state.forecastCity.forecast5city);
  const state = useSelector((state) => state);
  const isRequestInProgress = useSelector((state) => state.forecastCity.isRequestInProgress);
  const data = weatherData(state);

  if (isRequestInProgress) return <Spinner animation="grow" />;

  if (!forecast5city) return null;

  return (
    <Col md={12}>
      <h2>Forecast for 5 day for city {forecast5city.city.name}</h2>
      <ResponsiveContainer width="100%" aspect={2.5} height="300px">
        <LineChart
          width={1500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line type="monotone" dataKey="temp" stroke="red" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </Col>
  );
});

export default ForecastCity;
