import React from "react";
import DeleteButton from './DeleteButton';

const DowntimeTable = (props) => {
  
  return (
<<<<<<< HEAD
    <table className="table-highlights width-100">
      <thead>
        <tr>
          {console.log(props.downtimeTypes)}
          <th>Character</th>
          <th>Days Spent</th>
          <th>Type</th>
          <th>Description</th>
          <th>Date Created</th>
        </tr>
      </thead>
      <tbody>
        {props.downtime.sort((a,b) => {
            if (a.creationDate > b.creationDate) {
              return -1
            } else if (a.creationDate < b.creationDate) {
              return 1
            } else {
              return a.downtimeType >= b.downtimeType ? 1 : -1
            }
          }).map((downtime) => {
          return (
            <tr key={downtime.id} className="downtime-row">
              <td>{props.characters.find(character => character.id === downtime.character).fullName}</td>
              <td>{downtime.numOfDaysSpent}</td>
              <td>
                {props.downtimeTypes &&
                  props.downtimeTypes.find(
                    (dtt) => dtt.id === downtime.downtimeType
                  ).name
                }
              </td>
              <td className="width-10">{downtime.description}</td>
              <td>{downtime.creationDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
=======
    <>
      <table className="table-highlights width-100">
        <thead>
          <tr>
            <th>Character</th>
            <th>Days Spent</th>
            <th>Type</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.downtime.sort((a,b) => {
              if (a.creationDate > b.creationDate) {
                return -1
              } else if (a.creationDate < b.creationDate) {
                return 1
              } else {
                return a.downtimeType >= b.downtimeType ? 1 : -1
              }
            }).map((downtime) => {
            return (
              <tr key={downtime.id} className="downtime-row">
                <td>{props.characters.find(character => character.id === downtime.character).fullName}</td>
                <td>{downtime.numOfDaysSpent}</td>
                <td>
                  {props.downtimeTypes &&
                    props.downtimeTypes.find(
                      (dtt) => dtt.id === downtime.downtimeType
                    ).name
                  }
                </td>
                <td className="width-10">{downtime.description}</td>
                <td>{downtime.creationDate}</td>
                <td>
                  {downtime.creator === props.user.id || 
                  props.user.is_staff === true ||
                  props.characters.find(character => character.id === downtime.character).creator === props.user.id ? 
                    <DeleteButton objectToPass={downtime} onClick={props.selectDowntime} />
                  : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
>>>>>>> v1.1
  );
};

export default DowntimeTable;
