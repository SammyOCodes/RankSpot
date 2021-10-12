import "./rankTable.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { gameRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RankTable() {
  const [data, setData] = useState(gameRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { 
      field: "id", headerName: "ID", width: 250 
    },
    {
      field: "username",
      headerName: "Username",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="rankTableUser">
            <img className="rankTableImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "rank", headerName: "Rank", width: 250 },
    {
      field: "rating",
      headerName: "Rating",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="rankTableEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="rankTableDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="rankTable">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
