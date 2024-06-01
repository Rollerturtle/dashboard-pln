import React, { useState } from 'react';
import {
  Paper, Box, Typography, Avatar, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, IconButton, InputBase, AvatarGroup, Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ProjectList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  
  const rowsPerPage = 5;

  const data = [
    { name: "BGC eCommerce App", type: "React Project", leader: "Eileen", team: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"], progress: 78 },
    { name: "Falcon Logo Design", type: "Figma Project", leader: "Owen", team: ["2.jpg", "3.jpg", "1.jpg"], progress: 18 },
    { name: "Dashboard Design", type: "Vue.js Project", leader: "Keith", team: ["3.jpg", "4.jpg", "1.jpg", "2.jpg"], progress: 62 },
    { name: "Foodista Mobile App", type: "Xamarin Project", leader: "Merline", team: ["4.jpg", "1.jpg", "2.jpg"], progress: 8 },
    { name: "Dojo React Project", type: "Python Project", leader: "Harmonia", team: ["1.jpg", "2.jpg", "3.jpg"], progress: 36 },
    { name: "Another Project 1", type: "TypeScript Project", leader: "Alan", team: ["2.jpg", "3.jpg", "4.jpg"], progress: 50 },
    { name: "Another Project 2", type: "Java Project", leader: "Julie", team: ["1.jpg", "4.jpg"], progress: 90 },
    { name: "Another Project 3", type: "C# Project", leader: "Martin", team: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"], progress: 75 },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText) ||
    item.type.toLowerCase().includes(searchText) ||
    item.leader.toLowerCase().includes(searchText) ||
    `${item.progress}`.includes(searchText)
  );

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>Project List</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Project"
            inputProps={{ 'aria-label': 'search project' }}
            value={searchText}
            onChange={handleSearchChange}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <TableContainer component={Box} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Leader</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell><Checkbox /></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={`/path/to/${item.type.toLowerCase().replace(/\s/g, '-')}.png`} sx={{ mr: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.type}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{item.leader}</TableCell>
                <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <AvatarGroup max={4}>
                    {item.team.map((avatar, index) => (
                      <Avatar key={index} src={`/static/images/avatar/${avatar}`} />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress variant="determinate" value={item.progress} sx={{ width: '100%', mr: 1, height:'6px', borderRadius: 8 }} />
                    <Typography variant="body1">{item.progress}%</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="body1">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries</Typography>
        <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
      </Box>
    </Paper>
  );
}

export default ProjectList;
