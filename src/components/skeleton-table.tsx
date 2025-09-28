import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function SkeletonTable({ columns }: { columns: number }) {
  return (
    <section>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={columns} className="px-0">
              <Skeleton className="min-h-10 w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(columns)].map((_, i) => (
            <TableRow key={i}>
              {[...Array(columns)].map((_, i) => (
                <TableCell key={i}>
                  <Skeleton className="min-h-10 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
