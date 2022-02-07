import Client from '../components/Client/index'
import Stack from '@mui/material/Stack'

const ClientPage = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Stack flex={1}>
            <Client/>
            </Stack>
            
        </Stack>
    );
};

export default ClientPage;
