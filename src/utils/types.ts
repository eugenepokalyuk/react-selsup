export interface Param {
    id: number;
    name: string;
    type: 'string' | 'color';
}

export interface ParamValue {
    paramId: number;
    value: string;
}

export interface Color {
    id: number;
    name: string;
    hexCode: string;
}

export interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

export interface Props {
    params: Param[];
    model: Model;
}

export interface State {
    model: Model;
}