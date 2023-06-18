/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DashboardCard({ title, counts }) {
  return (
    <Card sx={{ minWidth: 275,  backgroundColor: '#f5f5f5'}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3" color="text.secondary">
          {counts}
        </Typography>
      </CardContent>
    </Card>
  );
}
