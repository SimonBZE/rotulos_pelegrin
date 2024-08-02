'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

const registro = [
    {
        usuario: "Bayron Zapata",
        fecha: "02/08/2024 08:43",
        ip: "93.84.204.93",
    },
    {
        usuario: "Leo Pelegrin",
        fecha: "02/08/2024 08:00",
        ip: "116.125.55.184",
    },
    {
        usuario: "Bayron Zapata",
        fecha: "02/08/2024 07:50",
        ip: "93.84.204.93",
    },
    {
        usuario: "Carmen Marulanda",
        fecha: "02/08/2024 07:43",
        ip: "195.37.40.152",
    },
    {
        usuario: "Leo Pelegrin",
        fecha: "01/08/2024 07:43",
        ip: "93.84.204.93",
    },
    {
        usuario: "Carmen Marulanda",
        fecha: "01/08/2024 07:32",
        ip: "93.84.204.93",
    },
    {
        usuario: "Bayron Zapata",
        fecha: "01/08/2024 07:29",
        ip: "93.84.204.93",
    },
    {
        usuario: "Bayron Zapata",
        fecha: "31/07/2024 19:32",
        ip: "195.37.40.152",
    },
    {
        usuario: "Bayron Zapata",
        fecha: "31/07/2024 14:25",
        ip: "230.114.49.153",
    },
    {
        usuario: "Bayron Zapata",
        fecha: "31/07/2024 07:43",
        ip: "93.84.204.93",
    },

]

export default function App() {
  return (
    <>
    <div className="flex flex-col justify-between mb-3 xsm:flex-row gap-3">
        <h1 className="text-title-md font-semibold text-black dark:text-white">
          Registro de actividad
        </h1>
        
      </div>
    <Table  aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>USUARIO</TableColumn>
        <TableColumn>FECHA</TableColumn>
        <TableColumn>IP</TableColumn>
      </TableHeader>
      <TableBody>
        {registro.map((user, i) => (
            <TableRow key={i}>
            <TableCell>{user.usuario}</TableCell>
            <TableCell>{user.fecha}</TableCell>
            <TableCell>{user.ip}</TableCell>
          </TableRow>
        ))}        
      </TableBody>
    </Table>
    </>
  );
}