import React, {useState, useEffect, useRef, useReducer, SyntheticEvent} from "react";
// import * as RBS from 'react-bootstrap';
import {Form, FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';

interface Props {
    message: string;
}

interface Result {
    todos: State;
    dispatch: React.Dispatch<Action>
}
interface Delete {
    id: number,
    dispatch: React.Dispatch<Action>
}
type Action =
    {
        type: 'add',
        todo: string,
    } |
    {
        type: 'remove',
        index: number
    };
interface Todo {
    todo: string,
    complete: boolean,
}
type State = Todo[];

function reducer(state: State, action: Action){
    switch(action.type){
        case 'add':
            return [...state, {todo: action.todo, complete: false}];
        case 'remove':
            return state.filter((_, index) => index !== action.index);
        default:
            return state;
    }
}

// https://ultimatecourses.com/blog/typescript-setters-getter
class Counter {
    constructor(private _uuid: number = 0){}
    get uuid() {
        return this._uuid++;
    }
}

const Display: React.FC<Result> = ({todos, dispatch}) => {
    const counter = new Counter();
    return (
        <>
            <h4>Current todos: </h4>
            <div>
                {todos.map(todo => {
                    let id = counter.uuid;
                    return <div key={id}>
                        <span>{todo.todo}{' '}</span>
                        <RemoveButton id={id} dispatch={dispatch}/>
                    </div>
                })
                }
            </div>
        </>
    )
};

const RemoveButton: React.FC<Delete> = ({id, dispatch}) => {
    return <Button
        type="submit"
        variant="primary"
        size="sm"
        onClick={
            (e: SyntheticEvent): void => {
                e.preventDefault();
                dispatch({type: 'remove', index: id});
            }
        }
    >Delete</Button>
};

export const Todos: React.FC<Props> = ({ message }) => {
    const [text, setText] = useState<string>('');
    const [todos, dispatch] = useReducer(reducer, [{todo:'Homework', complete: false}]);

    // const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div>
            <h2>{message}</h2>
            <Form onSubmit={
                (e: SyntheticEvent): void => {
                    e.preventDefault();
                    dispatch({ type: 'add', todo: text });
                    setText("");
                }
            }>
                <FormGroup controlId="exampleForm.ControlInput1">
                    <FormLabel>Add Todo: </FormLabel>
                    <FormControl
                        type="text"
                        placeholder="Wash dishes"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </FormGroup>
            </Form>
            <Display todos={todos} dispatch={dispatch} />
        </div>
    );
};
