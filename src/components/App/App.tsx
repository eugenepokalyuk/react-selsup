import React from 'react';
import ParamEditor from '../ParamEditor/ParamEditor';
import { Param } from '../../utils/types';

const initialParams: Param[] = [
  { id: 1, name: "Назначение", type: 'string' },
  { id: 2, name: "Длина", type: 'string' }
];

const initialModel = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" }
  ],
  // Решение должно быть легко расширяемым
  colors: [
    { id: 1, name: "Красный", hexCode: "#FF0000" },
    { id: 2, name: "Зелёный", hexCode: "#00FF00" },
    { id: 3, name: "Синий", hexCode: "#0000FF" },
  ]
};

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className='param-header'>Редактор параметров товара</h1>
        <ParamEditor params={initialParams} model={initialModel} />
      </div>
    );
  }
}

export default App;