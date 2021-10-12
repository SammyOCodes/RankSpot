import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import "./showRankedProfile.css";

export default function RankedTable() {

  const [rankedProfilesList, setRankedProfileList] = useState([])

  const deleteRankedProfile = (id) => {
    axios.delete(`http://localhost:5000/rankedProfiles/${id}`).then( () => {
      window.location.reload(false);
    })
  }

  useEffect(() => {
    axios.get('http://localhost:5000/rankedProfiles').then( (allRankedProfiles) => {
        setRankedProfileList(allRankedProfiles.data);
    })
  }, [])

  return (
      <>
      <h2>Rankings Summary</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Game Name</TableCell>
            <TableCell align="center">Ranked Division</TableCell>
            <TableCell align="center">Ranked Tier</TableCell>
            <TableCell align="center">Comments</TableCell>
            <TableCell align="center">Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rankedProfilesList.map((rankedProfile, key) => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {rankedProfile.username}
              </TableCell>
              <TableCell align="center">{rankedProfile.password}</TableCell>
              <TableCell align="center">{rankedProfile.rankedTier}</TableCell>
              <TableCell align="center">{rankedProfile.comments}</TableCell>
              <TableCell align="center">
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => deleteRankedProfile(rankedProfile._id)}>
                  Delete
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}