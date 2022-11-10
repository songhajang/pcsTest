import React from "react";
function Alarm({ title }) {
  return (
    <div>
      <span>
        <span className="alarm-icon"></span>
        <p>{title}</p>
      </span>
      <button className="close"></button>
    </div>
  );
}
export default Alarm;
