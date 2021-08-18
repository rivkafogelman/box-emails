import React from "react";
import { Flatpickr } from "./FlatPickr";
import { getIn } from "formik";

function FlatpickrField({
  field: { onChange, onBlur, ...field },
  form: { errors, touched },
  label,
  ...props
}) {
  const id = props.id || field.name;

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <Flatpickr
        {...field}
        {...props}
        id={id}
        onChange={e => {
          onChange(e);
          onBlur(e);
        }}
        error={getIn(touched, field.name) && getIn(errors, field.name)}
      />
    </div>
  );
}

export { FlatpickrField };
