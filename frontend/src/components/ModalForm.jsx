export function ModalForm({ title, fields, values, setValues, onSubmit, onClose, submitLabel = "Save" }) {
  return (
    <div className="modal-backdrop">
      <form className="modal-card" onSubmit={onSubmit}>
        <div className="panel-head">
          <h2>{title}</h2>
          <button type="button" onClick={onClose}>Close</button>
        </div>
        <div className="form-grid">
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              {field.type === "textarea" ? (
                <textarea value={values[field.name] || ""} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} />
              ) : (
                <input type={field.type || "text"} value={values[field.name] || ""} onChange={(event) => setValues({ ...values, [field.name]: event.target.value })} required={field.required} />
              )}
            </label>
          ))}
        </div>
        <button className="primary-action" type="submit">{submitLabel}</button>
      </form>
    </div>
  );
}
