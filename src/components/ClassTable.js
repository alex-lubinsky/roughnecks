import React from 'react';
import Table from 'react-bootstrap/Table';

const getClassName = (pcClass, subclasses) => {

  let subclass = ''
  let subclassName = ''
  
  if (pcClass) {
    subclass = subclasses.find(subclass => subclass.id === pcClass.playerClass)
    if (subclass.isClass) {
      subclassName = subclass.subclassName
    } else {
      subclassName = `${subclass.className} - ${subclass.subclassName}`
    }
  } else {
    subclassName = null;
  }
  return subclassName
}


const ClassTable = (props) => {

  const rows = []
  for (var i = 1; i < 11; i++) {
    rows.push(
    <tr>
      <td>
        {i}.
      </td>
      <td>
        {getClassName(props.pcClasses[i-1], props.subclasses)}
      </td>
      <td>
        {i+10}.
      </td>
      <td>
       {getClassName(props.pcClasses[i-1+10], props.subclasses)}
      </td>
    </tr>
    )
  }

  return (
    <Table striped bordered size="sm">
      <thead>
        <tr>
          <th>
            Level #
          </th>
          <th>
            Class Name
          </th>
          <th>
            Level #
          </th>
          <th>
            Class Name
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default ClassTable;