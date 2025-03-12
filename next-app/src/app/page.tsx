"use client";

import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Author {
  authorId: number;
  name: string;
  createAt: string;
  updateAt: string;
}

export default function Home() {
  const [dataAuthor, setDataAuthor] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_PATH}/author`) // Call the API route that interacts with Prisma
      .then((response) => {
        setLoading(true);
        console.log(response.data);
        setDataAuthor(response.data);
        setLoading(false);
      });
  }, [loading]);

  const addAuthor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API_PATH}/author`, {
        name: formData,
      })
      .then(() => {
        setLoading(true);
        alert("success");
      }); // Call the API route that interacts with Prisma
  };

  const deleteAuthor = async (authorId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_PATH}/author/${authorId}`
      ); // if use params not search param for production
      console.log("Author deleted:", response.data);
      setLoading(true);
    } catch (error) {
      console.error("Error deleting author:", error);
    }
    alert("success");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-300">
      <main className="flex flex-col gap-8 row-start-2 text-emerald-600">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="">
          <div>Name Author</div>
          <div>
            {dataAuthor.map((item) => {
              return (
                <div
                  key={item.authorId}
                  className="text-red-400 flex gap-4 items-center"
                >
                  <div>-{item.name}</div>
                  <Button
                    onClick={() => deleteAuthor(item.authorId)}
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
          </div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              display: "flex",
              alignContent: "center",
            }}
            noValidate
            onSubmit={addAuthor}
          >
            <TextField
              id="author"
              label="Author"
              variant="outlined"
              placeholder="Name"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              color="info"
            />
            <Button type="submit">add</Button>
          </Box>
        </div>
        <Link href="pages/books">
          <Button className="text-blue-400">Books Page</Button>
        </Link>
      </main>
    </div>
  );
}
