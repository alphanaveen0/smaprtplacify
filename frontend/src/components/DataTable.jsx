export function DataTable({ rows, columns, emptyText = "No records found", actions }) {
  if (!rows.length) {
    return <div className="empty-state">{emptyText}</div>;
  }

  return (
    <div className="smart-table">
      <div className="smart-row head">
        {columns.map((column) => <span key={column.key}>{column.label}</span>)}
        {actions ? <span>Actions</span> : null}
      </div>
      {rows.map((row) => (
        <div className="smart-row" key={row.id}>
          {columns.map((column) => <span key={column.key}>{column.render ? column.render(row) : row[column.key]}</span>)}
          {actions ? <span className="row-actions">{actions(row)}</span> : null}
        </div>
      ))}
    </div>
  );
}
