"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";
import useSWR from "swr";
import { User } from "../types";
import { fetcher } from "../utils/fetcher";
import { Spinner } from "@nextui-org/spinner";
import TrophyIcon from "./icons/TrophyIcon";

const columns = [
  {
    key: "number",
    label: "#",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "score",
    label: "SCORE",
  },
  {
    key: "createdAt",
    label: "SUBMITTED AT",
  },
];

const HighScores = () => {
  const { data, isLoading } = useSWR<Array<User>>("/api/users", fetcher);
  console.log(data);

  return (
    <section className="my-4 mt-12">
      <h2 className="my-4 flex items-center gap-1.5 text-2xl font-medium">
        High Scores
        <span>
          <TrophyIcon />
        </span>
      </h2>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="success" />}
          items={data ?? []}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                if (columnKey === "number") {
                  return (
                    <TableCell>{(data?.indexOf(item) ?? -1) + 1}</TableCell>
                  );
                }

                if (columnKey === "createdAt") {
                  const date = new Date(item.createdAt);

                  return <TableCell>{date.toLocaleString()}</TableCell>;
                }

                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default HighScores;
