import { ThemeProvider, createTheme } from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';

type Props = {
  dataWithTotalPrice: Map<string, number>;
  categoriesKeysByBiggerPrice: string[];
};

const ExpensesCharts = ({
  dataWithTotalPrice,
  categoriesKeysByBiggerPrice,
}: Props) => {
  const barChartSeries = categoriesKeysByBiggerPrice.map((label) => ({
    data: [Number(dataWithTotalPrice.get(label))],
    label,
  }));

  const pieChartSeries = [
    {
      data: categoriesKeysByBiggerPrice.map((label, id) => ({
        id,
        label,
        value: Number(dataWithTotalPrice.get(label)),
      })),
    },
  ];
  return (
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <div className='grid md:grid-cols-2 gap-2 items-center'>
        <BarChart
          series={barChartSeries}
          height={300}
          width={260}
          xAxis={[{ data: ['Expenses'], scaleType: 'band' }]}
          sx={{ maxWidth: { xs: 260, sm: 400, md: 400, lg: 400, xl: 400 } }}
        />
        <PieChart
          series={pieChartSeries}
          height={300}
          sx={{
            maxWidth: { xs: 260, sm: 400, md: 400, lg: 400, xl: 400 },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default ExpensesCharts;
