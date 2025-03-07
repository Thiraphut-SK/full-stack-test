"use client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Author {
  authorId: number;
  name: string;
  createAt: string;
  updateAt: string;
}

interface Books {
  bookId: number;
  name: string;
  type: string;
  count: number;
  authorId: number;
  createAt: string;
  updateAt: string;
}

export default function Books() {
  const [dataAuthor, setDataAuthor] = useState<Author[]>([]);
  const [dataBook, setDataBook] = useState<Books[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    authorId: "",
    type: "",
    count: 0,
  });

  const submitBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PATH}/book`, {
        name: formData.name,
        authorId: formData.authorId,
        type: formData.type,
        count: formData.count,
      }) // Call the API route that interacts with Prisma

      .then((response) => {
        setLoading(true);
        console.log(response.data);
      });
    alert("success");
    setLoading(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFormData({ ...formData, type: event.target.value });
  };
  const handleChangeAuthor = (event: SelectChangeEvent) => {
    setFormData({ ...formData, authorId: event.target.value });
  };

  const deleteBook = async (bookId: number) => {
    try {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_PATH}/book/${bookId}`)
        .then((res) => {
          setLoading(true);
          console.log("Author deleted:", res.data);
        }); // if use params not search param for production
    } catch (error) {
      console.error("Error deleting author:", error);
    }
    alert("success");

    setLoading(false);
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PATH}/author`) // Call the API route that interacts with Prisma
      .then((response) => {
        setLoading(true);
        setDataAuthor(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PATH}/book`) // Call the API route that interacts with Prisma
      .then((response) => {
        setLoading(true);
        setDataBook(response.data);
        setLoading(false);
      });
  }, [loading]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100 text-black">
      <Typography variant="h4">Book</Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          flexDirection: "column",
          display: "flex",
        }}
        noValidate
        onSubmit={submitBook}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          placeholder="Name Book"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          color="info"
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.type}
            label="Type"
            onChange={handleChange}
          >
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Author Write
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.authorId}
            label="Author Write"
            onChange={handleChangeAuthor}
          >
            {dataAuthor.map((item) => {
              return (
                <MenuItem key={item.authorId} value={item.authorId}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          id="count"
          type="number"
          label="Count"
          variant="outlined"
          placeholder="จำนวนหนังสือ"
          value={formData.count}
          onChange={(e) =>
            setFormData({ ...formData, count: Number(e.target.value) })
          }
          color="info"
        />
        <Button type="submit">Add Book</Button>
      </Box>

      <Box>
        <Typography>Book list</Typography>
        {dataBook.map((item) => {
          return (
            <div
              key={item.bookId}
              className="text-red-400 flex gap-4 items-center"
            >
              <div>
                -{item.name} ประเภท {item.type} คนแต่ง {item.authorId}{" "}
                จำนวนหนังสือ {item.count}
              </div>
              <Button
                onClick={() => deleteBook(item.bookId)}
                variant="contained"
                color="error"
                size="small"
                sx={{ my: 1 }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </Box>
    </div>
  );
}
