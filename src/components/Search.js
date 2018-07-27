import React from "react";

const Search = ({ defaultValue, onChange, messages, onCancel, loading }) => {
  return (
    <div>
      <input
        placeholder="Search for a Beer"
        defaultValue={defaultValue}
        onChange={e => onChange(e.target.value)}
      />
      {loading && <button onClick={() => onCancel()}>Cancel</button>}
      {messages.length > 0 && (
        <ul>
          {messages.map(message => <li key={message.text}>{message.text}</li>)}
        </ul>
      )}
    </div>
  );
};

export default Search;
