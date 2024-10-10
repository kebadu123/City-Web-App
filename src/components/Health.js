import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box, Button } from '@mui/material';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function Health() {
  return (
    <>
    <Typography variant="h4" gutterBottom>Welcome to Dessie Health Office Administration </Typography>
    <Typography variant="body1" gutterBottom>
Physical health
A person who has good physical health is likely to have bodily functions and processes working at their peak.
This is not only due not only to an absence of disease. Regular exercise, balanced nutrition, and adequate rest all contribute to good health. People receive medical treatment to maintain the balance, when necessary.
Physical well-being involves pursuing a healthful lifestyle to decrease the risk of disease. Maintaining physical fitness, for example, can protect and develop the endurance of a person’s breathing and heart function, muscular strength, flexibility, and body composition.
Looking after physical health and well-being also involves reducing the risk of an injury or health issue, such as:
minimizing hazards in the workplace
using contraception when having sex
practicing effective hygiene
avoiding the use of tobacco, alcohol, or illegal drugs
taking the recommended vaccines for a specific condition or country when traveling
የምግብ ስርዓት ማጠናከሪያ ፕሮግራም(FSRP) የምርምር ስራዎች ውጤታማ እንዲሆኑ እያደረገው ያለው አስተዋጽኦ ከፍተኛ እውቅና የሚሰጠው መሆኑ ተገለጸ
የምግብ ስርዓት ማጠናከሪያ ፕሮግራም( Food System Resilience Program-FSRP) በአማራ ግብርና ምርምር ኢንስቲትዩት በ2016 በጀት አመት ያከናወናቸው ስራዎች ግምገማ እና የ2017ዓ.ም ስራዎች እቅድ ትውውቅ መድረክ የኢንስቲትዩቱ ሰራተኞች በተገኙበት የተካሄደ ሲሆን በመድረኩ ፕሮግራሙ ለምርምር ተቋሙ እያደረገ ያለው አስተዋጽኦ እጅግ ከፍተኛ መሆኑ ተገልጿል፡፡ 
በመድረኩ የተገኙት የአማራ ግብርና ምርምር ኢንስቲትዩት ዋና ዳይሬክተር ዶ/ር አስማሪ ደጀን የFSRP በጀት ድጋፍ ባይኖር በ2016 በጀት አመት የምርምር ስራዎችን ለማከናወን እንቸገር ነበር፤ በምርምር ማዕከላት ደረጃ እየተሰሩ የሚገኙ አብዛኞቹን የምርምር ስራዎችን በፋይናንስ እየደገፈ ያለው ፕሮግራሙ ነው ብለዋል፡፡
ፕሮግራሙ የግብርና ቴክኖሎጅዎችንና ምክረ ሀሳቦችን ለማውጣት፣ የቴክኖሎጅ ብዜት ስራዎችን ለመስራት፣ የሚወጡ ቴክኖሎጅዎችንና ምክረሀሳቦችን ለማስተዋወቅና ለማስፋት በሚሰሩ የምርምር ስራዎች ላይ ከፍተኛ የፋይናንስ ድጋፍ እያደረገ ነው ያሉት ዋና ዳይሬክተሩ በምርምር አቅም ግንባታ በኩልም ልዩ ልዩ የምርምር መሰረተ ልማቶች እንዲሟሉ ጉልህ አስተዋጽኦ እያደረገ መሆኑን ተናግረዋል፡፡ 
በኢንስቲትዩቱ የምግብ ስርዓት ማጠናከሪያ ፕሮግራም ማናጀር ዶ/ር አደባባይ ከበደ በ2016 በጀት አመት ፕሮግራሙ በኢንስቲትዩቱ ያከናወናቸውን ተግባራት አፈጻጸም ሪፖርት እና የ2017 በጀት አመት እቅድን ያቀረቡ ሲሆን በሪፖርታቸውም ፕሮግራሙ በኢንስቲትዩቱ ስር ለሚገኙ 7 የምርምር ማዕከላትና 6 ንዑስ ማዕከላት ልዩ ልዩ ድጋፎችን እያደረገ መሆኑን ገልጸዋል፡፡ 
በበጀት አመቱ ፕሮግራሙ በቴክኖሎጅ ማፍለቅና ማላመድ ዘርፍ 129 ሙከራዎችን በበጀት መደገፉንና 11 ቴክኖሎጅዎችና ምክረ ሀሳቦች እንዲወጡ ማስቻሉን የገለጹት ዶ/ር አደባባይ በምርምር ብዜት፣ ማስተዋወቅና ማስፋት ስራዎችም ከፍተኛ ድጋፍ አድርጓል ብለዋል፡፡ 
የኢንስቲትዩቱ የምርምር አቅም እንዲጎለብትም በኢንስቲትዩቱ ዋና መስሪያ ቤትና በምርምር ማዕከላት ደረጃ ልዩ ልዩ የምርምር መሰረተ ልማቶችን የማሟላት እና የሰው ሀይል የመፈጸም አቅምን የመገንባት ስራ መሰራቱን ማናጀሩ ገልጸዋል፡፡ ፕሮግራሙ በ2017 በጀት አመትም የሚያደገውን ድጋፍ ለማጠናከር የሚያስችሉ እቅዶችን ነድፎ እየተንቀሳቀሰ መሆኑንም ዶ/ር አደባባይ አስረድተዋል፡፡ 
የኢንስቲትዩቱን የመፈጸም አቅም በማሳደግ በኩል ፕሮግራሙ እያደረገው ያለው አስተዋጽኦ ትልቅ እውቅና የሚሰጠው መሆኑን የግምገማ መድረኩ ተሳታፊዎች የገለጹ ሲሆን በቀጣይም የምርምር ክፍተቶችን በሚገባ እየለየ የሚያደርገውን ሁለንተናዊ ድጋፍ አጠናክሮ እንዲቀጥል ጠይቀዋል፡፡ 
FSRP በአለም ባንክ የሚደገፍ ፕሮጀክት ሲሆን በዋናነት የስነ-አመጋብ ስርዓትን ለማሻሻል ኢላማ አድርጎ እየሰራ ያለ ፕሮጀክት ነው፡፡
    </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
