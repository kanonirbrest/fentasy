import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

export function TableComponent({
  rows = [],
  config,
  keyField,
  onRowClick = () => {},
  actionCallback = () => {},
  isRowDisabled = () => {
    return false;
  },
}) {
  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "300px" }}>
          <TableHead>
            <TableRow>
              {config.map((c) => {
                return <TableCell key={c.id}>{c.label}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const idDisabled = isRowDisabled(row);
              return (
                <TableRow
                  onClick={() => {
                    if (idDisabled) return;
                    onRowClick(row);
                  }}
                  style={{
                    cursor: "pointer",
                    opacity: idDisabled ? ".5" : "1",
                  }}
                  hover
                  key={row[keyField]}
                >
                  {config.map((config) => {
                    return (
                      <TableCell key={config.id}>
                        <Stack
                          sx={{ alignItems: "center" }}
                          direction="row"
                          spacing={2}
                        >
                          {config.filter ? (
                            config.filter(row, actionCallback)
                          ) : (
                            <Typography variant="subtitle2">
                              {row[config.field]}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {/*{false && <TablePagination*/}
      {/*    component="div"*/}
      {/*    count={count}*/}
      {/*    onPageChange={noop}*/}
      {/*    onRowsPerPageChange={noop}*/}
      {/*    page={page}*/}
      {/*    rowsPerPage={rowsPerPage}*/}
      {/*    rowsPerPageOptions={[5, 10, 25]}*/}
      {/*  />*/}
      {/*)}*/}
    </Card>
  );
}
