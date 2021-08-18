import React from "react";
import flatpickr from "flatpickr";
import cx from "classnames";
import "flatpickr/dist/themes/light.css";

class Flatpickr extends React.Component {
  flatpickrRef = React.createRef();

  componentDidMount() {
    const { name, value, onChange, mode, format } = this.props;
    this.flatpickr = flatpickr(this.flatpickrRef.current, {
      wrap: true,
      defaultDate: value,
      dateFormat: format,
      mode: mode,
      onChange: value => {
        onChange && onChange({ target: { name, value } });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { value, mode, format } = this.props;

    if (prevProps.mode !== mode) {
      this.flatpickr.set("mode", mode);
    }

    if (prevProps.dateFormat !== format) {
      this.flatpickr.set("dateFormat", format);
    }

    if (prevProps.value !== value) {
      this.flatpickr.setDate(value);
    }
  }

  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  render() {
    const { placeholder, id, error } = this.props;
    return (
      <div className="input-group" ref={this.flatpickrRef}>
        <input
          id={id}
          type="text"
          className={cx("form-control", { "is-invalid": !!error })}
          placeholder={placeholder}
          data-input
        />
        <div className="input-group-append">
          <span className="input-group-text" data-toggle>
            <i className="far fa-calendar" />
          </span>
          <span className="input-group-text" data-clear>
            <i className="fas fa-backspace" />
          </span>
        </div>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

export { Flatpickr };
