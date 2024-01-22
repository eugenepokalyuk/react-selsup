import React from 'react';
import { Model, Param, ParamValue, Props, State } from '../../utils/types';

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: props.model,
        };
    }

    handleChange = (paramId: number, value: string) => {
        const updatedParamValues = this.state.model.paramValues.map(prev =>
            prev.paramId === paramId ? { ...prev, value: value } : prev
        );

        this.setState(prevState => ({
            model: {
                ...prevState.model,
                paramValues: updatedParamValues,
            },
        }));
    };

    handleChangeColor = (colorId: number, hexCode: string) => {
        const updatedColors = this.state.model.colors.map(color =>
            color.id === colorId ? { ...color, hexCode: hexCode } : color
        );

        this.setState(prevState => ({
            model: {
                ...prevState.model,
                colors: updatedColors,
            },
        }));
    };

    public getModel = (): Model => {
        return this.state.model;
    };

    renderParamInput = (param: Param, paramValue: ParamValue) => {
        switch (param.type) {
            case 'string':
                return (
                    <input
                        type="text"
                        value={paramValue.value}
                        onChange={(e) => this.handleChange(param.id, e.target.value)}
                    />
                );
            case 'color':
                const colorValue = this.state.model.colors.find(color => color.id === param.id);
                return (
                    <input
                        type="color"
                        value={colorValue ? colorValue.hexCode : '#ffffff'}
                        onChange={(e) => this.handleChangeColor(param.id, e.target.value)}
                    />
                );
            default:
                return null;
        }
    };

    render() {
        return (
            <div className="param-editor">
                {this.props.params.map(param => {
                    const paramValue = this.state.model.paramValues.find(prev => prev.paramId === param.id) || { paramId: param.id, value: '' };
                    return (
                        <div key={param.id}>
                            <label>{param.name}</label>
                            {this.renderParamInput(param, paramValue)}
                        </div>
                    );
                })}
                <button onClick={() => console.log(this.getModel())}>Save Model</button>
            </div>
        );
    }
}

export default ParamEditor;