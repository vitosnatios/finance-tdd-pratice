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
      <div className='flex flex-wrap gap-8 items-center'>
        <BarChart
          series={barChartSeries}
          height={290}
          width={400}
          sx={{ maxWidth: 400 }}
          xAxis={[{ data: ['Expenses'], scaleType: 'band' }]}
          aria-label='oiiiaaa'
        />
        <PieChart series={pieChartSeries} width={400} height={200} />
      </div>
    </ThemeProvider>
  );
};

export default ExpensesCharts;
