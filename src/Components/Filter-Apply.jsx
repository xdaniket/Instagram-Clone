// import { FilterList } from "./Filter-List";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import { MenuItem, Select } from "@mui/material";

// export const FilterApplyOnImage = ({ filterClass, setFilterClass }) => {



//   const handleFilterOnSelectedImages = (e) => {
//     setFilterClass(e.target.value);
//   };
//   return (
//     <>
//       <div>
//         <Box>
//           <FormControl fullWidth>
//             <InputLabel>Filter</InputLabel>
//             <Select
//               value={filterClass}
//               label="Age"
//               onChange={handleFilterOnSelectedImages}>
//               {FilterList.map((item, index) => (
//                 <MenuItem value={item.class} key={index}>
//                   {item.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//       </div>
//     </>
//   );
// };
