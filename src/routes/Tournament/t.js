<Card>
  <UserTableToolbar
    numSelected={selected.length}
    filterName={filterName}
    onFilterName={handleFilterByName}
  />

  <Scrollbar>
    <TableContainer sx={{ overflow: "unset" }}>
      <Table sx={{ minWidth: 800 }}>
        <UserTableHead
          order={order}
          orderBy={orderBy}
          rowCount={users.length}
          numSelected={selected.length}
          onRequestSort={handleSort}
          onSelectAllClick={handleSelectAllClick}
          headLabel={[
            { id: "name", label: "Name" },
            { id: "company", label: "Company" },
            { id: "role", label: "Role" },
            { id: "isVerified", label: "Verified", align: "center" },
            { id: "status", label: "Status" },
            { id: "" },
          ]}
        />
        <TableBody>
          {dataFiltered
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <UserTableRow
                key={row.id}
                name={row.name}
                role={row.role}
                status={row.status}
                company={row.company}
                avatarUrl={row.avatarUrl}
                isVerified={row.isVerified}
                selected={selected.indexOf(row.name) !== -1}
                handleClick={(event) => handleClick(event, row.name)}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Scrollbar>
</Card>;
