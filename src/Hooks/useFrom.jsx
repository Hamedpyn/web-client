import { useCallback, useReducer } from "react"
const fromReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE': {
            let formIsValid = true
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }

            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                formIsValid: formIsValid
            }
        }
        default: {
            return state
        }
    }
};

export const useForm = (inputs, formIsValid) => {
    const [formState, dispatch] = useReducer(fromReducer, { inputs, formIsValid });

    const onInputHandler = useCallback(
        (id, value, isValid) => {
            dispatch({
                type: 'INPUT_CHANGE',
                value,
                isValid,
                inputId: id,
            });
        }, []
    )


    return [formState, onInputHandler];
};
