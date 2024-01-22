import React from 'react';
import { Model, Param, ParamValue, Props, State } from '../../utils/types';

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: props.model,
        };
    }

    handleChange = (paramId: number, value: string, type: string) => {
        if (type === 'string') {
            const updatedParamValues = this.state.model.paramValues.map(prev =>
                prev.paramId === paramId ? { ...prev, value: value } : prev
            );

            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    paramValues: updatedParamValues,
                },
            }));
        } else if (type === 'color') {
            const updatedColors = this.state.model.colors.map(color =>
                color.id === paramId ? { ...color, hexCode: value } : color
            );

            this.setState(prevState => ({
                model: {
                    ...prevState.model,
                    colors: updatedColors,
                },
            }));
        }
    };

    public getModel = (): Model => {
        return this.state.model;
    };

    getParamValue = (paramId: number) => {
        return this.state.model.paramValues.find(prev => prev.paramId === paramId) || { paramId, value: '' };
    };

    getColorValue = (paramId: number) => {
        return this.state.model.colors.find(color => color.id === paramId) || { id: paramId, hexCode: '#ffffff' };
    };

    renderParamInput = (param: Param) => {
        const paramValue = this.getParamValue(param.id);

        switch (param.type) {
            case 'string':
                return (
                    <input
                        type="text"
                        value={paramValue.value}
                        onChange={(e) => this.handleChange(param.id, e.target.value, param.type)}
                    />
                );
            case 'color':
                const colorValue = this.getColorValue(param.id);
                return (
                    <input
                        type="color"
                        value={colorValue.hexCode}
                        onChange={(e) => this.handleChange(param.id, e.target.value, param.type)}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <div className="param-editor">
                {this.props.params.map(param => (
                    <div key={param.id} className="param-input">
                        <label>{param.name}</label>
                        {this.renderParamInput(param)}
                    </div>
                ))}
                <button onClick={() => console.log(this.getModel())}>Сохранить модель</button>
            </div>
        );
    }
}

export default ParamEditor;