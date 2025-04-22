import { Button } from '@mui/material';
import TodoList from './components/todo_list/TodoList';
import { Home as HomeIcon } from '@mui/icons-material';

export default function App() {
    return (
        <>
            <div className='flex flex-row justify-center mt-8'>
                <Button variant="contained" color="secondary">
                    <span className='pr-2'><HomeIcon/></span>
                    Add Todo
                </Button>
            </div>

            <TodoList />

        </>
    );
}
