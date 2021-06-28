import { Doughnut } from 'react-chartjs-2';

import React, { useEffect, useState } from 'react';
import { random_bg_color } from './helpers';

const TagsChart = ({ id_user }) => {
  const [chartData, setChartData] = useState({});
  const chart = (info) => {
    let labels = [];
    let data = [];
    let colors = [];
    for (const tag of info.tags) {
      data.push(Number(tag.porcentaje));
      labels.push(tag.tag_name);
      colors.push(
        tag.tag_name.toLowerCase() === 'html'
          ? 'rgb(222, 74, 36)'
          : tag.tag_name.toLowerCase() === 'css'
          ? 'rgb(1, 106, 182)'
          : tag.tag_name.toLowerCase() === 'java'
          ? 'rgb(227, 16, 22)'
          : tag.tag_name.toLowerCase() === 'js' ||
            tag.tag_name.toLowerCase() === 'javascript'
          ? 'rgb(240, 221, 48)'
          : tag.tag_name.toLowerCase() === 'php'
          ? 'rgb(121, 121, 179)'
          : tag.tag_name.toLowerCase() === 'phyton'
          ? 'rgb(54, 107, 152)'
          : tag.tag_name.toLowerCase() === 'sql'
          ? 'rgb(99, 45, 140)'
          : random_bg_color()
      );
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Tags',
          data: data,
          backgroundColor: colors,
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    });
  };
  useEffect(() => {
    fetch(`http://localhost:4000/api/tags/user/${id_user}`)
      .then((res) => res.json())
      .then((info) => chart(info));
  }, [id_user]);

  const options = {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 18,
          },
          color: '#fff',
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default TagsChart;
